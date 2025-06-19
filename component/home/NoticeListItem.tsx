import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native"
import { NoticeListItemType } from "../../type/notice/notice.type"
import { Shadow } from "react-native-shadow-2"
import { Colors } from "../../constants/Color"
import { Fonts } from "../../constants/Fonts"

interface NoticeListItemProps extends NoticeListItemType {}

export const NoticeListItem = ({
    id, 
    noticeCategory,
    title,
    startTime,
    endTime,
    hashTagList
} : NoticeListItemProps ) => {
    const transformDate = (date : Date) => {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    }
    const {width} = useWindowDimensions()
    
    return (
        <TouchableOpacity style={[styles.wrapper, {width : (width/2)}]}>
            <Shadow
                containerStyle={styles.shadowContainer}
                distance={6} 
                offset={[0, 4]} 
                startColor="rgba(155, 155, 155, 0.2)"
                style={{
                    width : "100%"
                }}
            >
                <View style={styles.mainContainer} key={id}>
                    <View style={styles.categoryContainer}>
                        <Text style={styles.categoryText}>이미지</Text>
                        <Text style={styles.categoryText}>{noticeCategory}</Text>
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText} 
                            numberOfLines={2}
                            ellipsizeMode="tail"
                        >
                            {title}
                        </Text>
                        <Text style={styles.dateText}>
                            {`모집 : ${transformDate(startTime)} ~ ${transformDate(endTime)}`}
                        </Text>
                    </View>
                    <View style={styles.hashTagContainer}>
                        {hashTagList.map((value, index) => (
                            <Text key={index} style={styles.hashTagText}>{`#${value}`}</Text>
                        ))}
                    </View>
                </View>
            </Shadow>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: 200,
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
        gap: 16,
        width: '100%',
    },
    categoryContainer: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center'
    },
    categoryText: {
        fontSize: 12,
        fontFamily: Fonts.semiBold,
        color: Colors.primary
    },
    titleContainer: {
        gap: 6
    },
    titleText: {
        fontSize: 16,
        fontFamily: Fonts.semiBold,
        color: Colors.black2,
        lineHeight: 24
    },
    dateText: {
        fontSize: 12,
        fontFamily: Fonts.medium,
        color: Colors.gray2
    },
    hashTagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8
    },
    hashTagText: {
        fontSize: 12,
        fontFamily: Fonts.medium,
        color: Colors.primary
    }
})