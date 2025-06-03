import FintechIcon from "../assets/icons/category/fintech-category.svg"
import ContentMediaIcon from "../assets/icons/category/media-category.svg"
import HealthcareBioIcon from "../assets/icons/category/health-category.svg"
import EducationEdutechIcon from "../assets/icons/category/study-category.svg"
import ItSoftwareIcon from "../assets/icons/category/software-category.svg"
import EcommerceIcon from "../assets/icons/category/deal-category.svg"
import EtcIcon from "../assets/icons/category/etc-category.svg"
import { Colors } from "./Color"
import { InterestType } from "./InterestType"

export const InterestTypeList = [
    {id : InterestType.CONTENT_MEDIA, icon : ContentMediaIcon, color : Colors.content_media},
    {id : InterestType.FINTECH, icon : FintechIcon, color : Colors.fintech},
    {id : InterestType.HEALTHCARE_BIO, icon : HealthcareBioIcon, color : Colors.healthcare_bio},
    {id : InterestType.EDUCATION_EDUTECH, icon : EducationEdutechIcon, color : Colors.education_edutech},
    {id : InterestType.IT_SOFTWARE, icon : ItSoftwareIcon, color : Colors.it_software},
    {id : InterestType.ECOMMERCE, icon : EcommerceIcon, color : Colors.ecommerce},
    {id : InterestType.ETC, icon : EtcIcon, color : Colors.etc}
]
