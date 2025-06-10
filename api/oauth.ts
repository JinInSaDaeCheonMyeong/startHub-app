import axios from 'axios';
import {saveAccToken, saveRefToken} from "../util/token";
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

export async function googleLogin(code: String) {
    const state = await getState();
    console.log(state);
    if (!state) {
        ShowToast(
            "문제가 발생하였습니다.",
            "state is undefined",
            ToastType.ERROR
        )
        return;
    }
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
        return response.data.data.isFirstLogin;
    } catch (error: any) {
        ShowToast(
            '문제가 발생하였습니다.',
            error.message,
            ToastType.ERROR,
        );
    }
}