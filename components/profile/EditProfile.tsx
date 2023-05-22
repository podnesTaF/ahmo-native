import React from 'react';
import {Box, Heading, Input, VStack} from "native-base";
import {IUser} from "../../models/user";
import EditableText from "./EditableText";
import useUpdateUserData from "../../hooks/useUpdateUser";
import {isEmail} from "../../utils/validation";
import { Alert } from 'react-native';

interface EditProfileProps {
    user: IUser;
    photo?: boolean
}

const EditProfile: React.FC<EditProfileProps> = ({user, photo}) => {
    const updateUserData = useUpdateUserData();

    const updateName = async (fullName: string) => {
        await updateUserData({
            fullName,
        });
    };

    const updateImageUrl = async (image_url: string) => {
        await updateUserData({
            image_url,
        });
    };

    const updateEmail = async (email: string) => {
        if(isEmail(email)) {
            await updateUserData({
                email,
            });
        } else {
            Alert.alert('Invalid email', 'Please enter a valid email address')
        }
    };

    return (
        <Box>
            <Heading mb={4}>Edit your {photo ? 'photo' : 'data'}</Heading>
            {photo ? (
                <EditableText onSubmit={updateImageUrl} oldValue={user.image_url || ''} placeholder={'enter new image url'} label={'Image Url'} />
            ) : (
                <>
                    <EditableText onSubmit={updateName} oldValue={user.fullName} placeholder={'enter new name'} label={'Full Name'} />
                    <EditableText onSubmit={updateEmail} oldValue={user.email} placeholder={'enter new email'} label={'Email'} />
                </>
            )}
        </Box>
    );
};

export default EditProfile;