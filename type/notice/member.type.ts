import { InterestType } from "../../constants/InterestType"

export interface MemberNoticeItemType {
    id : number
    category : InterestType
    img : string
    title : string
    location : string
    workHistory : string
    hashTags : string[]
}