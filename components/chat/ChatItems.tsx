import React from 'react';
import {Box, FlatList, Text} from "native-base";

interface ChatItemsProps {
    chats: any
}

const ChatItems: React.FC<ChatItemsProps> = ({chats}) => {
    return (
        <FlatList data={chats} renderItem={({item}) => <Box><Text>{item.name}</Text></Box>} keyExtractor={(item: any) => item.id} />
    );
};

export default ChatItems;