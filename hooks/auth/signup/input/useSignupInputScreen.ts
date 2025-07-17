import { useCallback, useMemo, useState } from "react"
import { useError } from "../../../util/useError"
import { useSignupInputValid } from "./useSignupInputValid"
import { SignupInputScreenProps } from "../../../../screens/SignupInputScreen"
import { InterestInfo, LocationInfo, SignupInputFormData, UserInfo } from "../../../../type/user/signupInput.type"
import { useDisabled } from "../../../util/useDisabled"
import { setProfile } from "../../../../api/user"
import { isAxiosError } from "axios"
import { ErrorResponse } from "../../../../type/util/response.type"

export const useSignupInputScreen = ({navigation} : SignupInputScreenProps, MAXPROGRESS : number) => {
    const [formData, setFormData] = useState<SignupInputFormData>({
        name : '',
        year : '',
        month : '',
        day : '',
        introduction : '',
        gender : 'MALE',
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
    const setIntroduction = useCallback((value : string) => updateFormData("introduction", value), [updateFormData])
    const setGender = useCallback((value : string) => updateFormData("gender", value), [updateFormData])
    const setInterestList = useCallback((value : string[]) => updateFormData("interestList", value), [updateFormData])

    const goBack = () => {
        hideError()
        if(currentProgress <= 1) {
            navigation.goBack()
        } else {
            setCurrentProgress(prev => prev - 1)
        }
    }

    const getValidData = () : UserInfo | LocationInfo | InterestInfo | undefined => {
        const {name, year, month, day, introduction, gender, interestList} = formData
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
                    introduction : introduction.trim(),
                    gender : gender
                }
            case 3:
                return {
                    interestList : interestList
                }
            default:
                return 
        }
    }

    const goNext = async () => {
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
            console.log("들어옴")
            try {
                const req = {
                    username : formData.name,
                    introduction : formData.introduction,
                    birth : `${formData.year}-${formData.month.padStart(2, '0')}-${formData.day.padStart(2, '0')}`,
                    gender : formData.gender,
                    interests : [],
                    profileImage : "https://storage.googleapis.com/starthub-storage/profile-images/default_user_profile.png"
                }
                console.log(JSON.stringify(req))
                await setProfile(req)
                navigation.navigate("HomeStack")
                navigation.popTo("Signin")
            } catch (error : unknown) {
                if(!isAxiosError(error)) return
                const response = error.response
                const data = response?.data as ErrorResponse
                console.log(data.message)
            }
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
            setGender,
            setIntroduction,
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