import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native"
import { NoticeItemType } from "../../type/notice/notice.type"
import { Shadow } from "react-native-shadow-2"
import { Colors } from "../../constants/Color"
import { Fonts } from "../../constants/Fonts"
import { NoticeCategory } from "../../constants/NoticeCategory"
import BusinessIcon from "../../assets/icons/category/notice/business.svg"
import EducationIcon from "../../assets/icons/category/notice/education.svg"
import EventIcon from "../../assets/icons/category/notice/event.svg"
import FacilityIcon from "../../assets/icons/category/notice/facility.svg"
import FundingIcon from "../../assets/icons/category/notice/funding.svg"
import GlobalIcon from "../../assets/icons/category/notice/global.svg"
import RNDIcon from "../../assets/icons/category/notice/rnd.svg"
import TalentIcon from "../../assets/icons/category/notice/talent.svg"
import { useState } from "react"
import BookMarkFill from "../../assets/icons/bookMark/bookmark.fill.svg"
import BookMark from "../../assets/icons/bookMark/bookmark.svg"

interface NoticeItemProps extends NoticeItemType {
    isHome : boolean
}

export default function NoticeItem({
    id, 
    noticeCategory,
    title,
    startTime,
    endTime,
    hashTagList,
    isHome
} : NoticeItemProps ){
    const {width} = useWindowDimensions()
    const [isSelected, setIsSelected] = useState(false)
    const transformDate = (date : Date) => {
        return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`
    }
    const transformCategoryText = (category : NoticeCategory) => {
        switch(category){
            case NoticeCategory.BUSINESS:
                return "사업화"
            case NoticeCategory.EDUCATION:
                return "교육"
            case NoticeCategory.EVENT:
                return "행사"
            case NoticeCategory.FACILITY:
                return "시설"
            case NoticeCategory.FUNDING:
                return "자금"
            case NoticeCategory.GLOBAL:
                return "글로벌"
            case NoticeCategory.RND:
                return "R&D"
            case NoticeCategory.TALENT:
                return "인력"
        }
    }
    const transformCategoryIcon = (category : NoticeCategory) => {
        switch(category){
            case NoticeCategory.BUSINESS:
                return <BusinessIcon width={16} height={16}/>
            case NoticeCategory.EDUCATION:
                return <EducationIcon width={16} height={16}/>
            case NoticeCategory.EVENT:
                return <EventIcon width={16} height={16}/>
            case NoticeCategory.FACILITY:
                return <FacilityIcon width={16} height={16}/>
            case NoticeCategory.FUNDING:
                return <FundingIcon width={16} height={16}/>
            case NoticeCategory.GLOBAL:
                return <GlobalIcon width={16} height={16}/>
            case NoticeCategory.RND:
                return <RNDIcon width={16} height={16}/>
            case NoticeCategory.TALENT:
                return <TalentIcon width={16} height={16}/>
        }
    }
    
    return (
        <TouchableOpacity style={[styles.wrapper, {
            width : isHome ? width/2 : "100%"
            }]}>
            <Shadow
                containerStyle={styles.shadowContainer}
                distance={6} 
                offset={[0, 4]} 
                startColor="rgba(155, 155, 155, 0.2)"
                style={{
                    width : isHome ? width/2 : "100%"
                }}
            >
                <View style={styles.mainContainer} key={id}>
                    <View style={styles.categoryContainer}>
                        {transformCategoryIcon(noticeCategory)}
                        <Text style={styles.categoryText}>
                            {transformCategoryText(noticeCategory)}
                        </Text>
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText} 
                            numberOfLines={2}
                            ellipsizeMode="tail"
                        >
                            {title}
                        </Text>
                        <Text style={styles.dateText}>
                            {`모집 : ${transformDate(startTime)}~${transformDate(endTime)}`}
                        </Text>
                    </View>
                    <View style={styles.bookMarkCotainer}>
                        <View style={styles.hashTagContainer}>
                            {hashTagList.map((value, index) => (
                                <Text key={index} style={styles.hashTagText}>{`#${value}`}</Text>
                            ))}
                        </View>
                        {!isHome ?
                            <TouchableOpacity onPress={() => {setIsSelected(!isSelected)}}>
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
                                    fill={Colors.primary}
                                    color={Colors.primary}
                                />
                                }
                            </TouchableOpacity>
                        : 
                            <></>
                        }   
                    </View>
                </View>
            </Shadow>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        height : 154
    },
    shadowContainer: {
        borderRadius: 16,
        overflow: 'visible',
        width: '100%',
    },
    mainContainer: {
        backgroundColor: Colors.white1,
        padding: 16,
        borderRadius: 16,
        gap: 12,
        width: '100%',
        height : 164
    },
    categoryContainer: {
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center'
    },
    categoryText: {
        fontSize: 12,
        fontFamily: Fonts.semiBold,
        color: Colors.primary
    },
    titleContainer: {
        gap: 4,
    },
    titleText: {
        fontSize: 16,
        fontFamily: Fonts.semiBold,
        color: Colors.black2,
        lineHeight : 20,
        height : 44
    },
    dateText: {
        fontSize: 12,
        fontFamily: Fonts.medium,
        color: Colors.black2
    },
    hashTagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        maxHeight : 32,
        overflow : "hidden"
    },
    hashTagText: {
        fontSize: 12,
        lineHeight : 12,
        fontFamily: Fonts.medium,
        color: Colors.primary
    },
    bookMarkCotainer : {
        flexDirection : "row",
        width : "100%"
    }
})