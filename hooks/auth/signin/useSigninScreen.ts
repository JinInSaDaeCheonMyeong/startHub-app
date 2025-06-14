import { StackScreenProps } from "@react-navigation/stack";
import { AuthStackParamList } from "../../../navigation/AuthStack";
import { useCallback, useEffect, useState } from "react";
import { useError } from "../../util/useError";
import { signin } from "../../../api/user/signin";
import { DefaultErrorMessage } from "../../../type/error/error.type";
import { SigninFormData, SigninRequest } from "../../../type/user/signin.type";
import { saveAccToken, saveRefToken } from "../../../util/token";
import { useSigninValid } from "./useSigninValid";

type SigninScreenProps = StackScreenProps<AuthStackParamList, 'Signin'>;

export const useSigninScreen = ({navigation} : SigninScreenProps) => {
    const [formData, setFormData] = useState<SigninFormData>({
        email : 'ouran67800@gmail.com',
        password : 'Toadl2015!!'
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
    const [disabled, setDisabled] = useState(false)
    const {
        validSigninForm
    } = useSigninValid()

    const disableBtn = useCallback(() => setDisabled(true), []);
    const ableBtn = useCallback(() => setDisabled(false), []);

    useEffect(() => {
    const controller = new AbortController()
    return () => controller.abort()
    }, [])

    const updateFormData = useCallback(<K extends keyof SigninRequest>(key : K, value : SigninRequest[K]) => {
        setFormData(prev => ({...prev, [key] : value}))
        if(errorVisible){
            hideError()
        }
    }, [errorVisible])

    const setEmail = useCallback((value : string) => updateFormData("email", value), [updateFormData])
    const setPassword = useCallback((value : string) => updateFormData("password", value), [updateFormData])

    const handleSignin = useCallback( async () => {
        disableBtn()
        const email = formData.email.trim()
        const password = formData.password.trim()
        const validResult = validSigninForm({...formData, email : email, password : password})
        if(!validResult.value){
            showError(validResult.message)
            ableBtn()
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
            handleAxiosError(error, {
                ...DefaultErrorMessage,
                401 : "이메일 혹은 비밀번호가 일치하지 않습니다",
                409 : "이미 존재하는 이메일입니다"
            })
        } finally {
            ableBtn()
        }
    }, [formData.email, formData.password, disabled])

    const goSignupScreen = () => {
        disableBtn()
        navigation.navigate("Signup")
    }

    const successLogin = () => {
        console.log("success")
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