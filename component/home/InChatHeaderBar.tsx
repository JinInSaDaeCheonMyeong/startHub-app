import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LineMenuIcon from "../../assets/icons/line_menu.svg"
import BackButton from "../BackButton";
import { Colors } from "../../constants/Color";
import { Fonts } from "../../constants/Fonts";
import { Shadow } from "react-native-shadow-2";

type InChatHeaderBarProps = {
    img : string
    name : string
    affiliation : string
    backClick : () => void
    menuClick : () => void
}

export default function InChatHeaderBar({img, name, affiliation, backClick, menuClick} : InChatHeaderBarProps) {
    return (
        <Shadow
            distance={4} 
            offset={[0, 4]}
            startColor="rgba(185, 185, 185, 0.2)"
            style={{
                width : "100%"
            }}
        >
            <View style={styles.mainContainer}>
                <View style={styles.titleContainer}>
                    <BackButton
                        width={20}
                        height={20}
                        color={Colors.black2} 
                        onClick={() => {backClick()}}
                    />
                    <Image 
                        style={styles.imgBox} 
                        source={{uri : img}}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.nameText}>
                            {name}
                        </Text>
                        <Text style={styles.affiliationText}>
                            {affiliation}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => {menuClick()}}>
                    <LineMenuIcon 
                        width={28} 
                        height={28} 
                        fill={Colors.black2}
                    />
                </TouchableOpacity>
            </View>
        </Shadow>
    )
}

const styles = StyleSheet.create({
    mainContainer : {
        flexDirection : 'row',
        padding : 16,
        alignItems : "center",
        backgroundColor : Colors.white1
    },
    titleContainer : {
        flex : 1,
        flexDirection : 'row',
        alignItems : "center",
        gap : 12
    },
    textContainer : {
        gap : 0
    },
    imgBox : {
        width  : 48,
        height : 48,
        borderRadius : 40
    },
    nameText : {
        fontSize : 16,
        color : Colors.black2,
        fontFamily : Fonts.semiBold
    },
    affiliationText : {
        fontSize : 14,
        color : Colors.gray2,
        fontFamily : Fonts.medium
    }
})