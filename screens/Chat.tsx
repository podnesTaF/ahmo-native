import React, {useLayoutEffect, useState} from 'react';
import {Avatar, Box, Heading, Icon, IconButton, Text} from "native-base";
import {useAppSelector} from "../hooks/useStore";
import {selectActiveChat} from "../store/slices/chatSlice";
import {selectUser} from "../store/slices/userSlice";
import {Ionicons} from "@expo/vector-icons";
import ChatBox from "../components/chat/ChatBox";
import {useFetchChatWithMessagesQuery} from "../services/chatService";
import ChatTextArea from "../components/chat/ChatTextArea";
import {getReceivers} from "../utils/chat-helpers";
import ChatSettings from "../components/chat/ChatSettings";

interface ChatProps {
    navigation: any;
    route: any;
}

const Chat: React.FC<ChatProps> = ({navigation, route}) => {
    const activeChat = useAppSelector(selectActiveChat);
    const [isOpen, setIsOpen] = useState(false);
    const user = useAppSelector(selectUser);

    const { data, isLoading } = useFetchChatWithMessagesQuery(
        activeChat.activeChat
    );

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Box flexDir={'row'} alignItems={'center'}>
                    <Avatar size={8} source={{uri: activeChat.image_url}} mr={2}>{activeChat.name.slice(0,2)}</Avatar>
                    <Heading fontSize={20}>{activeChat.name}</Heading>
                </Box>
            ),
            headerRight: (props: any) => <IconButton icon={<Icon as={Ionicons} name={'settings-outline'} size={6} onPress={() => setIsOpen(true)} color={props.tintColor} />} _pressed={{
                opacity: 0.7
            }} />,
        })
    }, [activeChat])

    return (
       <Box bgColor={'primary.700'} flex={1}>
           {data ? <ChatBox data={data} messages={data.messages} /> : <Text>Loading...</Text>}
           {user && <ChatTextArea activeChatId={activeChat.activeChat} receivers={getReceivers(user.id, activeChat?.members)} />}
           {data &&  <ChatSettings chat={data} isOpen={isOpen} onClose={() => setIsOpen(false)} />}
       </Box>
    );
};

export default Chat;