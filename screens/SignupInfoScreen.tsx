import { SafeAreaView, StatusBar, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { Colors } from "../constants/color";
import BackButton from "../component/BackButton";
import { StackScreenProps } from "@react-navigation/stack";
import { AuthStackParamList } from "../navigation/AuthStack";
import * as Progress from 'react-native-progress';
import { useState } from "react";
import SignupStack from "../navigation/SignupStack";

type SignupInfoScreenProps = StackScreenProps<AuthStackParamList, 'SignupInfo'>

export default function SignupInfoScreen({navigation, route} : SignupInfoScreenProps) {
    const {width} = useWindowDimensions();
    const [currentProgress, setCurrentProgress] = useState(5)
    const maxProgress = 5;
    return(
    <SafeAreaView style={styles.mainContainer}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.white1}/>
        <View>
            <BackButton width={20} height={20} color={Colors.black2} onClick={()=>{setCurrentProgress(currentProgress - 1)}} /> 
        </View>
        <View style={styles.progressBarContainer}>
            <Text>{`${currentProgress} of ${maxProgress}`}</Text>
            <Progress.Bar 
                width={width - 32} 
                progress={currentProgress / 5} 
                color={Colors.primary} 
                borderColor={Colors.white2}
                unfilledColor={Colors.white2}
                borderWidth={0}
            />
        </View>
        <SignupStack/>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer : {
        flex : 1,
        margin : 16,
    },
    progressBarContainer : {
        width : "100%",
        gap : 8,
        alignItems : "flex-end"
    }
})