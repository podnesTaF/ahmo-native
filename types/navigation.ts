import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RouteProp } from "@react-navigation/native";

export type DrawerParamList = {
    Home: undefined;
    Login: undefined;
    Register: undefined;
};

export type StackParamList = {
    Drawer: undefined;
};

export type HomeScreenNavigationProp = DrawerNavigationProp<DrawerParamList, 'Home'>;
export type LoginScreenNavigationProp = DrawerNavigationProp<DrawerParamList, 'Login'>;
export type RegisterScreenNavigationProp = DrawerNavigationProp<DrawerParamList, 'Register'>;

export type DrawerNavigatorProps = {
    navigation: HomeScreenNavigationProp | LoginScreenNavigationProp | RegisterScreenNavigationProp;
    route: RouteProp<StackParamList, 'Drawer'>;
};