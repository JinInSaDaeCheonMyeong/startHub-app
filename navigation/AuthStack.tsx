import {createStackNavigator} from "@react-navigation/stack";
import WelcomeScreen from "../screens/WelcomeScreen";

const Stack = createStackNavigator<AuthStackParamList>()

export type AuthStackParamList = {
    Welcome: undefined;
};

export default function AuthStack() {
    return (
        <Stack.Navigator initialRouteName={"Welcome"}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
};