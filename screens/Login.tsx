import React, {useState} from 'react';
import { Button,   Text,  HStack,  Link,  VStack} from "native-base";
import FormField from "../components/auth/FormField";
import AuthWrapper from "../components/auth/AuthWrapper";
import {useLoginUserMutation} from "../services/authService";
import { yupResolver } from "@hookform/resolvers/yup";
import {FormProvider, useForm} from "react-hook-form";
import {LoginFormSchema} from "../utils/validation";

interface LoginProps {
    navigation: {
        navigate: (screenName: string) => void;
        goBack: () => void;
    };
}

const Login: React.FC<LoginProps> = ({navigation}) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [loginUser, { isLoading, error }] = useLoginUserMutation();
    // const dispatch = useAppDispatch();

    const form = useForm({
        mode: "onChange",
        resolver: yupResolver(LoginFormSchema),
    });

    const onSubmit = async (dto: any) => {}

    return (
        <AuthWrapper mode={'login'}>
            <FormProvider {...form}>
                   <VStack space={3} mt="5">
                       <FormField name={'email'} label={'Email ID'} bgColor={'primary.700'} variant={'filled'} />
                       <FormField name={'password'} label={'Password'} bgColor={'primary.700'} variant={'filled'}>
                           <Link _text={{
                               fontSize: "xs",
                               fontWeight: "500",
                               color: "warning.500"
                           }} alignSelf="flex-end" mt="1">
                               Forget Password?
                           </Link>
                       </FormField>
                       <Button mt="2" colorScheme="warning">
                           Sign in
                       </Button>
                       <HStack mt="6" justifyContent="center">
                           <Text fontSize="sm" color="coolGray.600" _dark={{
                               color: "warmGray.200"
                           }}>
                               I'm a new user.{" "}
                           </Text>
                           <Link onPress={() => navigation.navigate('Register')} _text={{
                               color: "warning.500",
                               fontWeight: "medium",
                               fontSize: "sm"
                           }}>
                               Sign Up
                           </Link>
                       </HStack>
                   </VStack>
            </FormProvider>
        </AuthWrapper>
    );
};

export default Login;