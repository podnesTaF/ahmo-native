import React from 'react';
import {Box, Center, Heading, ScrollView, Text} from "native-base";
import {useAppSelector} from "../hooks/useStore";
import {selectUser} from "../store/slices/userSlice";
import ChatCard from "../components/home/ChatCard";

const cards = [
    {
        title: 'Personal Chats',
        imageUri: "chat-pic.jpg",
        link: 'Home',
        bgColor: 'primary'
    } as const,
    {
        title: 'Game Chats',
        imageUri: "puzzles.png",
        link: 'Home',
        bgColor: 'coolGray'
    } as const,
    {
        title: 'Group Chats',
        imageUri: "hi-hey.png",
        link: 'Home',
        bgColor: 'primary'
    } as const
]

const Home = () => {
    const user = useAppSelector(selectUser)
    return (
       <ScrollView>
           <Box pt={5} flex={1} bgColor={'primary.700'}>
               <Heading color={"secondary.600"} size={'xl'} textAlign={'center'}>Welcome to ahmo game chat!</Heading>
               <Text color={'white'} textAlign={'center'} my={5}>
                   Here, you can chat with your friends while enjoying with fun games. We hope you have a great time connecting with your buddies and playing exciting games together. Don't hesitate to ask for help or reach out to our support team if you need any assistance. Enjoy your stay
               </Text>
               <Center w={'100%'} alignItems='center' justifyContent={'center'}>
                   <Heading color={'secondary.500'} size={'xl'} textAlign={'center'}> Choose Your Chat bellow</Heading>
                   {cards.map((card, index) => (<ChatCard imageUri={card.imageUri} link={card.link} title={card.title} bgColor={card.bgColor} />))}
               </Center>
           </Box>
       </ScrollView>
    );
};

export default Home;