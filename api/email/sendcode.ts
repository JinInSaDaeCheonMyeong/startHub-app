import axios from "axios";
import { SendcodeRequest } from "../../type/email/sendcode.type";

export const sendcode = async (sendcodeData : SendcodeRequest) => {
    await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}email/send-code`,
        sendcodeData
    )
}