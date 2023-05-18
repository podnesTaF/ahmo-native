import React, {useState} from 'react';
import {IRound} from "../../models/game";
import {selectActiveRound} from "../../store/slices/roundSlice";
import {useAppSelector} from "../../hooks/useStore";
import {selectUser} from "../../store/slices/userSlice";
import {selectMembers} from "../../store/slices/chatSlice";
import {useUpdateRoundDataMutation} from "../../services/roundService";
import {IMember} from "../../models/chat";
import {socket} from "../../utils/socket";
import {Box, Button, FlatList, Heading, Text} from "native-base";
import {getRoundWinnerMessage} from "../../utils/round-helpers";
import TruthDareRound from "./TruthDareRound";
import GameMove from "./GameMove";

interface GameRoundProps {
    round: IRound;
    gameType: string | null;
}

const GameRound: React.FC<GameRoundProps> = ({round, gameType}) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const user = useAppSelector(selectUser);
    const [updateRound, result] = useUpdateRoundDataMutation();
    const members = useAppSelector(selectMembers);
    const activeRound = useAppSelector(selectActiveRound);

    const sendSubmit = async () => {
        await updateRound({ id: round.id, submiting: 1 });
        setIsSubmitted(true);
        if (user) {
            const receivers = members.map((m: IMember) => m.user.id);
            socket.emit("submitRound", {
                receivers,
            });
        }
    };
    return (
        <Box flex={1}>
            {round && user && (
                gameType === 'guess a word' ? (
                    activeRound.submiting >= 2 || round.id !== activeRound.id ? (
                           <>
                               <Box>
                                   <Text>{round.riddler.id === user.id
                                       ? "you are"
                                       : round.riddler.fullName + " is"} a <Text color={'coolGray.300'}>a riddler</Text></Text>
                               </Box>
                               <FlatList data={round.moves} renderItem={({item}) => <GameMove move={item} my={user.id === item.player.id} />} keyExtractor={(item) => item.id.toString()} />
                               {round.round_winner && (
                                   <Box w={'100%'} alignItems={'center'}>
                                       <Heading fontSize={'18'}>{getRoundWinnerMessage(round, members, "guess a word")}</Heading>
                                   </Box>
                               )}
                           </>
                        ) : (
                            <Box position={'fixed'} bottom={0} p={5} left={0} w={'100%'} bgColor={'rgba(0,0,0,0.5)'} alignItems={'center'}>
                                {isSubmitted ? (
                                    <Text>Waiting for your opponent to submit new round</Text>
                                ) : (
                                    <Button colorScheme={'warning'} size={'lg'} onPress={sendSubmit}>Submit</Button>
                                )}
                            </Box>
                        )) : gameType === "truth or dare" ? (
                        <TruthDareRound round={round}
                                        user={user}
                                        activeRound={activeRound} />
                        ) : (
                            <FlatList data={round.moves} renderItem={({item}) => <GameMove move={item} my={user.id === item.player.id} />} keyExtractor={(item) => item.id.toString()} />
                        )
                )
            }
        </Box>
    );
};

export default GameRound;