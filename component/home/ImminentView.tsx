import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import { Colors } from "../../constants/Color"
import { Fonts } from "../../constants/Fonts"

type ImminentViewProps = {
    title : string
    onPress : () => void
}

export default function ImminentView({
    title,
    onPress
} : ImminentViewProps){
    return (
        <TouchableOpacity onPress={() => {onPress()}}>
            <View style={styles.imminentContainer}>
                <Text style={styles.imminentText}>마감임박</Text>
                <Text
                    style={styles.imminentTitleText}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    imminentContainer : {
        marginTop : 16,
        marginHorizontal : 16,
        flexDirection : 'row',
        gap : 16,
        paddingVertical : 12,
        paddingHorizontal : 16,
        borderColor : Colors.error,
        borderWidth : 1,
        borderStyle : "solid",
        borderRadius : 8,
    },
    imminentText : {
        color : Colors.error,
        fontFamily : Fonts.bold,
        fontSize : 14
    },
    imminentTitleText : {
        color : Colors.black2,
        fontFamily : Fonts.medium,
        flex : 1,
        flexShrink : 1,
        fontSize : 14
    },
})