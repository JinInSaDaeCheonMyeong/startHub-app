import Toast from "react-native-toast-message";

export enum ToastType {
    SUCCESS = "success",
    ERROR = "error",
    INFO = "info",
}

export function ShowToast(
    title: string,
    message: string,
    type: ToastType
) {
    Toast.show({
        text1: title,
        text2: message,
        type: type,
    })
}