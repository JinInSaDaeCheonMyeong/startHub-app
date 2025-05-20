import { SafeAreaView, StatusBar, Text, View } from "react-native";
import { Colors } from "../constants/color";
import BackButton from "../component/BackButton";
import { StackScreenProps } from "@react-navigation/stack";
import { AuthStackParamList } from "../navigation/AuthStack";

type SignupInfoScreenProps = StackScreenProps<AuthStackParamList, 'SignupInfo'>

export default function SignupInfoScreen({navigation, route} : SignupInfoScreenProps) {
    return(
    <SafeAreaView>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.white1}/>
        <Text>SignupInfoScreen</Text>
    </SafeAreaView>
    )
}