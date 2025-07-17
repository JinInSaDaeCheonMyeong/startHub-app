import { NoticeCategory } from "../../constants/NoticeCategory"

export interface NoticeItemType {
    id : number
    category : NoticeCategory
    title : string
    startTime : Date
    endTime : Date
    location : string
    target  : string
    years : string[]
    entre : string
    webLink : string
}