import React from 'react';
import {Box, Heading, Text, VStack} from "native-base";
import {IUser} from "../../models/user";

interface UserDataProps {
    user: IUser
}

const UserData: React.FC<UserDataProps> = ({user}) => {
    return (
        <Box>
            <Box borderBottomWidth={1} borderBottomColor={'coolGray.500'} py={2} flexDir={'row'} justifyContent={'space-between'}>
                <Heading size={'lg'} color={'primary.50'}>{user?.fullName}</Heading>
                <VStack alignItems={'flex-end'} flex={1}>
                    <Heading size={'md'} color={'primary.50'}>{user?.email}</Heading>
                    <Text color={'coolGray.400'}>+32 043 24 23 12</Text>
                </VStack>
            </Box>
            <Box mt={4}>
                <Heading size={'sm'}>
                    Bio
                </Heading>
                <Text color={'coolGray.400'}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus commodi culpa nemo neque non voluptate? A, asperiores cupiditate debitis deleniti dolore eius explicabo facilis fugiat in ipsam laboriosam laborum, maxime natus necessitatibus nisi nobis obcaecati perferendis quo recusandae sed voluptatum?</Text>
            </Box>
        </Box>
    );
};

export default UserData;