import React from 'react';
import {Box, Button, Center, FormControl, Heading, HStack, Image, Input, Link, Text, View, VStack} from "native-base";

interface RegisterProps {
    navigation: {
        navigate: (screenName: string) => void;
        goBack: () => void;
    }
}

const Register:React.FC<RegisterProps> = ({navigation}) => {
    return (
        <Center w="100%" flex={1} bg='primary.700'>
            <Box safeArea p="2" w="90%" maxW="290" py="8">
                <HStack alignItems={'center'} mb={4}>
                    <Image source={require('../assets/ahmo-logo.png')} alt={'logo'} size={'sm'} mr={4} />
                    <Heading size="lg" fontWeight="600" color="coolGray.200" _dark={{
                        color: "warmGray.50"
                    }}>
                        Welcome
                    </Heading>
                </HStack>
                <Heading mt="1" color="coolGray.600" _dark={{
                    color: "warmGray.200"
                }} fontWeight="medium" size="xs">
                    Sign up to continue!
                </Heading>
                <VStack space={3} mt="5">
                    <FormControl>
                        <FormControl.Label>Email</FormControl.Label>
                        <Input />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Password</FormControl.Label>
                        <Input type="password" />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Confirm Password</FormControl.Label>
                        <Input type="password" />
                    </FormControl>
                    <Button mt="2" colorScheme="indigo">
                        Sign up
                    </Button>
                    <HStack mt="6" justifyContent="center">
                        <Text fontSize="sm" color="coolGray.600" _dark={{
                            color: "warmGray.200"
                        }}>
                            I already have an account.{" "}
                        </Text>
                        <Link onPress={() => navigation.navigate('Login')} _text={{
                            color: "indigo.500",
                            fontWeight: "medium",
                            fontSize: "sm"
                        }}>
                            Sign in
                        </Link>
                    </HStack>
                </VStack>
            </Box>
        </Center>
    );
};

export default Register;