import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { AuthStackParamList } from "../navigation/AuthStack";
import { StackScreenProps } from "@react-navigation/stack";
import { Colors } from "../constants/Color";
import AuthTextInput from "../component/auth/AuthTextInput";
import BackButton from "../component/BackButton";
import CommonButton from "../component/CommonButton";
import LinkActionText from "../component/auth/LinkActionText";

type SigninScreenProps = StackScreenProps<AuthStackParamList, 'Signin'>;

export default function SigninScreen(navigation : SigninScreenProps) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <SafeAreaView style={styles.container}>
            <BackButton 
            width={18} 
            height={18} 
            color={Colors.black2} 
            onClick={() => {navigation.navigation.goBack()}}
            />
            <Text style={styles.titleText}>Start<Text style={styles.accentText}>Hub</Text> 계정 로그인</Text>
            <View style={styles.interactionContainer}>
                <View style={styles.textInputContainer}>
                    <AuthTextInput 
                        value={email}
                        placeHolder="이메일"
                        placeHolderTextColor={Colors.gray2}
                        isPassword={false}
                        onChange={(text) => {
                            setEmail(text)
                        }}
                    />
                    <AuthTextInput 
                        value={password}
                        placeHolder="비밀번호" 
                        placeHolderTextColor={Colors.gray2}
                        isPassword={true}
                        onChange={(text) => {
                            setPassword(text)
                        }}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Text style={styles.errorText}>이메일 혹은 비밀번호가 일치하지 않습니다</Text>
                    <CommonButton title="로그인" onPress={() => {console.log(`${email}`)}}/>
                </View>
                <View style={styles.signupContainer}>
                    <LinkActionText title="이메일 찾기" onPress={() => {}}/>
                    <Text style={styles.contourText}>⏐</Text>
                    <LinkActionText title="비밀번호 찾기" onPress={() => {}}/>
                    <Text style={styles.contourText}>⏐</Text>
                    <LinkActionText title="회원가입" onPress={() => {}}/>
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