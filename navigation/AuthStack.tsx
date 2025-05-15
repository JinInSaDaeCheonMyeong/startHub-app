import {createStackNavigator} from "@react-navigation/stack";
import WelcomeScreen from "../screens/WelcomeScreen";

const Stack = createStackNavigator<AuthStackParamList>()

export type AuthStackParamList = {
    Welcome: undefined;
};

export default function AuthStack() {
    return (
        <Stack.Navigator initialRouteName={"Welcome"} screenOptions={{headerShown: false}}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
        </Stack.Navigator>
    )
};