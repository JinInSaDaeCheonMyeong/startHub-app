import {createStackNavigator} from "@react-navigation/stack";
import AuthStack from "./AuthStack";
import {HomeStack} from "./HomeStack";

const Stack = createStackNavigator<RootStackParamList>();

export type RootStackParamList = {
    AuthStack: undefined;
    HomeStack: undefined;
};

export default function RootStack() {
    return (
        <Stack.Navigator initialRouteName={"AuthStack"} screenOptions={{headerShown: false}}>
            <Stack.Screen name="AuthStack" component={AuthStack} />
            <Stack.Screen name="HomeStack" component={HomeStack} />
        </Stack.Navigator>
    )
};
