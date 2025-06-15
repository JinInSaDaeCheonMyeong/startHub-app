import axios from "axios";
import { SendcodeRequest } from "../type/email/sendcode.type";
import { VerifyRequest } from "../type/email/verify.type";

const url = process.env.EXPO_PUBLIC_API_URL

export const verify = async (verifyData : VerifyRequest) => {
    await axios.post(
        url + '/email/verify',
        verifyData
    )
}

export const sendcode = async (sendcodeData : SendcodeRequest) => {
    await axios.post(
        url + '/email/send-code',
        sendcodeData
    )
}