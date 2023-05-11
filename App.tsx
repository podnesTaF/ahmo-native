import { StatusBar } from 'expo-status-bar';
import {NativeBaseProvider, Box, Center} from "native-base";
import ExampleCard from "./components/exampleCard";
import Example from "./components/centerExample";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import {NavigationContainer} from "@react-navigation/native";
import {theme} from "./constants/theme"
import {DrawerNavigatorProps, DrawerParamList, StackParamList} from "./types/navigation";


const Stack = createNativeStackNavigator<StackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = ({ navigation, route }: DrawerNavigatorProps) => {
    return <Drawer.Navigator>
        <Drawer.Screen name={'Home'} component={Home} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Register" component={Register} />
    </Drawer.Navigator>;
}

export default function App() {
  return (
     <>
         <StatusBar />
         <NativeBaseProvider theme={theme}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name={'Drawer'} component={DrawerNavigator} options={{ headerShown: false}} />
                </Stack.Navigator>
            </NavigationContainer>
         </NativeBaseProvider>
     </>
  );
}
