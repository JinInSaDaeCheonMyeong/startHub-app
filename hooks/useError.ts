import { useState } from "react"

export const useError = () => {
    const [errorVisible, setErrorVisible] = useState(false)
    const [errorText, setErrorText] = useState("")

    const showError = (value : string) => {
        setErrorText(value)
        setErrorVisible(true)
    }
    const hideError = () => {
        setErrorVisible(false)
    }
    const toastErrorMessage = () => {
        console.log(errorText)
    }

    return {
        value : {
            errorVisible,
            errorText
        },
        handler : {
            showError,
            hideError,
            toastErrorMessage
        },
    }
}