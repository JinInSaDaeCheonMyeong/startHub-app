import { StackScreenProps } from "@react-navigation/stack";
import { useFocusEffect } from "@react-navigation/native";
import { AuthStackParamList } from "../../navigation/AuthStack";
import { useCallback, useState } from "react";
import { useError } from "../useError";
import { LoginRequest } from "../../type/login/login.type";
import { login } from "../../api/auth/login";
import { AxiosError } from "axios";
import { AuthStorageKey } from "../../constants/storage/AuthStorageKey";
import AsyncStorage from "@react-native-async-storage/async-storage";

type SigninScreenProps = StackScreenProps<AuthStackParamList, 'Signin'>;

export const useSigninScreen = ({navigation} : SigninScreenProps) => {
    const [formData, setFormData] = useState({
        email : '',
        password : ''
    })
    const {
        value : errorValue,
        handler : errorHandler
    } = useError()
    const [disabled, setDisabled] = useState(false)

    const disableBtn = useCallback(() => setDisabled(true), []);
    const ableBtn = useCallback(() => setDisabled(false), []);

    useFocusEffect(
        useCallback(() => {
            ableBtn()
        }, [])
    )

    const updateFormData = useCallback(<K extends keyof LoginRequest>(key : K, value : LoginRequest[K]) => {
        setFormData(prev => ({...prev, [key] : value}))
        if(errorValue.errorVisible){
            errorHandler.hideError()
        }
    }, [formData, errorValue.errorVisible])

    const setEmail = useCallback((value : string) => updateFormData("email", value), [updateFormData])
    const setPassword = useCallback((value : string) => updateFormData("password", value), [updateFormData])

    const varidateForm = (email : string, password : string) => {
        if(!email){
            errorHandler.showError("이메일을 입력해주세요")
            return false
        }
        if(!password){
            errorHandler.showError("비밀번호를 입력해주세요")
            return false
        }
        return true
    }

    const handleLogin = useCallback( async () => {
        if(disabled) return
        disableBtn()
        console.log("로그인 호출")
        const email = formData.email.trim()
        const password = formData.password.trim()
        if(!varidateForm(email, password)){
            ableBtn()
            return
        }
        const loginRequest : LoginRequest = {
            email,
            password
        }
        try {
            const { data } = await login(loginRequest)
            await AsyncStorage.setItem(AuthStorageKey.ACCESS_TOKEN, data.access)
            await AsyncStorage.setItem(AuthStorageKey.REFRESH_TOKEN, data.refresh)
            successLogin()
        } catch (error) {
            const errorCode = error as AxiosError
            console.log(`${errorCode.code}`)
            errorHandler.showError(`${errorCode.code}`)
        } finally {
            ableBtn()
        }
    }, [formData.email, formData.password, disabled, errorHandler])

    const goSignupScreen = () => {
        disableBtn()
        navigation.navigate("Signup")
    }

    const successLogin = () => {
        // Home 화면 이동
    }

    const goBack = () => {
        disableBtn()
        navigation.goBack()
    }

    return {
        form : {
            ...formData,
            setEmail,
            setPassword
        },
        actions : {
            handleLogin,
            goSignupScreen,
            goBack
        },
        ui : {
            disabled,
            errorVisible : errorValue.errorVisible,
            errorText : errorValue.errorText
        }
    }
}