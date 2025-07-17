import StartHubAxios from "../lib/StartHubAxios";
import { ChatMessagesResponse } from "../type/chat/messages.type";
import { ChatRoomListResponse, ChatRoomResponse } from "../type/chat/room.type";

export const createRoom = async (userId : number, companyId : number) : Promise<ChatRoomResponse> => 
    (await StartHubAxios.post('/chat/room', {}, {
        params : {
            userId : userId,
            companyId : companyId
        }
    })).data

export const getMessages = async (roomId : number) : Promise<ChatMessagesResponse> => 
    (await StartHubAxios.get('/chat/messages', {
        params : {
            roomId : roomId
        }
    })).data

export const getMyRoom = async () : Promise<ChatRoomListResponse> =>
    (await StartHubAxios.get('/chat/my')).data