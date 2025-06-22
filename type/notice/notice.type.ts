import { NoticeCategory } from "../../constants/NoticeCategory"

export interface NoticeListItemType {
    id : number
    noticeCategory : NoticeCategory
    title : string
    startTime : Date
    endTime : Date
    hashTagList : string[]
}