import { Response } from "../util/response.type"

export interface ChatRoomType{
    id : number,
    userName : string,
    lastMsg : string,
    date : Date,
    img : string
}

export interface ChatRoomResponse extends Response{
    data : {
        id : number
        userId : string
        founderId : string
    }
}