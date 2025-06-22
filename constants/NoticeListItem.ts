import { NoticeListItemType } from "../type/notice/notice.type";
import { NoticeCategory } from "./NoticeCategory";

export const NoticeListItemList : NoticeListItemType[] = [
    {
        id : 1,
        noticeCategory : NoticeCategory.BUSINESS,
        title : "string1string1string1string1string1string1string1",
        startTime : new Date(),
        endTime : new Date(),
        hashTagList : ["안녕", "안녕", "안녕"]
    },
    {
        id : 2,
        noticeCategory : NoticeCategory.BUSINESS,
        title : "string2",
        startTime : new Date(),
        endTime : new Date(),
        hashTagList : ["안녕", "안녕", "안녕"]
    },
    {
        id : 3,
        noticeCategory : NoticeCategory.BUSINESS,
        title : "string3",
        startTime : new Date(),
        endTime : new Date(),
        hashTagList : ["안녕", "안녕", "안녕"]
    }
]