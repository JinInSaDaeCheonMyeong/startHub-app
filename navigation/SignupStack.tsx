import { createStackNavigator } from "@react-navigation/stack"
import { Text, View } from "react-native";
import InfoScreen from "../screens/signup/InfoScreen";
import { Colors } from "../constants/color";


const Stack = createStackNavigator<SignupStackParamList>();

export type SignupStackParamList = {
    Info : undefined
}

export default function SignupStack() {
    return(
        <Stack.Navigator
        screenOptions={{
            cardStyle : {
                backgroundColor : Colors.white1,
            },
            headerShown: false
        }}>
            <Stack.Screen name="Info" component={InfoScreen}/>
        </Stack.Navigator>
    )
}