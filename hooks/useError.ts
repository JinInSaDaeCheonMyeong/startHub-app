import { isAxiosError } from "axios"
import { useState } from "react"
import { DefaultErrorMessage, ErrorType } from "../type/error/error.type"

export const useError = () => {
    const [errorVisible, setErrorVisible] = useState(false)
    const [errorText, setErrorText] = useState("")

    const showError = (value : string | undefined) => {
        if(!value) return 
        setErrorText(value)
        setErrorVisible(true)
    }

    const hideError = () => {
        setErrorVisible(false)
    }

    const toastErrorMessage = () => {
        console.log(errorText)
    }

    const handleAxiosError = (error : unknown, messages : ErrorType) => {
        const errorMessages : ErrorType = {...DefaultErrorMessage, ...messages}
        if(isAxiosError(error)){
            const response = error.response
            if(!response){
                showError("네트워크 오류가 발생하였습니다")
            } else {
                const status = response.status
                const statusMessage = errorMessages[status as keyof ErrorType]
                if(statusMessage && typeof statusMessage === 'string'){
                    showError(statusMessage)
                } else {
                    showError(errorMessages.default)
                }
            }
        } else {
            showError("예상치 못한 오류가 발생하였습니다")
        }
    }

    return {
        value : {
            errorVisible,
            errorText
        },
        handler : {
            showError,
            hideError,
            toastErrorMessage,
            handleAxiosError
        },
    }
}