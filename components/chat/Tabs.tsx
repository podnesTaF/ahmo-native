import React from 'react';
import {Box, HStack, Text} from "native-base";

const Tabs = () => {
    return (
        <HStack w={'100%'} justifyContent={'center'}>
            <Box flex={1} alignItems={'center'} borderColor={'warning.500'} borderBottomWidth={'2'}>
                <Text pb={2}>All</Text>
            </Box>
            <Box flex={1} alignItems={'center'}>
                <Text pb={2}>Games</Text>
            </Box>
            <Box flex={1} alignItems={'center'}>
                <Text pb={2}>Direct</Text>
            </Box>
            <Box flex={1} alignItems={'center'}>
                <Text pb={2}>Groups</Text>
            </Box>
        </HStack>
    );
};

export default Tabs;