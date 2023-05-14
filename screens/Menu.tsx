import React, {useEffect, useState} from 'react';
import {Box, Text} from "native-base";
import SearchBar from "../components/chat/SearchBar";
import Tabs from "../components/chat/Tabs";
import {IChat} from "../models/chat";
import {useNavigation} from "@react-navigation/native";
import {useFetchChatsQuery} from "../services/chatService";
import {useAppSelector} from "../hooks/useStore";
import {selectActiveChat} from "../store/slices/chatSlice";
import {selectUser} from "../store/slices/userSlice";
import {selectMenuType} from "../store/slices/menuSlice";
import {socket} from "../utils/socket";
import ChatItems from "../components/chat/ChatItems";

const Menu = () => {
    const [chats, setChats] = useState<IChat[]>([]);
    const { data, error, isLoading } = useFetchChatsQuery();
    const user = useAppSelector(selectUser);
    const activeChat = useAppSelector(selectActiveChat);
    const navigation = useNavigation();
    const selectedType = useAppSelector(selectMenuType);

    useEffect(() => {
        if (user) {
            socket.emit("addUser", user);
        }
    }, [user]);

    useEffect(() => {
        if (data) {
            setChats(data);
        }
    }, [data]);


    return (
        <Box bgColor={'primary.700'} flex={1}>
            <Box my={4}>
                <SearchBar/>
            </Box>
            <Tabs />
            {chats && <Box flex={1}>
                <ChatItems chats={chats} />
            </Box>}
        </Box>
    );
};

export default Menu;