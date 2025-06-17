import axios from "axios";
import { SigninRequest, SigninResponse } from "../type/user/signin.type";
import { SignupRequest } from "../type/user/signup.type";
import { RefreshRequest, RefreshResponse } from "../type/user/refresh.type";

const url = process.env.EXPO_PUBLIC_API_URL

export const signup = async (signupData : SignupRequest)=> {
    await axios.post(
        url + '/user/sign-up',
        signupData
    )
}

export const signin = async (signinData : SigninRequest) : Promise<SigninResponse> => {
    const { data } = await axios.post(
        url + '/user/sign-in',
        signinData
    )
    return data;
}

export const refresh = async (refreshData : RefreshRequest) : Promise<RefreshResponse> => {
    const { data } = await axios.post(
        url + '/user/reissue',
        refreshData
    )
    return data
}