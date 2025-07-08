import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MemberNoticeItemType } from "../../type/notice/member.type";
import { Shadow } from "react-native-shadow-2";
import { InterestType } from "../../constants/InterestType";
import ContentMediaIcon from "../../assets/icons/category/interest/media-category.svg"
import FintechIcon from "../../assets/icons/category/interest/fintech-category.svg"
import HealthcareBioIcon from "../../assets/icons/category/interest/health-category.svg"
import EducationEdutechIcon from "../../assets/icons/category/interest/study-category.svg"
import ITSoftwareIcon from "../../assets/icons/category/interest/software-category.svg"
import EcommerceIcon from "../../assets/icons/category/interest/deal-category.svg"
import ETCIcon from "../../assets/icons/category/interest/etc-category.svg"
import { Colors } from "../../constants/Color";

interface MemberNoticeItemProps extends MemberNoticeItemType{
    isHome : boolean
    onPress : () => void
}

export default function MemberNoticeItem({
    id,
    title,
    category,
    img,
    location,
    workHistory,
    hashTags,
    isHome,
    onPress
} : MemberNoticeItemProps){
    const categoryMap = {
        [InterestType.CONTENT_MEDIA] : {label : "콘텐츠/미디어", icon : <ContentMediaIcon width={14} height={14} color={Colors.content_media}/>, color : Colors.content_media},
        [InterestType.FINTECH] : {label : "핀테크", icon : <FintechIcon width={14} height={14}/>, color : Colors.fintech},
        [InterestType.HEALTHCARE_BIO] : {label : "헬스케어/바이오", icon : <HealthcareBioIcon width={14} height={14}/>, color : Colors.healthcare_bio},
        [InterestType.EDUCATION_EDUTECH] : {label : "교육/에듀테크", icon : <EducationEdutechIcon width={14} height={14}/>, color : Colors.education_edutech},
        [InterestType.IT_SOFTWARE] : {label : "IT/소프트웨어", icon : <ITSoftwareIcon width={14} height={14}/>, color : Colors.it_software},
        [InterestType.ECOMMERCE] : {label : "전자상거래", icon : <EcommerceIcon width={14} height={14}/>, color : Colors.ecommerce},
        [InterestType.ETC] : {label : "기타", icon : <ETCIcon width={14} height={14}/>, color : Colors.etc}
    }
    return(
        <TouchableOpacity onPress={() => {onPress()}}>
            <Shadow
                distance={4} 
                offset={[0, 4]} 
                startColor="rgba(185, 185, 185, 0.2)"
                style={{
                    width : "100%"
                }}
            >
                <View key={id}>
                    <Image source={{uri : img}}/>
                    <View>
                        <View>
                            {categoryMap[category]?.icon}
                            <Text style={[{color : categoryMap[category]?.color}]}>{categoryMap[category]?.label}</Text>
                        </View>
                        <View>
                            <Text>{title}</Text>
                            <Text>{`${location}-${workHistory}`}</Text>
                        </View>
                    </View>
                    <View>
                        {hashTags.map((value, index) => (
                            <Text id={`${index}`}>
                                {'#' + value}
                            </Text>
                        ))}
                    </View>
                </View>
            </Shadow>
        </TouchableOpacity>
    )
}