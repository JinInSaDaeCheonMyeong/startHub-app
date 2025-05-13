import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import WelcomeScreen from "../screens/WelcomeScreen";

const Stack = createStackNavigator<RootStackParamList>();

export type RootStackParamList = {
    Welcome: undefined;
};

export default function RootStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={"Welcome"}>
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
};
