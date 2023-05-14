import React from 'react';
import {Avatar, Box, HStack, Spacer, Text} from "native-base";
import {IMessage} from "../../models/message";
import {format} from "timeago.js";

interface MessageProps {
    isMy?: boolean;
    isAvatarUnvisible: boolean;
    message: IMessage;
    ref?: any;
}

const Message: React.FC<MessageProps> = ({isMy, message, isAvatarUnvisible,ref}) => {
    return (
        <HStack mb={3}>
           <Avatar size={'md'} bg={'secondary.600'} style={{opacity: isAvatarUnvisible ? 0 : 1}} source={{uri: message.sender.image_url}} mr={2}>
                {message.sender.fullName.slice(0,2)}
           </Avatar>
            <Box flexDir={'row'} borderRadius={4} bgColor={isMy ? 'primary.300' : 'primary.500'} p={3}>
                <Text fontSize={16} color={"coolGray.50"} alignSelf={'center'} mr={4}>{message.text}</Text>
                <Spacer />
                <Text fontSize={10} mt={2} alignSelf={'end'} color="coolGray.200">
                    {format(message.createdAt)}
                </Text>
            </Box>
        </HStack>
    );
};

export default Message;