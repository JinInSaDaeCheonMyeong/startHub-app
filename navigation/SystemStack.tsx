import { createStackNavigator } from "@react-navigation/stack";
import SystemScreen from "../screens/system/SystemScreen";
import ProfileScreen from "../screens/system/ProfileScreen";
import { Colors } from "../constants/Color";
import { GetMeResponse } from "../type/user/user.type";
import EditProfileScreen from "../screens/system/EditProfileScreen";

const Stack = createStackNavigator<SystemStackParamList>();

export type SystemStackParamList = {
    System : undefined,
    Profile : GetMeResponse["data"],
    EditProfile : GetMeResponse["data"]
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
            <Stack.Screen name="EditProfile" component={EditProfileScreen}/>
        </Stack.Navigator>
    )
}