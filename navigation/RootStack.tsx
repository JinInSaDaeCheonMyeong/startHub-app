import {createStackNavigator} from "@react-navigation/stack";
import AuthStack from "./AuthStack";
import {HomeStack} from "./HomeStack";
import { Colors } from "../constants/Color";

const Stack = createStackNavigator<RootStackParamList>();

export type RootStackParamList = {
    AuthStack: undefined;
    HomeStack: undefined;
};

export default function RootStack() {
    return (
 <Stack.Screen name="HomeStack" component={HomeStack} />
        <Stack.Navigator 
            initialRouteName={"AuthStack"} 
            screenOptions={{
                cardStyle : {
                    backgroundColor : Colors.white1
                },
                headerShown: false
            }}
        >
            <Stack.Screen name="AuthStack" component={AuthStack} />
            <Stack.Screen name="HomeStack" component={HomeStack} />
        </Stack.Navigator>
    )
};
