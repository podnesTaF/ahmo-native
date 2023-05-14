import React, {useEffect} from 'react';
import {Box, FlatList, ScrollView, Text} from "native-base";
import {useAppDispatch, useAppSelector} from "../../hooks/useStore";
import {selectMenu, selectMenuType, setMenu} from "../../store/slices/menuSlice";
import Conversation from "./Conversation";
import {IChat} from "../../models/chat";

interface ChatItemsProps {
    chats?: IChat[];
}

const ChatItems: React.FC<ChatItemsProps> = ({chats}) => {
    const menu = useAppSelector(selectMenu);
    const menuType = useAppSelector(selectMenuType);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (chats) {
            // @ts-ignore
            dispatch(setMenu(chats));
        }
    }, [chats, dispatch]);

    return (
        <Box flex={1}>
            {menuType === 'all' ? (
                    <Box>
                        {chats ? (
                                <FlatList data={menu} renderItem={(itemData: {item: IChat, index: number }) => (
                                    <Conversation chat={itemData.item} />
                                )} keyExtractor={(item) => item.id.toString()} />

                            ) : (
                                <Text>No chats</Text>
                                )}
                    </Box>
                ) :
               (
                   <Box>
                       {chats ? (
                           <FlatList data={menu.filter((item: any) => item.type === menuType)} renderItem={(itemData: {item: IChat, index: number}) => <Conversation chat={itemData.item} />} keyExtractor={(item) => item.id.toString()} />
                       ) : (
                           <Text>No chats</Text>
                       )}
                   </Box>
               )}
        </Box>
    );
};

export default ChatItems;