import { createStackNavigator } from "@react-navigation/stack"
import { Text, View } from "react-native";
import InfoScreen from "../screens/signup/InfoScreen";
import { Colors } from "../constants/color";
import ContactScreen from "../screens/signup/ContactScreen";
import AgeScreen from "../screens/signup/AgeScreen";
import CategoryScreen from "../screens/signup/CategoryScreen";


const Stack = createStackNavigator<SignupStackParamList>();

export type SignupStackParamList = {
    Info : undefined
    Contact : undefined
    Age : undefined,
    Category : undefined
}

export default function SignupStack() {
    return(
        <Stack.Navigator
        initialRouteName="Contact"
        screenOptions={{
            cardStyle : {
                backgroundColor : Colors.white1,
            },
            headerShown: false
        }}>
            <Stack.Screen name="Info" component={InfoScreen}/>
            <Stack.Screen name="Contact" component={ContactScreen}/>
            <Stack.Screen name="Age" component={AgeScreen}/>
            <Stack.Screen name="Category" component={CategoryScreen}/>
        </Stack.Navigator>
    )
}