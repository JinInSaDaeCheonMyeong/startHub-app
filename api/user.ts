import axios from "axios";
import { SigninRequest, SigninResponse } from "../type/user/signin.type";
import { SignupRequest } from "../type/user/signup.type";
import { RefreshRequest, RefreshResponse } from "../type/user/refresh.type";
import StartHubAxios from "../lib/StartHubAxios";
import { Response } from "../type/util/response.type";

export const signup = async (signupData : SignupRequest) : Promise<Response> =>
    (await StartHubAxios.post('/user/sign-up', signupData)).data

export const signin = async (signinData : SigninRequest) : Promise<SigninResponse> => 
    (await StartHubAxios.post('/user/sign-in', signinData)).data

export const refresh = async (refreshData : RefreshRequest) : Promise<RefreshResponse> => 
    (await StartHubAxios.post('/user/refresh',refreshData)).data