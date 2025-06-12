import axios from "axios";
import { SignupRequest, SignupResponse } from "../../type/user/signup.type";

export const signup = async (signupData : SignupRequest) : Promise<SignupResponse> => {
    const { data } = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/user/sign-up`,
        signupData
    )
    return data
}