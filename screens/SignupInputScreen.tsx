import { SafeAreaView, StatusBar, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { Colors } from "../constants/Color";
import BackButton from "../component/BackButton";
import { StackScreenProps } from "@react-navigation/stack";
import { AuthStackParamList } from "../navigation/AuthStack";
import * as Progress from 'react-native-progress';
import { useState } from "react";
import InfoScreen from "./signup/InfoScreen";
import InterestScreen from "./signup/InterestScreen";
import CommonButton from "../component/CommonButton";
import LocationScreen from "./signup/LocationScreen";
import { useSignupInputScreen } from "../hooks/auth/input/useSignupInputScreen";

export type SignupInputScreenProps = StackScreenProps<AuthStackParamList, 'SignupInput'>

const SCREENS = [
    InfoScreen,
    LocationScreen,
    InterestScreen
] as const

const MAXPROGRESS = SCREENS.length;

export default function SignupInputScreen(props : SignupInputScreenProps) {
    const {width} = useWindowDimensions();
    const {
        form,
        ui, 
        nav
    } = useSignupInputScreen(props, MAXPROGRESS)
    const CurrentScreen = SCREENS[ui.currentProgress-1]

    return(
    <SafeAreaView style={styles.mainContainer}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.white1}/>
        <View style={styles.backButton}>
            <BackButton 
                width={20} 
                height={20} 
                color={Colors.black2} 
                onClick={()=>{
                    nav.goBack()
                }}
            /> 
        </View>
        <View style={styles.progressBarContainer}>
            <Text>{`${ui.currentProgress} of ${MAXPROGRESS}`}</Text>
            <Progress.Bar 
                width={width - 32} 
                progress={ui.currentProgress / MAXPROGRESS}
                color={Colors.primary} 
                borderColor={Colors.white2}
                unfilledColor={Colors.white2}
                borderWidth={0}
                height={8}
            />
        </View>
        <CurrentScreen {...form} />
        <View style={styles.buttonContainer}>
            {ui.errorVisible && <Text style={styles.errorText}>{ui.errorText}</Text>}
            <CommonButton
                title={ui.currentProgress == MAXPROGRESS ? "완료" : "다음"}
                onPress={() => {nav.goNext()}}
                disabled={false}
            />
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
    backButton: {
        marginTop: 22,
    },
})