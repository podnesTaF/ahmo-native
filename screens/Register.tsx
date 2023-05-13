import React from 'react';
import {Button, HStack, Link, Text, VStack} from "native-base";
import FormField from "../components/auth/FormField";
import AuthWrapper from "../components/auth/AuthWrapper";
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {RegisterSchema} from "../utils/validation";
import {useAppDispatch} from "../hooks/useStore";
import {useRegisterUserMutation} from "../services/authService";
import {setUser} from "../store/slices/userSlice";

interface RegisterProps {
    navigation: {
        navigate: (screenName: string) => void;
        goBack: () => void;
    }
}

const Register:React.FC<RegisterProps> = ({navigation}) => {
   const dispatch = useAppDispatch();

   const [registerUser, {isLoading, error}] = useRegisterUserMutation();

    const form = useForm({
        mode: "onChange",
        resolver: yupResolver(RegisterSchema),
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
        }
    })

    const onSubmit = async (dto: any) => {
        try{
            const res = await registerUser(dto).unwrap();

            if(res) {
                dispatch(setUser(res));
            }

            navigation.navigate('Home');
        }catch (e: any) {
            if(e.status === 401) {
                form.setError('password', {type: 'manual', message: 'Invalid email or password'});
            } else {
                console.log(e)
            }
        }
    }

    return (
        <AuthWrapper mode={'register'}>
            <FormProvider {...form}>
                <VStack space={3} mt="5">
                    <FormField name={'fullName'} label={'Full Name'} bgColor={'primary.700'} variant={'filled'} />
                    <FormField name={'email'} label={'Email'} bgColor={'primary.700'} variant={'filled'} />
                    <FormField name={'password'} label={'Password'} bgColor={'primary.700'} variant={'filled'} type={'password'} />
                    <Button mt="2" onPress={form.handleSubmit(onSubmit)} colorScheme="warning">
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
            </FormProvider>
        </AuthWrapper>
    );
};

export default Register;