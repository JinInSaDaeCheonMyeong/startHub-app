import {createStackNavigator} from "@react-navigation/stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import SigninScreen from "../screens/SigninScreen";
import { Colors } from "../constants/color";
import SignupScreen from "../screens/SignupScreen";

const Stack = createStackNavigator<AuthStackParamList>()

export type AuthStackParamList = {
    Welcome: undefined;
    Signin : undefined;
    Signup : undefined;
};

export default function AuthStack() {
    return (
<<<<<<< HEAD
        <Stack.Navigator initialRouteName={"Welcome"}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
=======
        <Stack.Navigator 
        initialRouteName="Welcome" 
        screenOptions={{
            cardStyle : {
                backgroundColor : Colors.white1,
                paddingHorizontal : 16
            },
            headerShown: false
        }}
        >
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Signin" component={SigninScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
>>>>>>> develop
        </Stack.Navigator>
    )
};