import React, {useEffect, useState} from 'react';
import {Box, Button, FormControl, Heading, VStack} from "native-base";
import {IUser} from "../../models/user";
import {ChangePasswordFormData, useUpdateUserPasswordMutation} from "../../services/authService";
import {ChangePasswordSchema} from "../../utils/validation";
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import FormField from "../auth/FormField";
import {Alert} from "react-native";


interface ChangePasswordFormProps {
    user?: IUser | null;
    setAction: Function;
}
const ChangePasswordForm: React.FC<ChangePasswordFormProps>  = ({user, setAction}) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [updateUserPassword, { isLoading, error }] =
        useUpdateUserPasswordMutation();

    const methods = useForm<ChangePasswordFormData>({
        mode: "onChange",
        resolver: yupResolver(ChangePasswordSchema),
        defaultValues: {
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        },
    });

    useEffect(() => {
        // @ts-ignore
        setErrorMessage(error?.data?.message || "");
    }, [error]);

    useEffect(() => {
        if(errorMessage) {
                Alert.alert('Error', errorMessage);
        }
    }, [errorMessage])

    const onSubmit = async (dto: ChangePasswordFormData) => {
        if (!user) return;
        try {
            const result = await updateUserPassword({ userId: user.id, body: dto });
            // @ts-ignore
            const data = result.data;
            if (data) {
                setAction(false);
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <FormProvider {...methods}>
            <Heading>Change password</Heading>
            <VStack space={3} mt="5">
                <FormField name="oldPassword" label="Old Password" type="password" />
                <FormField name="newPassword" label="New Password" type="password" />
                <FormField
                    name="confirmNewPassword"
                    label="Confirm New Password"
                    type="password"
                />
                <Button disabled={
                    !methods.formState.isValid ||
                    isLoading ||
                    methods.formState.isSubmitting
                } onPress={methods.handleSubmit(onSubmit)} mt="2" colorScheme="warning">
                    Submit
                </Button>
            </VStack>
        </FormProvider>
    );
};

export default ChangePasswordForm;