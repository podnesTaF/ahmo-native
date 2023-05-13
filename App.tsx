import { StatusBar } from 'expo-status-bar';
import {NativeBaseProvider, Box, Center} from "native-base";
import * as Font from 'expo-font';
import {createDrawerNavigator} from "@react-navigation/drawer";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import {NavigationContainer} from "@react-navigation/native";
import {theme} from "./constants/theme"
import {DrawerNavigatorProps, DrawerParamList, StackParamList} from "./types/navigation";
import {useLayoutEffect} from "react";
import { Provider } from 'react-redux';
import {store} from "./store";


const Stack = createNativeStackNavigator<StackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();
const loadFonts = async () => {
    await Font.loadAsync({
        'Quicksand-Regular': require('./assets/fonts/static/Quicksand-Regular.ttf'),
        'Quicksand-Medium': require('./assets/fonts/static/Quicksand-Medium.ttf'),
        'Quicksand-Bold': require('./assets/fonts/static/Quicksand-Bold.ttf'),
    });
};

const DrawerNavigator = ({ navigation, route }: DrawerNavigatorProps) => {
    return <Drawer.Navigator>
        <Drawer.Screen name={'Home'} component={Home} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Register" component={Register} />
    </Drawer.Navigator>;
}

export default function App() {

    useLayoutEffect(() => {
            loadFonts();
    }, [])

  return (
     <>
         <StatusBar />
         <Provider store={store}>
             <NativeBaseProvider theme={theme}>
                 <NavigationContainer>
                     <Stack.Navigator>
                         <Stack.Screen name={'Drawer'} component={DrawerNavigator} options={{ headerShown: false}} />
                     </Stack.Navigator>
                 </NavigationContainer>
             </NativeBaseProvider>
         </Provider>
     </>
  );
}
