import { StackScreenProps } from "@react-navigation/stack";
import { AuthStackParamList } from "../navigation/AuthStack";
import { Colors } from "../constants/Color";
import {Platform, ScrollView, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import BackButton from "../component/BackButton";
import AuthTextInput from "../component/auth/AuthTextInput";
import { useEffect, useState } from "react";
import CommonButton from "../component/CommonButton";
import Checkbox from "expo-checkbox";
import SelectAgreement from "../component/auth/SelectAgreement";
import { useSignupScreen } from "../hooks/auth/signup/useSignupScreen";

export type SignupScreenProps = StackScreenProps<AuthStackParamList, 'Signup'>;

export default function SignupScreen(props : SignupScreenProps){
    const {
        form : {
            email,
            verifyCode,
            password,
            checkPassword,
            checked,
            allChecked,
            setEmail,
            setVerifyNumber,
            setPassword,
            setCheckPassword,
            setChecked,
            setAllChecked
        },
        actions : {
            goBack,
            handleSignup,
        },
        ui : {
            errorText,
            errorVisible,
            disabled
        }
    } = useSignupScreen(props)

    const selectItem = [
        {key : 1, value : checked.ONE, title : "[필수] 만 14세 이상입니다", setChecked : setChecked, checkedKey : 'ONE'},
        {key : 2, value : checked.SECOND, title : "[필수] 스타트허브 이용약관 동의", setChecked : setChecked, checkedKey : 'SECOND'},
        {key : 3, value : checked.THIRD, title : "[필수] 스타트허브 개인정보 수집 및 이용 동의", setChecked : setChecked, checkedKey : 'THIRD'}
    ]

    return(
    <SafeAreaView style={styles.container}>
        <ScrollView>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.white1}/>
        <BackButton 
        width={18} 
        height={18} 
        color={Colors.black2} 
        onClick={() => {goBack()}}
        />
        <Text style={styles.titleText}>Start<Text style={styles.accentText}>Hub</Text> 계정 만들기</Text>
        <View style={styles.interactionContainer}>
            <View style={styles.emailContainer}>
                <Text style={styles.containerText}>이메일</Text>
                <View style={styles.emailInputContainer}>
                    <View style={styles.emailInputWrapper}>
                        <AuthTextInput
                            value={email}
                            placeHolder="이메일"
                            placeHolderTextColor={Colors.gray2}
                            isPassword={false}
                            onChange={(text) => {
                                setEmail(text)
                            }}
                        />
                    </View>
                    <TouchableOpacity style={styles.verifyButton} onPress={()=>{}}>
                        <Text style={styles.verifyButtonText}>인증번호 전송</Text>
                    </TouchableOpacity>
                </View>
                <AuthTextInput
                    value={verifyCode}
                    placeHolder="인증번호"
                    placeHolderTextColor={Colors.gray2}
                    isPassword={false}
                    onChange={(text) => {
                        setVerifyNumber(text)
                    }}
                />
            </View>
            <View style={styles.passwordContainer}>
            <Text style={styles.containerText}>비밀번호</Text>
                <AuthTextInput 
                    value={password}
                    placeHolder="비밀번호" 
                    placeHolderTextColor={Colors.gray2}
                    isPassword={true}
                    onChange={(text) => {
                        setPassword(text)
                    }}
                />
                <AuthTextInput 
                    value={checkPassword}
                    placeHolder="비밀번호 확인" 
                    placeHolderTextColor={Colors.gray2}
                    isPassword={true}
                    onChange={(text) => {
                        setCheckPassword(text)
                    }}
                />
            </View>
            <View style={styles.selectContainer}>
                <View style={styles.allSelectBox}>
                    <Checkbox
                        value={allChecked}
                        onChange={() => {console.log(allChecked)}}
                        onValueChange={(value) => {
                            setAllChecked(value)
                        }}
                        style={allChecked ? styles.selectCheckBox : styles.unSelectCheckBox}
                    />
                    <Text style={styles.allSelectText}>전체 선택</Text>
                </View>
                <View style={styles.line}/>
                {selectItem.map(item => (
                    <SelectAgreement
                        key={item.key}
                        value={item.value}
                        title={item.title}
                        onSelect={(value) => {setChecked(item.checkedKey, value)}}
                        onClick={() => {}} // 노션 링크 넣을 예정
                    />
                ))}
            </View>
            <View style={styles.buttonContainer}>
                <Text style={styles.errorText}>{errorVisible ? errorText : ""}</Text>
                <CommonButton 
                    title="회원가입" 
                    onPress={() => {handleSignup()}}
                    disabled={disabled}
                />
            </View>
        </View>
        </ScrollView>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    statusbar : {
        backgroundColor : Colors.white1
    },
    container : {
        flex : 1,
        marginHorizontal :16,
        paddingVertical : 16,
        gap : 68,
    },
    titleText : {
        width : "100%",
        fontSize : 24,
        fontWeight : "bold",
        textAlign : "center",
        paddingVertical : 68
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
    emailContainer : {
        width : "100%",
        gap : 16
    },
    emailInputContainer : {
        flexDirection : "row",
        width : "100%",
        justifyContent : "space-between",
        alignItems : "center",
        gap : 12
    },
    emailInputWrapper : {
        flex : 1
    },
    passwordContainer : {
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
    containerText : {
        fontSize : 16,
        fontWeight : "semibold",
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
    },
    verifyButton : {
        backgroundColor : Colors.white1,
        borderColor : Colors.primary,
        borderStyle : "solid",
        borderWidth : 1,
        padding : 12,
        ...Platform.select({
            ios : {
                padding : 13,
            },
            android : {
                padding : 17
            }
        }),
        borderRadius : 8
    },
    verifyButtonText : {
        fontSize : 14,
        color : Colors.primary
    },
    selectCheckBox : {
        width : 20,
        height : 20,
        borderColor : Colors.primary,
        backgroundColor : Colors.primary,
        borderRadius : 6,
        borderWidth : 1
    },
    unSelectCheckBox : {
        width : 20,
        height : 20,
        borderColor : Colors.gray3,
        borderRadius : 6,
        borderWidth : 1
    },
    selectContainer : {
        width : "100%",
        gap : 12
    },
    allSelectBox : {
        flexDirection : "row",
        gap : 8,
        alignItems : "center"
    },
    allSelectText : {
        fontSize : 14,
        fontWeight : "semibold",
        color : Colors.black1
    },
    line : {
        width : "100%",
        height : 0,
        borderColor : Colors.gray3,
        borderStyle : "solid",
        borderWidth : 0.5
    }
})