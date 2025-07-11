import { Response } from "../util/response.type"

export interface ChatMessage{
    id : number
    roomId : number
    senderId : string
    message : string
    sendAt : string
}

export interface ChatMessagesResponse extends Response{
    data : ChatMessage[]
}