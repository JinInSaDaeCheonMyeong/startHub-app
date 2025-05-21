import {createStackNavigator} from "@react-navigation/stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import SigninScreen from "../screens/SigninScreen";
import { Colors } from "../constants/color";
import StartScreen from "../screens/StartScreen";
import SignupScreen from "../screens/SignupScreen";
import SignupInfoScreen from "../screens/SignupInfoScreen";

const Stack = createStackNavigator<AuthStackParamList>()

export type AuthStackParamList = {
    Welcome: undefined;
    Signin : undefined;
    Signup : undefined;
    Start : undefined;
    SignupInfo : undefined;
};

export default function AuthStack() {
    return (
        <Stack.Navigator 
        initialRouteName={"Welcome"} 
        screenOptions={{
            cardStyle : {
                backgroundColor : Colors.white1,
            },
            headerShown: false
        }}
        >
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Signin" component={SigninScreen} />
            <Stack.Screen name="Start" component={StartScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="SignupInfo" component={SignupInfoScreen} />
        </Stack.Navigator>
    )
};