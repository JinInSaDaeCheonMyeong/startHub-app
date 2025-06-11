import axios from "axios";
import { SigninRequest, SigninResponse } from "../../type/user/signin/signin.type";

export const signin = async (signinData : SigninRequest) : Promise<SigninResponse> => {
    console.log(process.env.EXPO_PUBLIC_SERVER_API_BASE_URL)
    const { data } = await axios.post(
        `${process.env.EXPO_PUBLIC_SERVER_API_BASE_URL}/user/sign-in`,
        signinData
    )
    return data;
}