import React from 'react';
import {Box, Center, Heading, HStack, Image} from "native-base";
import {ImageBackground} from "react-native";

interface AuthWrapperProps {
    children: React.ReactNode;
    mode: 'login' | 'register'
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({children, mode}) => {
    return (
        <Center flex={1}>
            <ImageBackground source={require('../../assets/emoji-img.png')} style={{ flex: 1, width: '100%', alignItems: 'center'}} >
                <Box safeArea p="2" w="90%" maxW="290" py="8">
                    <HStack alignItems={'center'} mb={4}>
                        <Image source={require('../../assets/ahmo-logo.png')} alt={'logo'} size={'sm'} mr={4} />
                        <Heading size="lg" fontWeight="600" color="coolGray.200" _dark={{
                            color: "warmGray.50"
                        }}>
                            Welcome
                        </Heading>
                    </HStack>
                    <Heading mt="1" color="coolGray.600" _dark={{
                        color: "warmGray.200"
                    }} fontWeight="medium" size="xs">
                        {mode === 'register' ? 'Sign up' : 'Log in'} to continue!
                    </Heading>
                {children}
                </Box>
            </ImageBackground>
        </Center>
    );
};

export default AuthWrapper;