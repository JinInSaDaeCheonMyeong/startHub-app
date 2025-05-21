import { SafeAreaView, StatusBar, Text, useWindowDimensions, View } from "react-native";
import { Colors } from "../constants/color";
import BackButton from "../component/BackButton";
import { StackScreenProps } from "@react-navigation/stack";
import { AuthStackParamList } from "../navigation/AuthStack";
import * as Progress from 'react-native-progress';

type SignupInfoScreenProps = StackScreenProps<AuthStackParamList, 'SignupInfo'>

export default function SignupInfoScreen({navigation, route} : SignupInfoScreenProps) {
    const {width} = useWindowDimensions();
    return(
    <SafeAreaView>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.white1}/>
        <BackButton width={18} height={18} color={Colors.black2} onClick={()=>{}} />
        <Progress.Bar 
            width={width - 32} 
            progress={0.3} 
            color={Colors.primary} 
            borderColor={Colors.white2}
            unfilledColor={Colors.white2}
            borderWidth={0}
        />
    </SafeAreaView>
    )
}