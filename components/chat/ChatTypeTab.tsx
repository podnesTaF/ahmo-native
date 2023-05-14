import React from 'react';
import {Pressable, Text} from "native-base";
import {menuType} from "../../store/slices/menuSlice";

interface ChatTypeTabProps {
    name: string;
    selectedType: string;
    changeType: (type: string) => void;
}

const ChatTypeTab: React.FC<ChatTypeTabProps> = ({changeType, selectedType, name}) => {
    return (
        <Pressable
            onPress={changeType.bind(this, name.toLowerCase())}
            flex={1} alignItems={'center'}
            borderColor={'warning.500'}
            borderBottomWidth={selectedType === name.toLowerCase() ? '2' : '0'}>
            {({isHovered, isFocused, isPressed}) => (
                <Text color={selectedType === name.toLowerCase() ? 'warning.500' : 'coolGray.400'} opacity={isPressed ? 0.7 : isHovered ? 0.7 : 1} pb={2}>{name}</Text>
            )}
        </Pressable>
    );
};

export default ChatTypeTab;