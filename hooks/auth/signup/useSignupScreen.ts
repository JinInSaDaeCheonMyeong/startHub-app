import { useCallback, useEffect, useState } from "react"
import { SignupScreenProps } from "../../../screens/SignupScreen"
import { useError } from "../../util/useError"
import { SignupFormData } from "../../../type/user/signup.type"
import { useSignupValid } from "./useSignupValid"
import { SendcodeRequest } from "../../../type/email/sendcode.type"
import { sendcode } from "../../../api/email/sendcode"
import { DefaultErrorMessage } from "../../../type/error/error.type"

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
        validSigninForm,
        isVaildEmail
    } = useSignupValid()
    const [disabled, setDisabled] = useState(false)
    const disabledBtn = useCallback(() => {setDisabled(true)}, [])
    const abledBtn = useCallback(() => {setDisabled(false)}, [])

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
        abledBtn()
    }

    const handleSignup = () => {
        disabledBtn()
        const vaildResult = validSigninForm(formData)
        if(!vaildResult.value) {
            abledBtn()
            showError(vaildResult.message)
            return 
        }
        abledBtn()
        navigation.navigate('SignupInput')
    }

    const requestSendcode = useCallback( async () => {
        disabledBtn()
        const {email} = formData
        const emailValid = isVaildEmail(email.trim())
        if(!emailValid.value) {
            abledBtn()
            showError(emailValid.message)
        }
        const sendcodeData : SendcodeRequest = {
            email : email
        }
        try {
            await sendcode(sendcodeData)
            console.log("send-code : 성공")
        } catch (error) {
            console.log("send-code : 실패")
            handleAxiosError(error, {
                ...DefaultErrorMessage
            })
            abledBtn()
        }
        abledBtn()
    }, [])

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
            handleSignup,
            requestSendcode
        },
        ui : {
            errorText,
            errorVisible,
            disabled
        }
    }
}