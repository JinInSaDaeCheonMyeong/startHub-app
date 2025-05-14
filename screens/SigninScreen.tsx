import React, { useState } from "react";
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { AuthStackParamList } from "../navigation/AuthStack";
import { StackScreenProps } from "@react-navigation/stack";
import { Colors } from "../constants/color";
import AuthTextInput from "../component/auth/AuthTextInput";

type SigninScreenProps = StackScreenProps<AuthStackParamList, "Signin">

export default function SigninScreen({navigation} : SigninScreenProps) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <View >
            <Text>{"<"}</Text>
            <Text>StartHub 계정 로그인</Text>
            <AuthTextInput 
                value={email}
                placeHolder="이메일"
                placeHolderTextColor={Colors.gray2}
                onChange={(text) => {
                    setEmail(text)
                }}
            />
            <AuthTextInput 
                value={password}
                placeHolder="비밀번호" 
                placeHolderTextColor={Colors.gray2}
                onChange={(text) => {
                    setPassword(text)
                    console.log("변경됨")
                }}
            />
            <Text>이메일 혹은 비밀번호가 일치하지 않습니다</Text>
            <Button title="로그인" onPress={() => {console.log(`${email}`)}}/>
            <Text>이메일 찾기</Text>
            <Text>비밀번호 찾기</Text>
            <Text>회원가입</Text>
        </View>
    )
}