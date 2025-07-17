import { Response } from "../util/response.type"

export interface ChatRoomType{
    id : number
    userId : number
    founderId : number
}

export interface ChatRoomResponse extends Response{
    data : ChatRoomType
}

export interface ChatRoomListResponse extends Response{
    data : ChatRoomType[]
}