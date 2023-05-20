import React, {useState} from 'react';
import {IRound} from "../../../models/game";
import {useAppSelector} from "../../../hooks/useStore";
import {selectActiveRound} from "../../../store/slices/roundSlice";
import {selectActiveChat} from "../../../store/slices/chatSlice";
import {useCreateMoveMutation} from "../../../services/roundService";
import {selectUser} from "../../../store/slices/userSlice";
import {IMember} from "../../../models/chat";
import {socket} from "../../../utils/socket";
import {Box, Heading, Icon, IconButton} from 'native-base';
import GameInput from "../GameInput";
import {Ionicons} from "@expo/vector-icons";

interface WordsTextFieldProps {
    chatId: number;
    nativeRound: IRound;
}

const WorldField: React.FC<WordsTextFieldProps>  = ({chatId, nativeRound}) => {
    const [moveData, setMoveData] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState("");
    const user = useAppSelector(selectUser);
    const [createMove, { isLoading }] = useCreateMoveMutation();
    const activeGame = useAppSelector(selectActiveChat);
    const activeRound = useAppSelector(selectActiveRound);

    const sendResponse = async () => {
        const moves = nativeRound.moves;
        const last_word =
            moves.length > 0 ? moves[moves.length - 1].move_data : null;

        if (moveData) {
            const result = await createMove({
                move_data: moveData,
                move_type: "answer",
                roundId: activeRound.id,
                last_word,
            });
            // @ts-ignore
            const move = result.data;

            if (move?.correct) {
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
                setErrorMessage("");
                setMoveData("");
            } else {
                setErrorMessage(move?.error);
            }
        }
    };

    const isMyTurn = () => {
        if (activeRound.moves?.length > 0) {
            const lastMove = activeRound.moves[activeRound.moves.length - 1];
            return lastMove.player.id !== user?.id;
        } else {
            return activeRound.riddler?.id === user?.id;
        }
    };

    return (
        <Box w={'100%'} p={3} pb={4} justifyContent={'center'}>
            {user && activeRound && (
                (isMyTurn() ? (
                    <Box>
                        <GameInput
                            value={moveData}
                            onChangeText={(text) => setMoveData(text)}
                            label={"Name a word"}
                            placeholder={"Enter a word"}
                        />
                        <IconButton onPress={sendResponse} position={'absolute'} right={4} top={'30%'} disabled={isLoading} icon={<Icon as={Ionicons} name={'send-outline'} size={'lg'} colorScheme={'danger'} />} mx={4} />
                    </Box>
                    ) : (
                        <Box alignItems={'center'} justifyContent={'center'} p={4}>
                            <Heading fontSize={'20'}>we are waiting for your opponents word</Heading>
                        </Box>
                    )
                )
            )}
        </Box>
    );
};

export default WorldField;