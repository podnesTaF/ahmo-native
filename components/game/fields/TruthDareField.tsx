import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/useStore";
import {
    useCreateMoveMutation,
    useCreateRoundMutation,
    useUpdateRoundDataMutation
} from "../../../services/roundService";
import {selectUser} from "../../../store/slices/userSlice";
import {addScore, selectActiveChat, selectMembers} from "../../../store/slices/chatSlice";
import {addRoundData, selectActiveRound} from "../../../store/slices/roundSlice";
import {socket} from "../../../utils/socket";
import {IMember} from "../../../models/chat";
import {Box, Button, Icon, IconButton, Text} from "native-base";
import GameInput from "../GameInput";
import {disableNotMyTurn} from "../../../utils/round-helpers";
import {Ionicons} from "@expo/vector-icons";

interface TruthDareFieldProps {
    chatId: number;
}
const TruthDareField: React.FC<TruthDareFieldProps> = ({chatId}) => {
    const [moveData, setMoveData] = useState<string>("");
    const [moveType, setMoveType] = useState<string>("answer");
    const [roundData, setRoundData] = useState<string>("truth");
    const [createMove, { isLoading }] = useCreateMoveMutation();
    const user = useAppSelector(selectUser);
    const members = useAppSelector(selectMembers);
    const activeGame = useAppSelector(selectActiveChat);
    const activeRound = useAppSelector(selectActiveRound);
    const [createRound] = useCreateRoundMutation();
    const [updateRoundData, { error, isLoading: isRoundDataLoading }] =
        useUpdateRoundDataMutation();
    const dispatch = useAppDispatch();

    const sendResponse = async (answer?: string) => {
        if (!activeRound.round_data) {
            await updateWord();
        }

        if ((answer || moveData) && (moveType || answer) && activeRound) {
            const result = await createMove({
                move_data: moveData || answer,
                move_type: answer ? "statement" : moveType,
                roundId: activeRound.id,
            });
            // @ts-ignore
            const move = result.data;
            if (move) {
                const receivers = activeGame.members.map((m: IMember) => m.user.id);
                socket.emit("sendMove", {
                    id: move.id,
                    move_data: move.move_data,
                    move_type: move.move_type,
                    createdAt: move.createdAt,
                    correct: move.correct,
                    roundId: move.round.id,
                    player: move.player,
                    chatId,
                    receivers,
                });
                if (answer && activeRound?.riddler) {
                    let winner;
                    if (move.correct) {
                        winner = move.player.id;
                        dispatch(addScore({ winner: move.player.id }));
                    } else {
                        winner = activeRound.riddler.id;
                        dispatch(addScore({ winner: activeRound.riddler.id }));
                    }
                    const newRiddler = members.find(
                        (m: IMember) => m.user.id !== activeRound?.riddler?.id
                    );
                    if (newRiddler) {
                        const res = await createRound({
                            riddlerId: newRiddler.user.id,
                            chatId: activeGame.activeChat,
                        });
                        // @ts-ignore
                        let newRound = res.data;
                        if (newRound) {
                            newRound = { ...newRound, game: null };
                            socket.emit("newRound", {
                                previousWinner: winner,
                                gameId: activeGame.activeChat,
                                round: newRound,
                                receivers,
                            });
                        }
                    }
                }
            }
        }
        setMoveType("answer");
        setMoveData("");
        setRoundData("truth");
    };

    const updateWord = async () => {
        if (roundData && activeRound) {
            await updateRoundData({ id: activeRound.id!, round_data: roundData });
            if (!error) {
                dispatch(addRoundData(roundData));
                const receivers = members.map((m: IMember) => m.user.id);
                socket.emit("updateWord", {
                    player: user,
                    receivers,
                    round_data: roundData,
                    gameId: activeGame.activeChat,
                    roundId: activeRound.id,
                });
            }
            setRoundData("");
        }
    };

    return (
        <Box w={'100%'} p={3} pb={4} justifyContent={'center'}>
            {user && activeRound ? (
                activeRound?.riddler?.id === user.id ? (
                    !activeRound.round_data && (
                        <Box w={'100%'}>
                            <Box flexDir={'row'} position={'relative'} justifyContent={'space-between'} alignItems={'center'} mb={2}>
                                <GameInput placeholder={'make your move'} label={'Answer'} value={moveData} onChangeText={(text) => setMoveData(text)} />
                                {!isLoading && !disableNotMyTurn(activeRound, user) && (
                                    <IconButton
                                        onPress={() => sendResponse()}
                                        position={'absolute'} right={4} top={'30%'} disabled={isLoading}
                                        icon={<Icon as={Ionicons} name={'send-outline'} size={'lg'}
                                                    colorScheme={'danger'} />} mx={4} />
                                )}
                            </Box>
                            <Button.Group my={3} flexDir={'row'} justifyContent={'center'} alignItems={'center'} space={4} w={'100%'}>
                                <Button flex={1} colorScheme={'warning'} variant={roundData === 'truth' ? 'solid' : 'outline'} onPress={() => setRoundData('truth')}>
                                    truth
                                </Button>
                                <Button flex={1} colorScheme={'warning'} variant={roundData === 'dare' ? 'solid' : 'outline'} onPress={() => setRoundData('dare')}>
                                    dare
                                </Button>
                            </Button.Group>
                        </Box>
                    )
            ) : (
                    activeRound.round_data && (
                        <Button.Group isDisabled={isRoundDataLoading || disableNotMyTurn(activeRound, user)} my={3} flexDir={'row'} justifyContent={'center'} alignItems={'center'} space={4} w={'100%'}>
                            <Button flex={1} colorScheme={'warning'} variant={roundData === 'truth' ? 'solid' : 'outline'} onPress={() => sendResponse('truth')}>
                                truth
                            </Button>
                            <Button flex={1} colorScheme={'warning'} variant={roundData === 'dare' ? 'solid' : 'outline'} onPress={() => sendResponse('dare')}>
                                dare
                            </Button>
                        </Button.Group>
                    )
                )
            ) : (
                <Text>unathorized</Text>
            )}
        </Box>
    );
};

export default TruthDareField;