import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {Avatar, Box, FlatList, Heading, Icon, IconButton, Text} from "native-base";
import {Ionicons} from "@expo/vector-icons";
import {useAppDispatch, useAppSelector} from "../hooks/useStore";
import {selectActiveChat, setGameChat} from "../store/slices/chatSlice";
import {selectUser} from "../store/slices/userSlice";
import {useGetGameQuery} from "../services/gameService";
import {IRound} from "../models/game";
import {socket} from "../utils/socket";
import {setRound} from "../store/slices/roundSlice";
import RoundData from "../components/game/RoundData";
import GameRound from "../components/game/GameRound";
import GameTextField from "../components/game/fields/GameTextField";
import TruthDareField from "../components/game/fields/TruthDareField";
import WorldField from "../components/game/fields/WorldField";
import StatusAlert from "../components/game/StatusAlert";

interface GameProps {
    navigation: any;
}

const Game: React.FC<GameProps> = ({navigation}) => {
    const [open, setOpen] = useState(true);
    const [alertContent, setAlertContent] = useState("");
    const [alertStatus, setAlertStatus] = useState<any>("info");
    const selectedGame = useAppSelector(selectActiveChat)
    const user = useAppSelector(selectUser)
    const {
        data: game,
        isLoading,
        error,
    } = useGetGameQuery(selectedGame.activeChat || 0);
    const dispatch = useAppDispatch();


    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Box w={'90%'} flexDir={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Box>
                        <Heading fontSize={14} color={'coolGray.500'}>{selectedGame.game}</Heading>
                        <Heading fontSize={18} color={'white'}>{selectedGame.name}</Heading>
                    </Box>
                    <Box flexDir={'row'}>
                        <Avatar size={8} source={{uri: selectedGame.members[0].user.image_url}} mr={2}>{selectedGame.members[0].user.fullName.slice(0,2)}</Avatar>
                        <Box mx={3}>
                            <Heading fontSize={20} color={'white'}>VS</Heading>
                            <Box flexDir={'row'}>
                                <Text color={'coolGray.500'}>{selectedGame.members[0].score} : {selectedGame.members[1].score}</Text>
                            </Box>
                        </Box>
                        <Avatar size={8} color={'secondary.500'} source={{uri: selectedGame.members[1].user.image_url}} mr={2}>{selectedGame.members[1].user.fullName.slice(0,2)}</Avatar>
                    </Box>
                </Box>
            ),
        })
    }, [selectedGame])

    useEffect(() => {
        socket.on("getNewRound", (data: { round: IRound; gameId: number }) => {
            if (selectedGame.activeChat === data.gameId) {
                dispatch(setRound(data.round));
            }
        });

        return () => {
            socket.off("getNewRound");
        };
    }, [dispatch, selectedGame.activeChat]);

    useEffect(() => {
        if (game) {
            dispatch(setGameChat(game));
        }
    }, [game, dispatch]);


    useEffect(() => {
        if (game?.rounds) {
            const roundIdx = game.rounds.findIndex(
                (round: IRound) => round.round_status === "active"
            );
            if (roundIdx + 1 && game.id === selectedGame.activeChat) {
                dispatch(setRound(game.rounds[roundIdx]));
            }
        }
    }, [selectedGame.activeChat, game, dispatch]);

    useEffect(() => {
        setAlertStatus("info");
        setOpen(true);
    }, [selectedGame.activeChat]);

    const getAlertContent = useCallback(
        (content: string) => {
            if (!alertContent) {
                setAlertContent(content);
            }
        },
        [alertContent]
    );


    const activateAlert = (severity: any, content: string) => {
        setAlertStatus(severity);
        setAlertContent(content);
        setOpen(true);
    };

    return (
        <Box bgColor={'primary.700'} flex={1} position={'relative'}>
           <Box position={'absolute'} w={'100%'} zIndex={10}>
               <StatusAlert
                   setAlertContent={setAlertContent}
                   open={!!(open && alertContent)}
                   setOpen={setOpen}
                   status={alertStatus}
               >
                   {alertContent}
               </StatusAlert>
           </Box>
            {selectedGame.game !== "words" && (
                <RoundData
                    getAlertContent={getAlertContent}
                    gameType={game?.game}
                    count={game?.rounds.length}
                />
            )}
            {game &&  (
               <>
                   <FlatList data={game.rounds} renderItem={({item}) => <GameRound
                       gameType={game.game}
                       round={item}
                   />} keyExtractor={(item) => item.id.toString()} />
               </>
            )}
            {game?.game === "guess a word" && (
                <GameTextField
                    activateAlert={activateAlert}
                    chatId={selectedGame.activeChat}
                />
            )}
            {game?.game === "truth or dare" && (
                <TruthDareField  activateAlert={activateAlert} chatId={selectedGame.activeChat} />
            )}
            {game?.game === "words" && (
                <WorldField  activateAlert={activateAlert} chatId={selectedGame.activeChat} nativeRound={ game?.rounds.find((r) => r.round_status === "active")!} />
            )}
        </Box>
    );
};

export default Game;