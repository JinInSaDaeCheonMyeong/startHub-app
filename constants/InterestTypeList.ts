import FintechIcon from "../assets/icons/category/interest/fintech-category.svg"
import ContentMediaIcon from "../assets/icons/category/interest/media-category.svg"
import HealthcareBioIcon from "../assets/icons/category/interest/health-category.svg"
import EducationEdutechIcon from "../assets/icons/category/interest/study-category.svg"
import ItSoftwareIcon from "../assets/icons/category/interest/software-category.svg"
import EcommerceIcon from "../assets/icons/category/interest/deal-category.svg"
import EtcIcon from "../assets/icons/category/interest/etc-category.svg"
import { Colors } from "./Color"
import { InterestType } from "./InterestType"

export const InterestTypeList = [
    {id : InterestType.CONTENT_MEDIA, text : "콘텐츠/미디어", icon : ContentMediaIcon, color : Colors.content_media},
    {id : InterestType.FINTECH, text : "핀테크", icon : FintechIcon, color : Colors.fintech},
    {id : InterestType.HEALTHCARE_BIO, text : "헬스케어/바이오", icon : HealthcareBioIcon, color : Colors.healthcare_bio},
    {id : InterestType.EDUCATION_EDUTECH, text : "교육/에듀테크", icon : EducationEdutechIcon, color : Colors.education_edutech},
    {id : InterestType.IT_SOFTWARE, text : "IT/소프트웨어", icon : ItSoftwareIcon, color : Colors.it_software},
    {id : InterestType.ECOMMERCE, text : "전자상거레", icon : EcommerceIcon, color : Colors.ecommerce},
    {id : InterestType.ETC, text : "기타", icon : EtcIcon, color : Colors.etc}
]
