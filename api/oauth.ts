import axios from 'axios';
import Toast from "react-native-toast-message";
import {getAccToken, saveAccToken, saveRefToken} from "../util/token";
import {ShowToast, ToastType} from "../util/ShowToast";


const url = process.env.EXPO_PUBLIC_API_URL

export async function getState() {
    try {
        const response = await axios.get(url + '/oauth/state');
        return response.data.data;
    } catch (error: any) {
        ShowToast(
            "실패",
            error.message,
            ToastType.ERROR
        )
    }
}

export async function googleLogin(code: String) {
    const state = await getState();
    console.log(state);
    if (state) {
        try {
            const response = await axios.post(url + '/oauth/google',{},{
                params : {
                    code : code,
                    state : state
                }
            });
            console.log(code);
            await saveAccToken(response.data.data.access);
            await saveRefToken(response.data.data.refresh);
            console.log("acc : " + await getAccToken());
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'a ++ 문제가 발생하였습니다',
                text2: error.message,
            });
        }
    }
}