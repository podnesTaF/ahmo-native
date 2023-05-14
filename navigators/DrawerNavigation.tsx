import {DrawerParamList} from "./types/navigation";
import {useAppSelector} from "../hooks/useStore";
import {selectUser} from "../store/slices/userSlice";
import {Avatar, Icon, IconButton, useTheme} from "native-base";
import Profile from "../screens/Profile";
import Home from "../screens/Home";
import Login from "../screens/Login";
import Register from "../screens/Register";
import React from "react";
import {createDrawerNavigator} from "@react-navigation/drawer";
import CustomDrawerContent from "./CustomDrawerContent";
import Menu from "../screens/Menu";
import {Ionicons} from "@expo/vector-icons";

export const Drawer = createDrawerNavigator<DrawerParamList>();

interface DrawerNavigatorProps {
    navigation: any;
}

const DrawerNavigator: React.FC<DrawerNavigatorProps> = ({navigation}) => {
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
                    headerTitle: 'AHMO Menu',
                    title: 'Home',
                }} />
                <Drawer.Screen name={'Menu'} component={Menu} options={{
                    headerTitle: 'Chat Menu',
                    title: 'Chat Menu',
                    headerRight: (props: any) =>
                        <IconButton
                            icon={<Icon as={Ionicons} name={'add'} size={8} color={props.tintColor} />}
                            onPress={() => navigation.navigate('CreateChat' as any)}
                        />
                }} />
            </>
        ) : (
           <>
               <Drawer.Screen name={'Home'} component={Home} options={{
                   title: 'AHMO Menu',
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