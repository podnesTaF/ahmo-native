import React, {useState} from 'react';
import {IRound} from "../../../models/game";
import {
    useCreateMoveMutation,
    useCreateRoundMutation,
    useUpdateRoundDataMutation
} from "../../../services/roundService";
import {useAppDispatch, useAppSelector} from "../../../hooks/useStore";
import {selectUser} from "../../../store/slices/userSlice";
import {addScore, selectActiveChat, selectMembers} from "../../../store/slices/chatSlice";
import {addAttempt, addRoundData, selectActiveRound} from "../../../store/slices/roundSlice";
import {socket} from "../../../utils/socket";
import {IMember} from "../../../models/chat";
import {Box, Button, Icon, IconButton, Stack, Text} from "native-base";
import GameInput from "../GameInput";
import {Ionicons} from "@expo/vector-icons";

interface GameTextFieldProps {
    chatId: number;
}

const GameTextField: React.FC<GameTextFieldProps> = ({chatId}) => {
    const [moveData, setMoveData] = useState<string>("");
    const [moveType, setMoveType] = useState<string>("question");
    const [roundData, setRoundData] = useState<string>("");
    const [createMove, { isLoading }] = useCreateMoveMutation();
    const user = useAppSelector(selectUser)
    const members = useAppSelector(selectMembers);
    const activeGame = useAppSelector(selectActiveChat);
    const activeRound = useAppSelector(selectActiveRound);
    const [createRound] = useCreateRoundMutation();
    const [updateRoundData, { error }] = useUpdateRoundDataMutation();
    const dispatch = useAppDispatch();

    const sendResponse = async (answer?: string) => {
        if ((answer || moveData) && (moveType || answer) && activeRound) {
            const result = await createMove({
                move_data: moveData || answer,
                move_type: moveType || "answer",
                roundId: activeRound.id,
            });
            // @ts-ignore
            const move = result.data;
            if (move) {
                let immediateAttempts = activeRound.attempt;
                if (moveType === "statement") {
                    dispatch(addAttempt());
                    immediateAttempts++;
                }
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
                if ((move.correct || immediateAttempts >= 3) && activeRound?.riddler) {
                    let winner;
                    if (move.correct) {
                        winner = move.player.id;
                        dispatch(addScore({ winner: move.player.id }));
                        // activateAlert("success", "You won this round!");
                    } else {
                        winner = activeRound.riddler.id;
                        dispatch(addScore({ winner: activeRound.riddler.id }));
                        // activateAlert("warning", "You lost this round(");
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
        setMoveType("question");
        setMoveData("");
        setRoundData("");
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

    if (activeRound.submiting < 2) {
        return null;
    }

    return (
        <Box w={'100%'} p={3} pb={4} justifyContent={'center'}>
            {user && activeRound ? (
                activeRound?.riddler?.id === user.id ? (
                    activeRound.round_data ? (
                        <Stack direction={{
                            base: "column",
                            md: "row"
                        }} space={2} alignItems={{
                            base: "center",
                            md: "flex-start"
                        }}>
                            <Button
                                isLoading={isLoading}
                                onPress={() => sendResponse("yes")}
                            >
                                Yes
                            </Button>
                            <Button
                                isLoading={isLoading}
                                onPress={() => sendResponse("no")}
                            >
                                No
                            </Button>
                        </Stack>
                    ) : (
                        <Box flexDir={'row'} justifyContent={'space-between'} alignItems={'center'}>
                            <GameInput placeholder={'riddle a word'} label={'Riddle a word'} value={roundData}
                                        onChangeText={(text) => setRoundData(text)} />
                            <IconButton onPress={updateWord} disabled={isLoading} icon={<Icon as={Ionicons} name={'send-outline'} size={'lg'} colorScheme={'danger'} />} mx={4} />
                        </Box>
                    )
                ): <Text>Hello</Text>
                ): <Text>unathorized</Text>
            }
        </Box>
    );
};

export default GameTextField;