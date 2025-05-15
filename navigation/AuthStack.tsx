import {createStackNavigator} from "@react-navigation/stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import SigninScreen from "../screens/SigninScreen";

const Stack = createStackNavigator<AuthStackParamList>()

export type AuthStackParamList = {
    Welcome: undefined;
    Signin : undefined;
};

export default function AuthStack() {
    return (
        <Stack.Navigator initialRouteName={"Welcome"} screenOptions={{headerShown: false}}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Signin" component={SigninScreen} />
        </Stack.Navigator>
    )
};