import {createStackNavigator} from "@react-navigation/stack";
import AuthStack from "./AuthStack";
import {SafeAreaProvider} from "react-native-safe-area-context";
import { enableScreens } from 'react-native-screens';
enableScreens();

const Stack = createStackNavigator<RootStackParamList>();

export type RootStackParamList = {
    Auth: undefined;
};

export default function RootStack() {
    return (
        <SafeAreaProvider>
            <Stack.Navigator initialRouteName={"Auth"} screenOptions={{headerShown: false}}>
                <Stack.Screen name="Auth" component={AuthStack} />
            </Stack.Navigator>
        </SafeAreaProvider>
    )
};
