import {useAppDispatch, useAppSelector} from "../hooks/useStore";
import {removeUser, selectUser} from "../store/slices/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";
import {Box, Button} from "native-base";
import React from "react";

const CustomDrawerContent = (props: any) => {
    const user = useAppSelector(selectUser)
    const dispatch = useAppDispatch()
    const navigation = props.navigation

    const logout = async() => {
        try {
            await AsyncStorage.removeItem('userToken');
        } catch (e: any) {
            console.log(e)
        }
        dispatch(removeUser())
        navigation.navigate('Home')
    }

    return (
        <DrawerContentScrollView style={{backgroundColor: 'primary.500', flex:1}} {...props}>
            <Box bg="primary.500" flex={1}>
                <DrawerItemList {...props} />
                {user && (
                    <Button colorScheme={'secondary'} variant={'outline'} onPress={logout} m={2}>
                        Logout
                    </Button>
                )}
            </Box>
        </DrawerContentScrollView>
    );
};


export default CustomDrawerContent;