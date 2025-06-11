import axios from 'axios';
import {getAccToken, saveAccToken, saveRefToken} from "../util/token";
import {ShowToast, ToastType} from "../util/ShowToast";


const url = process.env.EXPO_PUBLIC_API_URL

export async function getState() {
    try {
        const response = await axios.get(url + '/oauth/state');
        return response.data.data;
    } catch (error: any) {
        ShowToast(
            "문제가 발생하였습니다.",
            error.message,
            ToastType.ERROR
        )
        return;
    }
}

export async function googleLogin(code: String, codeVerifier : String) {
    const state = await getState();
    if (!state) {
        ShowToast(
            "문제가 발생하였습니다.",
            "state is undefined",
            ToastType.ERROR
        )
        return;
    }
    try {
        const response = await axios.get(url + '/oauth/google',{
            params : {
                code : code,
                state : state,
                codeVerifier : codeVerifier,
            }
        });
        await saveAccToken(response.data.data.access);
        await saveRefToken(response.data.data.refresh);
        console.log("Acc" + await getAccToken());
        return response.data.data.isFirstLogin;
    } catch (error: any) {
        ShowToast(
            '문제가 발생하였습니다.',
            error.response.data.message,
            ToastType.ERROR,
        );
    }
}