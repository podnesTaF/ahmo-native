import React from 'react';
import {Box, Center, Heading, Pressable} from "native-base";
import {useNavigation} from "@react-navigation/native";
import {ImageBackground} from "react-native";

interface ChatCardProps {
    imageUri: string;
    link: 'Home';
    title: string;
    bgColor: string;
}

const ChatCard:React.FC<ChatCardProps> = ({imageUri, link, title, bgColor}) => {
    const navigation = useNavigation();

    return (
        <Pressable w={'100%'} my={4} alignItems={'center'}>
            {({isHovered, isFocused, isPressed}) => (
                <Center w={'300px'} shadow="3" bg={isPressed ? `${bgColor}.500` : isHovered ? `${bgColor}.500` : `${bgColor}.700`} p={4} rounded="8" style={{
                    transform: [{
                        scale: isPressed ? 0.96 : 1
                    }]
                }}>
                    <ImageBackground source={require(`../../assets/puzzles.png`)} style={{width: '100%', height: 250, justifyContent: 'center'}} imageStyle={{borderRadius: 8}}>
                        <Center bgColor={'rgba(0,0,0,0.5)'}>
                            <Heading color={'white'} size={'lg'}>{title}</Heading>
                        </Center>
                    </ImageBackground>
                </Center>
            )}
        </Pressable>
    );
};

export default ChatCard;