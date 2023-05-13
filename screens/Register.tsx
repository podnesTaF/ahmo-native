import React from 'react';
import {Button, HStack, Link, Text, VStack} from "native-base";
import FormField from "../components/auth/FormField";
import AuthWrapper from "../components/auth/AuthWrapper";

interface RegisterProps {
    navigation: {
        navigate: (screenName: string) => void;
        goBack: () => void;
    }
}

const Register:React.FC<RegisterProps> = ({navigation}) => {
    return (
        <AuthWrapper mode={'register'}>
                <VStack space={3} mt="5">
                    <FormField name={'fullName'} label={'Full Name'} bgColor={'primary.700'} variant={'filled'} />
                    <FormField name={'email'} label={'Email'} bgColor={'primary.700'} variant={'filled'} />
                    <FormField name={'password'} label={'Password'} bgColor={'primary.700'} variant={'filled'} type={'password'} />
                    <Button mt="2" colorScheme="warning">
                        Sign up
                    </Button>
                    <HStack mt="6" justifyContent="center">
                        <Text fontSize="sm" color="coolGray.600" _dark={{
                            color: "warmGray.200"
                        }}>
                            I already have an account.{" "}
                        </Text>
                        <Link onPress={() => navigation.navigate('Login')} _text={{
                            color: "warning.500",
                            fontWeight: "medium",
                            fontSize: "sm"
                        }}>
                            Sign in
                        </Link>
                    </HStack>
                </VStack>
        </AuthWrapper>
    );
};

export default Register;