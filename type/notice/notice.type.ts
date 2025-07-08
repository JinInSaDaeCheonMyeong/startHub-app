import { NoticeCategory } from "../../constants/NoticeCategory"

export interface NoticeItemType {
    id : number
    noticeCategory : NoticeCategory
    title : string
    startTime : Date
    endTime : Date
    hashTagList : string[]
}