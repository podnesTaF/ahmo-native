import React from 'react';
import {Avatar, Box, Flex, Pressable, Spacer, Text} from "native-base";
import {IChat} from "../../models/chat";

interface ConversationProps {
    chat: IChat
}

const Conversation: React.FC<ConversationProps> = ({chat}) => {
    return (
        <Box alignItems={'center'} w={'100%'}>
            <Pressable w={'100%'}>
                {({isHovered, isFocused, isPressed}) => (
                    <Box py={3} px={4} w={'100%'} bg={isPressed ? 'secondary.500' : isHovered ? 'secondary.500' : 'primary.700'} style={{
                        transform: [{
                            scale: isPressed ? 0.97 : 1
                        }]
                    }} flexDir={'row'}>
                        <Avatar mr={4} bg="warmGray.200" source={{
                            uri: chat?.image_url
                        }}>
                            {chat?.name?.slice(0,2) || 'loading'}
                        </Avatar>
                        <Box>
                            <Text>{chat?.name}</Text>
                            <Text>{chat?.lastMessage?.text || 'no messages yet'}</Text>
                        </Box>
                        <Spacer />
                        <Text fontSize={10} color="coolGray.200">
                            1 month ago
                        </Text>
                    </Box>
                )}
            </Pressable>

        </Box>
    );
};

export default Conversation;