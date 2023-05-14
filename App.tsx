import { StatusBar } from 'expo-status-bar';
import {Heading, NativeBaseProvider} from "native-base";
import * as Font from 'expo-font';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import {theme} from "./constants/theme"
import {StackParamList} from "./navigators/types/navigation";
import React, {useLayoutEffect, useState} from "react";
import { Provider } from 'react-redux';
import {store} from "./store";
import DrawerNavigator from "./navigators/DrawerNavigation";
import {ActivityIndicator, View} from "react-native";
import Chat from "./screens/Chat";
import CreateChat from "./screens/CreateChat";


const Stack = createNativeStackNavigator<StackParamList>();
const loadFonts = async () => {
    await Font.loadAsync({
        'Quicksand-Regular': require('./assets/fonts/static/Quicksand-Regular.ttf'),
        'Quicksand-Medium': require('./assets/fonts/static/Quicksand-Medium.ttf'),
        'Quicksand-Bold': require('./assets/fonts/static/Quicksand-Bold.ttf'),
    });
};


export default function App() {
    const [fontsLoaded, setFontsLoaded] = useState(false);


    useLayoutEffect(() => {
        (async () => {
            await loadFonts();
            setFontsLoaded(true);
        })()
    }, [])

    if (!fontsLoaded) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }


    return (
     <>
         <StatusBar style={'light'} />
         <Provider store={store}>
             <NativeBaseProvider theme={theme}>
                 <NavigationContainer>
                     <Stack.Navigator>
                         <Stack.Screen name={'Drawer'} component={DrawerNavigator} options={{ headerShown: false}} />
                         <Stack.Screen name={'Chat'} component={Chat} options={{
                             headerStyle: {
                                    backgroundColor: theme.colors.primary[700]
                             },
                         }} />
                         <Stack.Screen name={'CreateChat'} component={CreateChat} options={{
                             headerStyle: {
                                 backgroundColor: theme.colors.primary[700]
                             },
                             headerTintColor: 'white'
                         }} />
                     </Stack.Navigator>
                 </NavigationContainer>
             </NativeBaseProvider>
         </Provider>
     </>
  );
}
