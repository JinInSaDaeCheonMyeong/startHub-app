import { Image, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native"
import { Colors } from "../constants/Color"
import BellIcon from "../assets/icons/header/bell.svg"
import SystemIcon from "../assets/icons/header/cogwheel-outline.svg"

type HeaderBarProps = {
    onClickBellIcon : () => void,
    onClickSystemIcon : () => void
}

export default function HeaderBar(props : HeaderBarProps){
    const logo = require("../assets/logos/starthub_title_logo.png")
    return (
        <SafeAreaView>
            <View style={styles.headerContainer}>
                <Image style={{width : 88, height : 36}} source={logo}/>
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={props.onClickBellIcon}>
                        <BellIcon width={24} height={24} color={Colors.black2}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={props.onClickSystemIcon}>
                        <SystemIcon width={24} height={24} color={Colors.black2}/>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerContainer : {
        width : "100%",
        backgroundColor : Colors.white1,
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : "center",
        alignContent : "center",
        padding : 16
    },
    iconContainer : {
        flexDirection : "row",
        gap : 16
    }
})