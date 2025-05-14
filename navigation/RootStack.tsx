import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import AuthStack from "./AuthStack";

const Stack = createStackNavigator<RootStackParamList>();

export type RootStackParamList = {
    Auth: undefined;
};

export default function RootStack() {
    return (
        <Stack.Navigator initialRouteName={"Auth"}>
            <Stack.Screen name="Auth" component={AuthStack} />
        </Stack.Navigator>
    )
};
