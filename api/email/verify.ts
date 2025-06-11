import axios from "axios";
import { VerifyRequest, VerifyResponse } from "../../type/email/verify.type";

export const verify = async (verifyData : VerifyRequest) : Promise<VerifyResponse> => {
    console.log("verify : request verify")
    const { data } = await axios.post(
        `${process.env.EXPO_PUBLIC_SERVER_API_BASE_URL}/email/verify`,
        verifyData
        )
    return data
}