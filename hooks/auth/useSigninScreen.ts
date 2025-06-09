import { StackScreenProps } from "@react-navigation/stack";
import { AuthStackParamList } from "../../navigation/AuthStack";
import { useCallback, useState } from "react";
import { useError } from "../useError";

type SigninScreenProps = StackScreenProps<AuthStackParamList, 'Signin'>;

interface FormData{
    email : string,
    password : string
}

const INITIAL_FORM_DATA = {
    email : '',
    password : ''
}

export const useSigninScreen = ({navigation} : SigninScreenProps) => {
    const [formData, setFormData] = useState(INITIAL_FORM_DATA)
    const {
        value : errorValue,
        handler : errorHandler
    } = useError()

    const updateFormData = useCallback(<K extends keyof FormData>(key : K, value : FormData[K]) => {
        setFormData(prev => ({...prev, [key] : value}))
        if(errorValue.errorVisible){
            errorHandler.hideError()
        }
    }, [])

    const setEmail = useCallback((value : string) => updateFormData("email", value), [updateFormData])
    const setPassword = useCallback((value : string) => updateFormData("password", value), [updateFormData])

    const requestLogin = useCallback(() => {
        console.log("로그인 요청")
    }, [])

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
            requestLogin,
            goSignupScreen,
            goBack
        },
        ui : {
            errorVisible : errorValue.errorVisible,
            errorText : errorValue.errorText
        }
    }
}