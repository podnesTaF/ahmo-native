import React from 'react';
import {Avatar, Box, Flex, Pressable, Spacer, Text} from "native-base";
import {IChat} from "../../models/chat";
import {useAppDispatch, useAppSelector} from "../../hooks/useStore";
import {selectActiveChat, setActiveChat, setGameChat} from "../../store/slices/chatSlice";
import {selectUser} from "../../store/slices/userSlice";
import {getDirectName, getLastMessage} from "../../utils/chat-helpers";
import {useNavigation} from "@react-navigation/native";

interface ConversationProps {
    chat: IChat
}

const Conversation: React.FC<ConversationProps> = ({chat}) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const activeChat = useAppSelector(selectActiveChat);
    const navigation = useNavigation()
    const activateChat = () => {

            if (!chat) return;
            if (chat.type === "game") {
                dispatch(setGameChat(chat));
                // @ts-ignore
                navigation.navigate('Chat')
            } else {
                dispatch(setActiveChat(chat));
                // @ts-ignore
                navigation.navigate('Chat')
            }
        };

    return (
        <Box alignItems={'center'} w={'100%'}>
            <Pressable onPress={activateChat} w={'100%'}>
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
                        <Box flex={1} flexDir={'row'} borderBottomColor={'coolGray.500'} borderBottomWidth={1}>
                            <Box>
                                <Text>{chat?.name || getDirectName(user!.id, chat.members)?.fullName}</Text>
                                <Text>{chat.type === "game" && "game is active"}
                                    {chat.type !== "game" &&
                                        getLastMessage(chat.lastMessage, user?.id)}</Text>
                            </Box>
                            <Spacer />
                            <Text fontSize={10} color="coolGray.200">
                                1 month ago
                            </Text>
                        </Box>
                    </Box>
                )}
            </Pressable>

        </Box>
    );
};

export default Conversation;