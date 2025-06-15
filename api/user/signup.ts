import axios from "axios";
import { SignupRequest } from "../../type/user/signup.type";

export const signup = async (signupData : SignupRequest)=> {
    await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}user/sign-up`,
        signupData
    )
}