import FintechIcon from "../assets/icons/category/fintech-category.svg"
import MediaIcon from "../assets/icons/category/media-category.svg"
import HealthIcon from "../assets/icons/category/health-category.svg"
import StudyIcon from "../assets/icons/category/study-category.svg"
import SoftwareIcon from "../assets/icons/category/software-category.svg"
import DealIcon from "../assets/icons/category/deal-category.svg"
import EtcIcon from "../assets/icons/category/etc-category.svg"
import { Colors } from "./color"

export const interestTypeList = [
    {id : "media", title : "콘텐츠/미디어", icon : MediaIcon, color : Colors.media},
    {id : "fintech", title : "핀테크", icon : FintechIcon, color : Colors.fintech},
    {id : "health", title : "헬스케어/바이오" , icon : HealthIcon, color : Colors.health},
    {id : "study", title : "교육/에듀테크", icon : StudyIcon, color : Colors.study},
    {id : "software", title : "IT/소프트웨어" , icon : SoftwareIcon, color : Colors.software},
    {id : "deal", title : "전자상거래", icon : DealIcon, color : Colors.deal},
    {id : "etc", title : "기타", icon : EtcIcon, color : Colors.etc}
]