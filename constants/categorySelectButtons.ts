import FintechIcon from "../assets/icons/category/fintech-category.svg"
import MediaIcon from "../assets/icons/category/media-category.svg"
import HealthIcon from "../assets/icons/category/health-category.svg"
import StudyIcon from "../assets/icons/category/study-category.svg"
import SoftwareIcon from "../assets/icons/category/software-category.svg"
import DealIcon from "../assets/icons/category/deal-category.svg"
import EtcIcon from "../assets/icons/category/etc-category.svg"
import { Colors } from "./color"

export const categorySelectButtons = [
    {category : "media", title : "콘텐츠/미디어", icon : MediaIcon, color : Colors.media},
    {category : "fintech", title : "핀테크", icon : FintechIcon, color : Colors.fintech},
    {category : "health", title : "헬스케어/바이오" , icon : HealthIcon, color : Colors.health},
    {category : "study", title : "교육/에듀테크", icon : StudyIcon, color : Colors.study},
    {category : "software", title : "IT/소프트웨어" , icon : SoftwareIcon, color : Colors.software},
    {category : "deal", title : "전자상거래", icon : DealIcon, color : Colors.deal},
    {category : "etc", title : "기타", icon : EtcIcon, color : Colors.etc}
]