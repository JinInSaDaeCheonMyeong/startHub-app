import {SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import { HeaderBar } from "../../component/home/HeaderBar";
import { Colors } from "../../constants/Color";
import { Fonts } from "../../constants/Fonts";
import { Shadow } from "react-native-shadow-2";
import BMCNote from "../../assets/icons/bmc_note.svg"

export default function HomeScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <HeaderBar 
                onClickBellIcon={() => {}}
                onClickSystemIcon={() => {}}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    gap : 16,
                }} 
            >
                <View style={styles.imminentContainer}>
                    <Text style={styles.imminentText}>마감임박</Text>
                    <Text 
                        style={styles.imminentTitleText}
                        numberOfLines={1}
                        ellipsizeMode={"tail"}
                    >
                        {'[아산나눔재단]어쩌고저쩌고쌸라fdsafsdafㄴㅇㄹㄴㄴs'}
                    </Text>
                </View>
                <View style={commonContainer.container}>
                    <Shadow
                        distance={6} 
                        offset={[0, 4]} 
                        startColor="rgba(155, 155, 155, 0.2)"
                        style={{
                            width : "100%"
                        }}
                    >
                        <View style={styles.BMCContainer}>
                            <BMCNote width={50} height={50}/>
                            <Text style={styles.BMCText}>내 BMC가 없어요...</Text>
                        </View>
                    </Shadow>
                </View>
                <View>
                    <Text></Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const commonContainer = StyleSheet.create({
    container : {
        overflow : "visible", 
        paddingHorizontal : 16
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor : Colors.white1,
        gap : 16,
    },
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
    BMCContainer : {
        backgroundColor : Colors.white1,
        justifyContent : "center",
        alignItems : "center",
        paddingVertical : 60,
        borderRadius : 8,
        gap : 12
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
    BMCText : {
        color : Colors.black2,
        fontFamily : Fonts.semiBold,
        flex : 1,
        fontSize : 16,
        flexShrink : 1
    }
})