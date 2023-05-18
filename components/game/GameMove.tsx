import React from 'react';
import {Avatar, Box, HStack, Spacer, Text} from "native-base";
import {IMove} from "../../models/game";
import {format} from "timeago.js";

interface RoundMoveProps {
    move: IMove;
    my: boolean;
}

const GameMove: React.FC<RoundMoveProps> = ({ move, my }) => {
    return (
        <HStack mb={3}>
            <Avatar size={'md'} bg={'secondary.600'} source={{uri: move.player.image_url}} mr={2}>
                {move.player.fullName.slice(0,2)}
            </Avatar>
            <Box flexDir={'row'} borderRadius={4} bgColor={my ? 'primary.300' : 'primary.500'} p={3}>
                <Text fontSize={16} color={"coolGray.50"} mr={4}>{move.move_data}</Text>
                <Spacer />
                <Text fontSize={10} mt={2} color="coolGray.200">
                    {format(move.createdAt)}
                </Text>
            </Box>
        </HStack>
    );
};

export default GameMove;