import { NoticeItemType } from "../type/notice/notice.type";
import { NoticeCategory } from "./NoticeCategory";

export const NoticeItemList : NoticeItemType[] = [
    {
        id : 1,
        category : NoticeCategory.BUSINESS,
        title : "string1string1string1string1string1string1string1string1string1string1",
        startTime : new Date(),
        endTime : new Date(),
        hashTags : ["안녕", "안녕", "안녕","안녕", "안녕", "안녕","안녕", "안녕", "안녕","안녕", "안녕", "안녕"]
    },
    {
        id : 2,
        category : NoticeCategory.BUSINESS,
        title : "string2",
        startTime : new Date(),
        endTime : new Date(),
        hashTags : ["안녕", "안녕", "안녕"]
    },
    {
        id : 3,
        category : NoticeCategory.BUSINESS,
        title : "string3",
        startTime : new Date(),
        endTime : new Date(),
        hashTags : ["안녕", "안녕", "안녕"]
    }
]