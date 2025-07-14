import { createStackNavigator } from "@react-navigation/stack";
import SystemScreen from "../screens/system/SystemScreen";
import ProfileScreen from "../screens/system/ProfileScreen";
import { Colors } from "../constants/Color";
import { StyleSheet, Text, View } from "react-native";
import BackButton from "../component/BackButton";

const Stack = createStackNavigator<SystemStackParamList>();

export type SystemStackParamList = {
    System : undefined,
    Profile : undefined
};

export default function SystemStack(){
    return (
        <Stack.Navigator
            initialRouteName={"System"} 
            screenOptions={{
                cardStyle : {
                    backgroundColor : Colors.white1
                },
                headerShown: false,
            }}
        >
            <Stack.Screen name="System" component={SystemScreen}/>
            <Stack.Screen name="Profile" component={ProfileScreen}/>
        </Stack.Navigator>
    )
}