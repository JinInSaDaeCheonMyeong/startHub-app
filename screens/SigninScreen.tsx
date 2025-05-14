import React, { useState } from "react";
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { AuthStackParamList } from "../navigation/AuthStack";
import { StackScreenProps } from "@react-navigation/stack";
import { Colors } from "../constants/color";
import AuthTextInput from "../component/auth/AuthTextInput";
import BackButton from "../component/BackButton";

type SigninScreenProps = StackScreenProps<AuthStackParamList, "Signin">

export default function SigninScreen({navigation} : SigninScreenProps) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <View style={styles.container}>
            <BackButton 
            width={18} 
            height={18} 
            color={Colors.black2} 
            onClick={() => {navigation.navigate("Welcome")}}
            />
            <Text style={styles.titleText}>StartHub 계정 로그인</Text>
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
                    <Button title="로그인" onPress={() => {console.log(`${email}`)}}/>
                </View>
                <View style={styles.signupContainer}>
                    <Text style={styles.linkActionText}>이메일 찾기</Text>
                    <Text style={styles.linkActionText}>⏐</Text>
                    <Text style={styles.linkActionText}>비밀번호 찾기</Text>
                    <Text style={styles.linkActionText}>⏐</Text>
                    <Text style={styles.linkActionText}>회원가입</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        padding : 16,
        backgroundColor : Colors.white1,
        gap : 68
    },
    titleText : {
        width : "100%",
        fontSize : 24,
        fontWeight : "bold",
        textAlign : "center"
    },
    interactionContainer : {
        alignItems : "center",
        gap : 24
    },
    textInputContainer : {
        gap : 16
    },
    buttonContainer : {
        gap : 8
    },
    signupContainer : {
        flexDirection : "row",
        gap : 12
    },
    errorText : {
        color : Colors.error,
        fontSize : 12,
        fontWeight : "semibold"
    },
    signinButton : {
        backgroundColor : Colors.primary,
        borderRadius : 8,

    },
    linkActionText : {
        color : Colors.gray2,
        fontSize : 14,
        fontWeight : "semibold"
    }
})