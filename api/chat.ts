import StartHubAxios from "../lib/StartHubAxios";
import { ChatMessagesResponse } from "../type/chat/messages.type";
import { ChatRoomResponse } from "../type/chat/room.type";

export const room = async (userId : string, companyId : number) : Promise<ChatRoomResponse> => 
    (await StartHubAxios.post('/chat/room', {}, {
        params : {
            userId : userId,
            companyId : companyId
        }
    })).data


export const messages = async (roomId : number) : Promise<ChatMessagesResponse> => 
    (await StartHubAxios.get('/chat/messages', {
        params : {
            roomId : roomId
        }
    })).data