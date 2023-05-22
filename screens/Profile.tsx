import React, {useLayoutEffect} from 'react';
import {Avatar, Box, Center, Heading, Text, VStack} from "native-base";
import {useAppSelector} from "../hooks/useStore";
import {selectUser} from "../store/slices/userSlice";
import Actions from "../components/profile/Actions";
import UserData from "../components/profile/UserData";
import EditProfile from "../components/profile/EditProfile";
import ChangePasswordForm from "../components/profile/ChangePasswordForm";
import {useGetProfileQuery} from "../services/authService";

interface ProfileProps {
    route: any;
    navigation: any;
}

const Profile: React.FC<ProfileProps> = ({navigation, route}) => {
    const me = useAppSelector(selectUser)
    const [userProfile, setUserProfile] = React.useState<any>(null)
    const [action, setAction] = React.useState<'edit' | 'photo' | 'change' | null>(null)

    const {id} = route.params
    const { data: user, isLoading, error } = useGetProfileQuery(id);

    useLayoutEffect(() => {
        if(user) {
            setUserProfile(user)
        }  else {
            setUserProfile(me)
        }
    }, [id])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Box flexDir={'row'} alignItems={'center'}>
                    <Avatar size={8} source={{uri: userProfile?.image_url}} mr={2}>{userProfile?.fullName.slice(0,2)}</Avatar>
                    <Heading fontSize={20}>{userProfile?.fullName || 'Loading'}</Heading>
                </Box>
            ),
        })
    }, [user])

    const onChangeAction = (action: any) => {
        setAction(prev => action === prev ? null : action)
    }

    if(!userProfile || !me) return (
        <Center flex={1}>
            <Heading size={'xl'} color={"primary.700"}>Loading...</Heading>
        </Center>
    )


    return (
        <Box flex={1} pt={8} bgColor={'primary.700'} alignItems={'center'}>
            <Box mx={'10%'} w={'80%'}>
                <Box flexDir={'row'} justifyContent={'center'} alignItems={'center'} mb={4}>
                    <Avatar size={'2xl'} mr={4} source={{uri: userProfile?.image_url}}>{userProfile?.fullName.slice(0,2)}</Avatar>
                    {userProfile.id === me.id && <Actions action={action} onChange={onChangeAction}/> }
                </Box>
                {(!action || userProfile.id !== me.id) && <UserData user={userProfile}/>}
                {action === 'edit' && (
                    <EditProfile user={me} />
                )}
                {action === 'photo' && (
                    <EditProfile user={me} photo={true} />
                )}
                {action === 'change' && (
                    <ChangePasswordForm user={me} setAction={setAction} />
                )}
            </Box>
        </Box>
    );
};

export default Profile;