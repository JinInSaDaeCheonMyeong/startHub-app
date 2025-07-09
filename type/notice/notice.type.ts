import { NoticeCategory } from "../../constants/NoticeCategory"

export interface NoticeItemType {
    id : number
    category : NoticeCategory
    title : string
    startTime : Date
    endTime : Date
    hashTags : string[]
}