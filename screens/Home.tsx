import React from 'react';
import {Center, Heading} from "native-base";
import {useAppSelector} from "../hooks/useStore";
import {selectUser} from "../store/slices/userSlice";

const Home = () => {
    const user = useAppSelector(selectUser)
    return (
        <Center flex={1}>
            <Heading color={"primary.700"}>Welcome {user && user.fullName}</Heading>
        </Center>
    );
};

export default Home;