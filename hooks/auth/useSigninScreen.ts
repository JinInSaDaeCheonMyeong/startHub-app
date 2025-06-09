import { StackScreenProps } from "@react-navigation/stack";
import { AuthStackParamList } from "../../navigation/AuthStack";
import { useCallback, useState } from "react";
import { useError } from "../useError";
import { LoginRequest } from "../../type/login/login.type";
import { login } from "../../api/auth/login";
import { AxiosError } from "axios";

type SigninScreenProps = StackScreenProps<AuthStackParamList, 'Signin'>;

interface LoginData{
    email : string,
    password : string
}

export const useSigninScreen = ({navigation} : SigninScreenProps) => {
    const [formData, setFormData] = useState({
        email : 'ojm67800@gmail.com',
        password : 'toadl2015^^'
    })
    const {
        value : errorValue,
        handler : errorHandler
    } = useError()

    const updateFormData = useCallback(<K extends keyof LoginData>(key : K, value : LoginData[K]) => {
        setFormData(prev => ({...prev, [key] : value}))
        if(errorValue.errorVisible){
            errorHandler.hideError()
        }
    }, [formData, errorValue.errorVisible])

    const setEmail = useCallback((value : string) => updateFormData("email", value), [updateFormData])
    const setPassword = useCallback((value : string) => updateFormData("password", value), [updateFormData])

    const sumitLogin = useCallback( async () => {
        if(!formData.email.trim()){
            errorHandler.showError("이메일을 입력해주세요")
            return
        }
        if(!formData.password.trim()){
            errorHandler.showError("비밀번호를 입력해주세요")
            return
        }
        const loginRequest : LoginRequest = {
            email : formData.email.trim(),
            password : formData.password.trim()
        }
        try {
            const data = await login(loginRequest)
            console.log(data)
        } catch (error) {
            const errorCode = error as AxiosError
            console.log(`${errorCode.code}`)
            errorHandler.showError(`${errorCode.code}`)
        }
    }, [formData.email, formData.password])

    const goSignupScreen = useCallback(() => {
        navigation.navigate("Signup")
    }, [])

    const goBack = useCallback(() => {
        navigation.goBack()
    }, [])

    return {
        form : {
            ...formData,
            setEmail,
            setPassword
        },
        nav : {
            sumitLogin,
            goSignupScreen,
            goBack
        },
        ui : {
            errorVisible : errorValue.errorVisible,
            errorText : errorValue.errorText
        }
    }
}