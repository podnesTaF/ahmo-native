import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RouteProp } from "@react-navigation/native";

export type DrawerParamList = {
    Home: undefined;
    Login: undefined;
    Register: undefined;
    Profile: undefined;
    Menu: undefined;
};

export type StackParamList = {
    Drawer: undefined;
    Chat: any;
    Game: any;
    CreateChat: any;
};

export type HomeScreenNavigationProp = DrawerNavigationProp<DrawerParamList, 'Home'>;
export type LoginScreenNavigationProp = DrawerNavigationProp<DrawerParamList, 'Login'>;
export type RegisterScreenNavigationProp = DrawerNavigationProp<DrawerParamList, 'Register'>;

export type DrawerNavigatorProps = {
    navigation: HomeScreenNavigationProp | LoginScreenNavigationProp | RegisterScreenNavigationProp;
    route: RouteProp<StackParamList, 'Drawer'>;
};