import { useCallback, useMemo, useState } from "react"
import { useError } from "../../../util/useError"
import { useSignupInputValid } from "./useSignupInputValid"
import { SignupInputScreenProps } from "../../../../screens/SignupInputScreen"
import { InterestInfo, LocationInfo, SignupInputFormData, UserInfo } from "../../../../type/user/signupInput.type"
import { useDisabled } from "../../../util/useDisabled"

export const useSignupInputScreen = ({navigation} : SignupInputScreenProps, MAXPROGRESS : number) => {
    const [formData, setFormData] = useState<SignupInputFormData>({
        name : '',
        year : '',
        month : '',
        day : '',
        location : '',
        interestList : []
    })

    const [currentProgress, setCurrentProgress] = useState(1)
    const {
        value : {
            errorVisible,
            errorText
        },
        handler : {
            showError,
            hideError
        }
    } = useError()
    const {
        validSignupInputForm
    } = useSignupInputValid()
    const {
        disabled,
        disabledBtn,
        enabledBtn
    } = useDisabled()

    const updateFormData = useCallback(<K extends keyof SignupInputFormData>(key : K, value : SignupInputFormData[K]) => {
        setFormData(prev => ({...prev, [key] : value}))
        if(errorVisible){
            hideError()
        }
    }, [errorVisible])

    const setName = useCallback((value : string) => updateFormData("name", value), [updateFormData])
    const setYear = useCallback((value : string) => updateFormData("year", value), [updateFormData])
    const setMonth = useCallback((value : string) => updateFormData("month", value), [updateFormData])
    const setDay = useCallback((value : string) => updateFormData("day", value), [updateFormData])
    const setLocation = useCallback((value : string) => updateFormData("location", value), [updateFormData])
    const setInterestList = useCallback((value : string[]) => updateFormData("interestList", value), [updateFormData])

    const transformDate = (year : string, month : string, day : string) : Date | null=> {
        if(!year || !month || !day) return null

        const dateString = `${year}-${month.padStart(2, "0")}-${day.padStart(2,"0")}`
        const date = new Date(dateString)

        if(isNaN(date.getTime())) return null
        return date
    }

    const goBack = () => {
        hideError()
        if(currentProgress <= 1) {
            navigation.goBack()
        } else {
            setCurrentProgress(prev => prev - 1)
        }
    }

    const getValidData = () : UserInfo | LocationInfo | InterestInfo | undefined => {
        const {name, year, month, day, location, interestList} = formData
        switch(currentProgress) {
            case 1:
                return {
                    name : name.trim(),
                    year : year.trim(),
                    month : month.trim(),
                    day : day.trim()
                }
            case 2:
                return {
                    location : location.trim()
                }
            case 3:
                return {
                    interestList : interestList
                }
            default:
                return 
        }
    }

    const goNext = () => {
        disabledBtn()
        const validData = getValidData()
        if(!validData) {
            enabledBtn()
            return
        }
        const validResult = validSignupInputForm(currentProgress, validData)
        if(!validResult.isValid){
            showError(validResult.message)
            enabledBtn()
            return
        }
        hideError()
        enabledBtn()
        if(currentProgress >= MAXPROGRESS) {
            // 프로필 세팅 나중에 구현 할 예정
            navigation.popTo("Signin")
        } else {
            setCurrentProgress(prev => prev + 1)
        }
    }

    return {
        form : {
            ...formData,
            setName,
            setYear,
            setMonth,
            setDay,
            setLocation,
            setInterestList,
        },
        ui : {
            currentProgress,
            errorVisible,
            errorText,
            disabled
        },
        actions : {
            goBack,
            goNext
        },
    }
}