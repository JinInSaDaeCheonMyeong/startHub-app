import axios from "axios";
import { LoginRequest, LoginResponse } from "../../type/login/login.type";

export const login = async (loginData : LoginRequest) : Promise<LoginResponse> => {
    console.log(process.env.EXPO_PUBLIC_SERVER_API_BASE_URL)
    const { data } = await axios.post(
        `${process.env.EXPO_PUBLIC_SERVER_API_BASE_URL}/user/sign-in`,
        loginData
    )
    return data;
}