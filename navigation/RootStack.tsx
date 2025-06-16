import {createStackNavigator} from "@react-navigation/stack";
import AuthStack from "./AuthStack";
import { Colors } from "../constants/Color";

const Stack = createStackNavigator<RootStackParamList>();

export type RootStackParamList = {
    Auth: undefined;
};

export default function RootStack() {
    return (
        <Stack.Navigator 
            initialRouteName={"Auth"} 
            screenOptions={{
                cardStyle : {
                    backgroundColor : Colors.white1
                },
                headerShown: false
            }}
        >
            <Stack.Screen name="Auth" component={AuthStack} />
        </Stack.Navigator>
    )
};
