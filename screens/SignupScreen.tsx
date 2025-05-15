import { StackScreenProps } from "@react-navigation/stack";
import { AuthStackParamList } from "../navigation/AuthStack";
import { Colors } from "../constants/color";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import BackButton from "../component/BackButton";
import AuthTextInput from "../component/auth/AuthTextInput";
import { useState } from "react";
import CommonButton from "../component/CommonButton";

type SigninScreenProps = StackScreenProps<AuthStackParamList, 'Signup'>;

export default function SignupScreen({navigation, route} : SigninScreenProps){

        const [email, setEmail] = useState("")
        const [password, setPassword] = useState("")
        const [visible, setVisible] = useState(false)
        const [errorState, setErrorState] = useState(false)

    return(
        <SafeAreaView style={styles.container}>
        <BackButton 
        width={18} 
        height={18} 
        color={Colors.black2} 
        onClick={() => {navigation.goBack()}}
        />
        <Text style={styles.titleText}>Start<Text style={styles.accentText}>Hub</Text> 계정 만들기</Text>
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
                <Text style={styles.errorText}>{visible ? errorState : ""}</Text>
                <CommonButton title="회원가입" onPress={() => {console.log(`${email}`)}}/>
            </View>
        </View>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
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