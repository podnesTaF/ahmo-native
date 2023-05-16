import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {IMessage} from "../../models/message";
import {Avatar, Box, Center, FlatList, Heading, Icon, ScrollView} from "native-base";
import Message from "./Message";
import {useAppSelector} from "../../hooks/useStore";
import {selectUser} from "../../store/slices/userSlice";
import {isAvatarUnvisible} from "../../utils/chat-helpers";
import {Ionicons} from "@expo/vector-icons";
import {IChat} from "../../models/chat";

interface ChatBoxProps {
    data: IChat;
    messages: IMessage[]
}

const ChatBox: React.FC<ChatBoxProps> = ({data, messages}) => {
    const [oldData, setOldData] = useState<any>();
    const user = useAppSelector(selectUser)

    const scrollRef = useRef<any>();


    useLayoutEffect(() => {
        if (scrollRef.current && data?.messages) {
            scrollRef.current?.scrollToEnd({ animated: true });
        }
    }, [data]);

    return (
        <Box flex={1} w={'100%'} px={2}>
            {user && (
               <Box mt={'auto'}>
                   {messages?.length ? (
                       <FlatList
                           ref={scrollRef}
                           w={'100%'}
                           data={messages}
                           renderItem={(itemData: {item: IMessage, index: number}) =>
                               <Message
                                   message={itemData.item}
                                   isMy={itemData.item.sender.id === user.id}
                                   isAvatarUnvisible={isAvatarUnvisible(user.id, itemData.item, messages, itemData.index)}
                               />
                           }
                           keyExtractor={(item) => item.id.toString()}
                       />
                   ) : (
                       <Center flex={1} w={'100%'}>
                            <Heading fontSize={20} color={'white'}>No messages yet</Heading>
                       </Center>
                   )}
               </Box>
            )}
        </Box>
    );
};

export default ChatBox;