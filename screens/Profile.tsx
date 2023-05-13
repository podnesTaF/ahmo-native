import React from 'react';
import {Center, Heading} from "native-base";
import {useAppSelector} from "../hooks/useStore";
import {selectUser} from "../store/slices/userSlice";

interface ProfileProps {
    route: any;
}

const Profile: React.FC<ProfileProps> = ({route}) => {
    const user = useAppSelector(selectUser)

    return (
        <Center flex={1}>
            <Heading size={'xl'} color={"primary.700"}>Profile {user?.fullName}</Heading>
        </Center>
    );
};

export default Profile;