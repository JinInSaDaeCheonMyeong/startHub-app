import axios from "axios";
import { VerifyRequest } from "../../type/email/verify.type";

export const verify = async (verifyData : VerifyRequest) => {
    await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}email/verify`,
        verifyData
    )
}