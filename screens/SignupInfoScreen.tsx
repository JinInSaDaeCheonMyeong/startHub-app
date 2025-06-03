import { SafeAreaView, StatusBar, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { Colors } from "../constants/Color";
import BackButton from "../component/BackButton";
import { StackScreenProps } from "@react-navigation/stack";
import { AuthStackParamList } from "../navigation/AuthStack";
import * as Progress from 'react-native-progress';
import { useState } from "react";
import InfoScreen from "./signup/InfoScreen";
import CategoryScreen from "./signup/CategoryScreen";
import CommonButton from "../component/CommonButton";

type SignupInfoScreenProps = StackScreenProps<AuthStackParamList, 'SignupInfo'>

const InputInfoScreen = [
    InfoScreen,
    CategoryScreen
]

export default function SignupInfoScreen({navigation, route} : SignupInfoScreenProps) {
    const {width} = useWindowDimensions();
    const [currentProgress, setCurrentProgress] = useState(1)
    const [errorVisible, setErrorVisible] = useState(true)
    const [errorText, setErrorText] = useState("error text")
    const CurrentScreen = InputInfoScreen[currentProgress-1]
    const maxProgress = 4;

    const goBack = () => {
        if(currentProgress < 2) {
            navigation.goBack()
        } else {
            setCurrentProgress(currentProgress - 1)
        }
    }

    const goNext = () => {
        if(currentProgress >= maxProgress) {
            navigation.popTo("Start")
        } else {
            setCurrentProgress(currentProgress + 1)
        }
    }

    return(
    <SafeAreaView style={styles.mainContainer}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.white1}/>
        <BackButton 
            width={20} 
            height={20} 
            color={Colors.black2} 
            onClick={()=>{
                goBack()
            }}
        /> 
        <View style={styles.progressBarContainer}>
            <Text>{`${currentProgress} of ${maxProgress}`}</Text>
            <Progress.Bar 
                width={width - 32} 
                progress={currentProgress / maxProgress}
                color={Colors.primary} 
                borderColor={Colors.white2}
                unfilledColor={Colors.white2}
                borderWidth={0}
            />
        </View>
        <CurrentScreen 
            onClick={() => {goNext()}}
        />
        <View style={styles.buttonContainer}>
            {errorVisible && <Text style={styles.errorText}>{errorText}</Text>}
            <CommonButton title={currentProgress == maxProgress ? "다음으로" : "완료"} onPress={() => {goNext()}}/>
        </View>
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
        marginBottom : 36,
        gap : 8,
        alignItems : "flex-end"
    },
    buttonContainer : {
        paddingTop : 8,
        gap : 8
    },
    errorText : {
        textAlign : "center",
        color : Colors.error,
        fontSize : 12,
        fontWeight : "semibold"
    },
})