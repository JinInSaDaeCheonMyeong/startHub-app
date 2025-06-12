import axios from "axios";
import { VerifyRequest, VerifyResponse } from "../../type/email/verify.type";

export const verify = async (verifyData : VerifyRequest) : Promise<VerifyResponse> => {
    const { data } = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/email/verify`,
        verifyData
        )
    return data
}