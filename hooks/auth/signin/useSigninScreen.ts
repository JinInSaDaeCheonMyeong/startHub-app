import { useCallback, useEffect, useState } from "react";
import { useError } from "../../util/useError";
import { SigninFormData, SigninRequest } from "../../../type/user/signin.type";
import { saveAccToken, saveRefToken } from "../../../util/token";
import { useSigninValid } from "./useSigninValid";
import { useDisabled } from "../../util/useDisabled";
import { signin } from "../../../api/user";
import { SigninScreenProps } from "../../../screens/SigninScreen";

export const useSigninScreen = ({navigation} : SigninScreenProps) => {
    const [formData, setFormData] = useState<SigninFormData>({
        email : '',
        password : ''
    })
    const {
        value : {
            errorText,
            errorVisible
        },
        handler : {
            showError,
            hideError,
            handleAxiosError
        }
    } = useError()
    const {
        validSigninForm
    } = useSigninValid()
    const {
        disabled,
        disabledBtn,
        enabledBtn
    } = useDisabled()

    useEffect(() => {
    const controller = new AbortController()
    return () => controller.abort()
    }, [])

    const updateFormData = useCallback(<K extends keyof SigninFormData>(key : K, value : SigninFormData[K]) => {
        setFormData(prev => ({...prev, [key] : value}))
        if(errorVisible){
            hideError()
        }
    }, [errorVisible])

    const setEmail = useCallback((value : string) => updateFormData("email", value), [updateFormData])
    const setPassword = useCallback((value : string) => updateFormData("password", value), [updateFormData])

    const handleSignin = async () => {
        disabledBtn()
        const email = formData.email.trim()
        const password = formData.password.trim()
        const validResult = validSigninForm({...formData, email : email, password : password})
        if(!validResult.isValid){
            showError(validResult.message)
            enabledBtn()
            return
        }
        const loginRequest : SigninRequest = {
            email,
            password
        }
        try {
            const { data } = await signin(loginRequest)
            await saveAccToken(data.access)
            await saveRefToken(data.refresh)
            successLogin()
        } catch (error) {
            handleAxiosError(error, (value) => {showError(value)})
        } finally {
            enabledBtn()
        }
    }

    const goSignupScreen = () => {
        disabledBtn()
        navigation.navigate("Signup")
        enabledBtn()
    }

    const successLogin = () => {
        disabledBtn()
        navigation.navigate("HomeStack")
        enabledBtn()
    }

    const goBack = () => {
        disabledBtn()
        navigation.goBack()
        enabledBtn()
    }

    return {
        form : {
            ...formData,
            setEmail,
            setPassword
        },
        actions : {
            handleSignin,
            goSignupScreen,
            goBack
        },
        ui : {
            disabled,
            errorVisible,
            errorText
        }
    }
}