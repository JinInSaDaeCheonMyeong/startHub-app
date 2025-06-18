import axios from 'axios';
import { saveAccToken, saveRefToken} from "../util/token";
import {ShowToast, ToastType} from "../util/ShowToast";
import {Platform} from "react-native";


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
    const platform = Platform.select({
        ios: 'ios',
        android: 'android'
    })
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
                platform: platform,
                codeVerifier : codeVerifier,
            }
        });
        await saveAccToken(response.data.data.access);
        await saveRefToken(response.data.data.refresh);
        return response.data.data.isFirstLogin;
    } catch (error: any) {
        ShowToast(
            '문제가 발생하였습니다.',
            error.message,
            ToastType.ERROR,
        );
    }
}