import axios from "axios";
import { SignupRequest, SignupResponse } from "../../type/user/signup.type";

export const signup = async (signupData : SignupRequest) : Promise<SignupResponse> => {
    console.log("signup : request signup")
    const { data } = await axios.post(
        `${process.env.EXPO_PUBLIC_SERVER_API_BASE_URL}/user/sign-up`,
        signupData
    )
    return data
}