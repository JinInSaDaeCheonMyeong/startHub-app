import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../screens/Home/HomeScreen";
import {BottomBar} from "../component/nav/BottomBar";
import NoticeScreen from "../screens/Home/NoticeScreen";
import MatchScreen from "../screens/Home/MatchScreen";
import BMCScreen from "../screens/Home/BMCScreen";
import ChatScreen from "../screens/Home/ChatScreen";

const Tab = createBottomTabNavigator();

export function HomeStack() {

    return (
        <Tab.Navigator tabBar={(props) => <BottomBar {...props} />}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Notice" component={NoticeScreen}/>
            <Tab.Screen name="Match" component={MatchScreen}/>
            <Tab.Screen name="Chat" component={ChatScreen}/>
            <Tab.Screen name="BMC" component={BMCScreen}/>
        </Tab.Navigator>
    )
}