import React from 'react';
import {Box, Button, Center, FormControl, Text, Heading, HStack, Input, Link, View, VStack, Image} from "native-base";

interface LoginProps {
    navigation: {
        navigate: (screenName: string) => void;
        goBack: () => void;
    };
}

const Login: React.FC<LoginProps> = ({navigation}) => {
    return (
        <Center w="100%" flex={1} bg='primary.700'>
            <Box safeArea p="2" py="8" w="90%" maxW="290">
                <HStack alignItems={'center'} mb={4}>
                    <Image source={require('../assets/ahmo-logo.png')} alt={'logo'} size={'sm'} mr={4} />
                    <Heading size="lg" fontWeight="600" color="coolGray.200" _dark={{
                        color: "warmGray.50"
                    }}>
                        Welcome
                    </Heading>
                </HStack>
                <Heading mt="1" textAlign={'center'} _dark={{
                    color: "warmGray.200"
                }} color="coolGray.600" fontWeight="medium" size="xs">
                    Sign in to continue!
                </Heading>
                <VStack space={3} mt="5">
                    <FormControl>
                        <FormControl.Label>Email ID</FormControl.Label>
                        <Input color={'gray.100'} />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Password</FormControl.Label>
                        <Input type="password" color={'white'} />
                        <Link _text={{
                            fontSize: "xs",
                            fontWeight: "500",
                            color: "indigo.500"
                        }} alignSelf="flex-end" mt="1">
                            Forget Password?
                        </Link>
                    </FormControl>
                    <Button mt="2" colorScheme="indigo">
                        Sign in
                    </Button>
                    <HStack mt="6" justifyContent="center">
                        <Text fontSize="sm" color="coolGray.600" _dark={{
                            color: "warmGray.200"
                        }}>
                            I'm a new user.{" "}
                        </Text>
                        <Link onPress={() => navigation.navigate('Register')} _text={{
                            color: "indigo.500",
                            fontWeight: "medium",
                            fontSize: "sm"
                        }}>
                            Sign Up
                        </Link>
                    </HStack>
                </VStack>
            </Box>
        </Center>
    );
};

export default Login;