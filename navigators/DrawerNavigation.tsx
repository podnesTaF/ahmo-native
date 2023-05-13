import {DrawerNavigatorProps, DrawerParamList} from "./types/navigation";
import {useAppSelector} from "../hooks/useStore";
import {selectUser} from "../store/slices/userSlice";
import {Avatar, useTheme} from "native-base";
import Profile from "../screens/Profile";
import Home from "../screens/Home";
import Login from "../screens/Login";
import Register from "../screens/Register";
import React from "react";
import {createDrawerNavigator} from "@react-navigation/drawer";
import CustomDrawerContent from "./CustomDrawerContent";
import Chat from "../screens/Chat";

export const Drawer = createDrawerNavigator<DrawerParamList>();
const DrawerNavigator = () => {
    const user = useAppSelector(selectUser)
    const theme = useTheme();
    return <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props}/>} screenOptions={{
        drawerInactiveBackgroundColor: theme.colors.primary[500],
        drawerActiveBackgroundColor: theme.colors.primary[700],
        drawerActiveTintColor: theme.colors.warning[500],
        drawerInactiveTintColor: 'white',
        drawerStyle: {
            backgroundColor: theme.colors.primary[500],
        },
        headerTintColor: theme.colors.secondary[600],
        headerStyle: {
            backgroundColor: theme.colors.primary[700],
            borderBottomWidth: 0,
        }
    }}>
        {user ? (
            <>
                <Drawer.Screen name={'Profile'} component={Profile} options={{
                    title: `${user.fullName}'s Profile`,
                    drawerIcon: ({ focused, size }) => (
                        <Avatar  bg="warning.500" size={'sm'} source={{uri: user.image_url}}>{user?.fullName.slice(0,2)}</Avatar>
                    ),
                    drawerItemStyle: {
                        borderBottomWidth: 1,
                        borderBottomColor: theme.colors.secondary[500],
                    }
                }} />
                <Drawer.Screen name={'Home'} component={Home} options={{
                    headerTitle: 'AHMO Chat',
                    title: 'Home',
                }} />
                <Drawer.Screen name={'Chat'} component={Chat} options={{
                    headerTitle: 'Chat',
                    title: 'Chat',
                }} />
            </>
        ) : (
           <>
               <Drawer.Screen name={'Home'} component={Home} options={{
                   title: 'AHMO Chat',
               }} />
               <Drawer.Screen name="Login" component={Login} options={{
                   headerStyle: {
                       backgroundColor: theme.colors.primary[700],
                   }
               }} />
               <Drawer.Screen name="Register" component={Register} />
           </>
        )}
    </Drawer.Navigator>;
}

export default DrawerNavigator;