import { useCallback, useState } from "react"
import { SignupScreenProps } from "../../../screens/SignupScreen"
import { useError } from "../../util/useError"
import { SignupFormData, SignupRequest } from "../../../type/user/signup.type"
import { useSignupValid } from "./useSignupValid"
import { SendcodeRequest } from "../../../type/email/sendcode.type"
import { sendcode } from "../../../api/email/sendcode"
import { DefaultErrorMessage } from "../../../type/error/error.type"
import { VerifyRequest } from "../../../type/email/verify.type"
import { verify } from "../../../api/email/verify"
import { signup } from "../../../api/user/signup"
import { useDisabled } from "../../util/useDisabled"

export const useSignupScreen = ({navigation} : SignupScreenProps ) => {
    const [formData, setFormData] = useState<SignupFormData>({
        email : '',
        verifyCode : '',
        password : '',
        checkPassword : '',
        checked : {
            ONE : false, //필수
            SECOND : false, //필수
            THIRD : false //필수
        },
        allChecked : false
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
        },
    } = useError()
    
    const {
        validSignupForm,
        isValidEmail
    } = useSignupValid()
    const {
        disabled,
        disabledBtn,
        enabledBtn
    } = useDisabled()

    const updateFormData = useCallback(<K extends keyof SignupFormData>(key : K, value : SignupFormData[K]) => {
        setFormData(prev => ({...prev, [key] : value}))
        if(errorVisible){
            hideError()
        }
    }, [errorVisible])

    const setEmail = useCallback((value : string) => updateFormData('email', value), [updateFormData])
    const setVerifyNumber = useCallback((value : string) => updateFormData('verifyCode', value), [updateFormData])
    const setPassword = useCallback((value : string) => updateFormData('password', value), [updateFormData])
    const setCheckPassword = useCallback((value : string) => updateFormData('checkPassword', value), [updateFormData])
    const setChecked = useCallback((key : string, value : boolean) => {
        setFormData(prev => {
                const newChecked = {...prev.checked, [key] : value}
                const allCheckedValue = newChecked.ONE && newChecked.SECOND && newChecked.THIRD
            return {
                ...prev,
                checked : newChecked,
                allChecked : allCheckedValue
            }
        })
    }, [updateFormData])

    const setAllChecked = useCallback((value : boolean) => {
        updateFormData('allChecked', value)
        updateFormData('checked', {ONE : value, SECOND : value, THIRD : value})
    }, [updateFormData])

    const goBack = () => {
        disabledBtn()
        navigation.goBack()
        enabledBtn()
    }

    const requestSignup = useCallback( async () => {
        disabledBtn()

        const email = formData.email.trim()
        const verifyCode = formData.verifyCode.trim()
        const password = formData.password.trim()
        const checkPassword = formData.checkPassword.trim()
        const {checked : {ONE, SECOND, THIRD}} = formData

        const validResult = validSignupForm(
            email,
            verifyCode,
            password,
            checkPassword,
            ONE,
            SECOND,
            THIRD
        )
        if(!validResult.isValid) {
            enabledBtn()
            showError(validResult.message)
            return 
        }
        const verifyData : VerifyRequest = {
            email : email,
            code : verifyCode
        }
        const signupData : SignupRequest = {
            email : email,
            password : password
        }
        try {
            await verify(verifyData) 
            await signup(signupData)
        } catch (error) {
            handleAxiosError(error, {
                ...DefaultErrorMessage,
                401 : "잘못된 인증번호 입니다",
                409 : "이미 가입된 이메일입니다"
            }, (value) => {
                showError(value)
            })
            enabledBtn()
            return
        }
        navigation.navigate('SignupInput')
    }, [formData])

    const requestSendcode = useCallback( async () => {
        disabledBtn()
        const email = formData.email.trim()
        const validResult = isValidEmail(email)
        if(!validResult.isValid) {
            enabledBtn()
            showError(validResult.message)
            return
        }
        const sendcodeData : SendcodeRequest = {
            email : email
        }
        try {
            await sendcode(sendcodeData)
        } catch (error) {
            handleAxiosError(error, {
                ...DefaultErrorMessage
            }, (value) => {
                showError(value)
            })
            enabledBtn()
            return
        }
        enabledBtn()
    }, [formData, isValidEmail, showError])

    return {
        form : {
            ...formData,
            setEmail,
            setVerifyNumber,
            setPassword,
            setCheckPassword,
            setChecked,
            setAllChecked
        },
        actions : {
            goBack,
            requestSignup,
            requestSendcode
        },
        ui : {
            errorText,
            errorVisible,
            disabled
        }
    }
}