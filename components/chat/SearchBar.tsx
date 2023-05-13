import React from 'react';
import {Heading, Icon, Input, VStack} from "native-base";
import {MaterialIcons} from "@expo/vector-icons";

const SearchBar = () => {
    return (
        <VStack w="100%" space={5} alignSelf="center">
            <Heading fontSize="lg">Material</Heading>
            <Input placeholder="Search Chats" width="95%" mx={3} borderRadius="4" py="3" px="1" fontSize="14" InputLeftElement={<Icon m="2" ml="3" size="6" color="gray.400" as={<MaterialIcons name="search" />} />} />
        </VStack>
    );
};

export default SearchBar;