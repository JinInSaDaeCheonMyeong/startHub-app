import axios from "axios";
import { SigninRequest, SigninResponse } from "../../type/user/signin.type";

export const signin = async (signinData : SigninRequest) : Promise<SigninResponse> => {
    const { data } = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}user/sign-in`,
        signinData
    )
    return data;
}