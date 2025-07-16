import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import BookMarkFill from "../../assets/icons/bookMark/bookmark.fill.svg"
import BookMark from "../../assets/icons/bookMark/bookmark.svg"
import { Colors } from "../../constants/Color";
import { useState } from "react";
import { Fonts } from "../../constants/Fonts";
import { RecruitsItemType } from "../../type/notice/recruits.type";
import { formatToDate } from "../../util/DateFormat";

interface RecruitsItemProps extends RecruitsItemType{
    isHome : boolean
    onPress : (id : number) => void
}

export default function RecruitsItem({
    id,
    title,
    companyName,
    endDate,
    viewCount,
    isClosed,
    createdAt,
    isHome,
    onPress
} : RecruitsItemProps){
    const {width} = useWindowDimensions()
    const [isSelected, setIsSelected] = useState(false)
    return(
        <TouchableOpacity 
            onPress={() => {onPress(id)}}
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
                    width : isHome ? width/2 : width - 32
                }}
            >
                <View style={styles.mainContainer} >
                    <View style={styles.textContainer}>
                        <Text style={styles.headerText}>{`${formatToDate(createdAt)}`}</Text>
                        <Text style={styles.headerText}>{`조회수 : ${viewCount}`}</Text>
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.companyText}>{companyName}</Text>
                        <Text style={styles.titleText}>{title}</Text>
                    </View>
                    <View style={styles.bookMarkCotainer}>
                        <Text
                            style={[
                                styles.endDateText, 
                                {
                                    color : isClosed ? Colors.error : Colors.primary,
                                    textDecorationLine : isClosed ? "line-through" : "none"
                                }]
                            }
                        >
                            {`모집 마감일 : ${formatToDate(endDate)}`}
                        </Text>
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
    textContainer : {
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : "center"
    },
    titleContainer: {
        gap : 6
    },
    titleText: {
        fontSize: 16,
        fontFamily: Fonts.bold,
        color: Colors.black2,
    },
    companyText : {
        fontSize: 14,
        fontFamily: Fonts.semiBold,
        color: Colors.black2,
    },
    headerText : {
        fontSize : 12,
        fontFamily : Fonts.medium,
        color : Colors.black2
    },
    endDateText : {
        fontSize : 12,
        fontFamily : Fonts.medium,
    },
    bookMarkCotainer : {
        gap : 32,
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : "center",
    }
})