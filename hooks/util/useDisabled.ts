import { useCallback, useState } from "react"

export const useDisabled = () =>{
    const [disabled, setDisabled] = useState(false)
    const disabledBtn = useCallback(() => setDisabled(true), []);
    const enabledBtn = useCallback(() => setDisabled(false), []);
    
    return {
        disabled,
        disabledBtn,
        enabledBtn
    }
}