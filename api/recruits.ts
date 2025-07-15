import StartHubAxios from "../lib/StartHubAxios";
import { GetDetailRecruitResponse, GetRecruitsListResponse } from "../type/notice/recruits.type";

export const getRecruitsList = async (page : number, size : number) : Promise<GetRecruitsListResponse> => 
    (await StartHubAxios.get('/recruits', {
        params : {
            page : page,
            size : size
        }
    })).data

export const getDetailRecruits = async (id : number) : Promise<GetDetailRecruitResponse>=> 
    (await StartHubAxios.get(`/recruits/${id}`)).data

export const deleteRecruits = async (id : number) => 
    (await StartHubAxios.delete(`/recruits/${id}`))