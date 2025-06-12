import axios from "axios";
import { SendcodeRequest, SendcodeResponse } from "../../type/email/sendcode.type";

export const sendcode = async (sendcodeData : SendcodeRequest) : Promise<SendcodeResponse> => {
    console.log("send-code : 요청")
    const { data } = await axios.post(
        `${process.env.EXPO_PUBLIC_SERVER_API_BASE_URL}/email/send-code`,
        sendcodeData
    )
    return data
}