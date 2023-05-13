import React from 'react';
import {Box, Text} from "native-base";
import SearchBar from "../components/chat/SearchBar";
import Tabs from "../components/chat/Tabs";

const Chat = () => {
    return (
        <Box bgColor={'primary.700'} flex={1}>
            <Box my={4}>
                <SearchBar/>
            </Box>
            <Tabs />
        </Box>
    );
};

export default Chat;