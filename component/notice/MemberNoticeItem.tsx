import { Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
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
import BookMarkFill from "../../assets/icons/bookMark/bookmark.fill.svg"
import BookMark from "../../assets/icons/bookMark/bookmark.svg"
import { Colors } from "../../constants/Color";
import { useState } from "react";
import { Fonts } from "../../constants/Fonts";

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
    const {width} = useWindowDimensions()
    const [isSelected, setIsSelected] = useState(false)
    const categoryMap = {
        [InterestType.CONTENT_MEDIA] : {label : "콘텐츠/미디어", icon : <ContentMediaIcon width={14} height={14} color={Colors.content_media}/>, color : Colors.content_media},
        [InterestType.FINTECH] : {label : "핀테크", icon : <FintechIcon width={14} height={14} color={Colors.fintech}/>, color : Colors.fintech},
        [InterestType.HEALTHCARE_BIO] : {label : "헬스케어/바이오", icon : <HealthcareBioIcon width={14} height={14} color={Colors.healthcare_bio}/>, color : Colors.healthcare_bio},
        [InterestType.EDUCATION_EDUTECH] : {label : "교육/에듀테크", icon : <EducationEdutechIcon width={14} height={14} color={Colors.education_edutech}/>, color : Colors.education_edutech},
        [InterestType.IT_SOFTWARE] : {label : "IT/소프트웨어", icon : <ITSoftwareIcon width={14} height={14} color={Colors.it_software}/>, color : Colors.it_software},
        [InterestType.ECOMMERCE] : {label : "전자상거래", icon : <EcommerceIcon width={14} height={14} color={Colors.ecommerce}/>, color : Colors.ecommerce},
        [InterestType.ETC] : {label : "기타", icon : <ETCIcon width={14} height={14} color={Colors.etc}/>, color : Colors.etc}
    }
    return(
        <TouchableOpacity 
            onPress={() => {onPress()}}
            style={{
            width : isHome ? width/2 : "100%"
            }}
            key={id}
            >
            <Shadow
                containerStyle={styles.shadowContainer}
                distance={4} 
                offset={[0, 4]}
                startColor="rgba(185, 185, 185, 0.2)"
                style={{
                    width : isHome ? width/2 : "100%"
                }}
            >
                <View style={styles.mainContainer} >
                    <Image source={{uri : img}} style={{width : 60, minHeight : 16}}/>
                    <View style={styles.textContainer}>
                        <View style={styles.categoryContainer}>
                            {categoryMap[category]?.icon}
                            <Text style={[styles.categoryText, {color : categoryMap[category]?.color}]}>{categoryMap[category]?.label}</Text>
                        </View>
                        <View style={styles.titleContainer}>
                            <Text 
                                style={styles.titleText}
                                numberOfLines={2}
                                ellipsizeMode="tail"
                            >
                                {title}
                                </Text>
                            <Text style={styles.locationText}>{`${location}-${workHistory}`}</Text>
                        </View>
                    </View>
                    <View style={styles.bookMarkCotainer}>
                        <View style={[styles.hashTagContainer, isHome && {
                            height : 34
                        }]}>
                            {hashTags.map((value, index) => (
                                <Text style={styles.hashTagText} key={index}>
                                    {'#' + value}
                                </Text>
                            ))}
                        </View>
                        {!isHome && (
                                <TouchableOpacity onPress={() => {setIsSelected((value) => !value)}}>
                                    {isSelected ? 
                                    <BookMarkFill 
                                        width={24}
                                        height={24}
                                        fill={Colors.primary}
                                        color={Colors.primary}
                                    />
                                    :
                                    <BookMark
                                        width={24}
                                        height={24}
                                        color={Colors.black2}
                                    />
                                    }
                                </TouchableOpacity>
                            )
                        }   
                    </View>
                </View>
            </Shadow>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    shadowContainer: {
        borderRadius: 16,
        overflow: 'visible',
        width: '100%',
    },
    mainContainer: {
        backgroundColor: Colors.white1,
        padding: 20,
        borderRadius: 16,
        gap: 12,
        width: '100%',
    },
    categoryContainer: {
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center'
    },
    categoryText: {
        fontSize: 12,
        fontFamily: Fonts.semiBold,
    },
    textContainer : {
        gap : 6
    },
    titleContainer: {
        gap: 4,
    },
    titleText: {
        fontSize: 16,
        lineHeight : 20,
        fontFamily: Fonts.semiBold,
        color: Colors.black2,
    },
    locationText: {
        fontSize: 12,
        fontFamily: Fonts.medium,
        color: Colors.black2
    },
    hashTagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex : 1,
        gap: 8,
        overflow : "hidden"
    },
    hashTagText: {
        fontSize: 12,
        lineHeight : 12,
        fontFamily: Fonts.medium,
        color: Colors.primary
    },
    bookMarkCotainer : {
        gap : 32,
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : "center",
    }
})