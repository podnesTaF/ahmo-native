import React, {useEffect, useLayoutEffect} from 'react';
import {Avatar, Box, Heading, Icon, IconButton, Text} from "native-base";
import {Ionicons} from "@expo/vector-icons";
import {useAppDispatch, useAppSelector} from "../hooks/useStore";
import {selectActiveChat, setGameChat} from "../store/slices/chatSlice";
import {selectUser} from "../store/slices/userSlice";
import {useGetGameQuery} from "../services/gameService";
import {IRound} from "../models/game";
import {socket} from "../utils/socket";
import {setRound} from "../store/slices/roundSlice";

interface GameProps {
    navigation: any;
}

const Game: React.FC<GameProps> = ({navigation}) => {
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
                <Box w={'90%'} flexDir={'row'} alignItems={'center'} justifyContent={'space-between'} borderBottomWidth={1} borderBottomColor={'coolGray.500'}>
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

    return (
        <Box bgColor={'primary.700'} flex={1}>
            <Text>Game Chat</Text>
        </Box>
    );
};

export default Game;