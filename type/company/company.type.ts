import { Response } from "../util/response.type"

export interface CompanyItemType{
    id : number,
    companyName : string,
    companyDescription : string,
    companyCategory : string,
    logoImage : string
}

export interface GetCompanyByIdResponse extends Response{
    data : CompanyItemType & {
        businessDescription : "테스트기업입니다1",
        founderId : number,
        founderName : string,
        companyUrl : string,
        contactEmail : string,
        contactNumber : string,
        address : string,
        employeeCount : number,
    }
}