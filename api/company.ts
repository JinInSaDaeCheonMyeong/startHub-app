import StartHubAxios from "../lib/StartHubAxios";
import { GetCompanyByIdResponse } from "../type/company/company.type";

export const getCompanyById = async (id : number) : Promise<GetCompanyByIdResponse> => 
    (await StartHubAxios.get(`/company/${id}`)).data