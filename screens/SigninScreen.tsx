import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { AuthStackParamList } from "../navigation/AuthStack";
import { StackScreenProps } from "@react-navigation/stack";
import { Colors } from "../constants/Color";
import AuthTextInput from "../component/auth/AuthTextInput";
import BackButton from "../component/BackButton";
import CommonButton from "../component/CommonButton";
import LinkActionText from "../component/auth/LinkActionText";
import { useSigninScreen } from "../hooks/auth/useSigninScreen";

type SigninScreenProps = StackScreenProps<AuthStackParamList, 'Signin'>;

export default function SigninScreen(props : SigninScreenProps) {

    const {
        form,
        actions,
        ui
    } = useSigninScreen(props)

    return (
        <SafeAreaView style={styles.container}>
            <BackButton 
            width={18} 
            height={18} 
            color={Colors.black2} 
            onClick={() => {actions.goBack()}}
            />
            <Text style={styles.titleText}>Start<Text style={styles.accentText}>Hub</Text> 계정 로그인</Text>
            <View style={styles.interactionContainer}>
                <View style={styles.textInputContainer}>
                    <AuthTextInput 
                        value={form.email}
                        placeHolder="이메일"
                        placeHolderTextColor={Colors.gray2}
                        isPassword={false}
                        onChange={(text) => {
                            form.setEmail(text)
                        }}
                    />
                    <AuthTextInput 
                        value={form.password}
                        placeHolder="비밀번호" 
                        placeHolderTextColor={Colors.gray2}
                        isPassword={true}
                        onChange={(text) => {
                            form.setPassword(text)
                        }}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    {ui.errorVisible && <Text style={styles.errorText}>{ui.errorText}</Text>}
                    <CommonButton title="로그인" disabled={ui.disabled} onPress={() => {
                        actions.handleLogin()
                    }}/>
                </View>
                <View style={styles.signupContainer}>
                    <LinkActionText title="이메일 찾기" onPress={() => {}} disabled={ui.disabled}/>
                    <Text style={styles.contourText}>⏐</Text>
                    <LinkActionText title="비밀번호 찾기" onPress={() => {}} disabled={ui.disabled}/>
                    <Text style={styles.contourText}>⏐</Text>
                    <LinkActionText title="회원가입" onPress={() => {actions.goSignupScreen()}} disabled={ui.disabled}/>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        margin : 16,
        gap : 68
    },
    titleText : {
        width : "100%",
        fontSize : 24,
        fontWeight : "bold",
        textAlign : "center"
    },
    accentText : {
        width : "100%",
        fontSize : 24,
        fontWeight : "bold",
        textAlign : "center",
        color : Colors.primary
    },
    interactionContainer : {
        alignItems : "center",
        gap : 24
    },
    textInputContainer : {
        gap : 16
    },
    buttonContainer : {
        width : "100%",
        gap : 8
    },
    signupContainer : {
        flexDirection : "row",
        justifyContent : "center",
        alignItems : "center",
        gap : 12
    },
    errorText : {
        textAlign : "center",
        color : Colors.error,
        fontSize : 12,
        fontWeight : "semibold"
    },
    signinButton : {
        backgroundColor : Colors.primary,
        borderRadius : 8,

    },
    contourText : {
        color : Colors.gray2,
        fontSize : 16,
        fontWeight : "semibold"
    }
})