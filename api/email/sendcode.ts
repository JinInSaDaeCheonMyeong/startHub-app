import axios from "axios";
import { SendcodeRequest, SendcodeResponse } from "../../type/email/sendcode.type";

export const sendcode = async (sendcodeData : SendcodeRequest) : Promise<SendcodeResponse> => {
    const { data } = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/email/send-code`,
        sendcodeData
    )
    return data
}