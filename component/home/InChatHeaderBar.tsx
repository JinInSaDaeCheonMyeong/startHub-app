import { Image, Text, TouchableOpacity, View } from "react-native";
import LineMenuIcon from "../../assets/icons/line_menu.svg"
import BackButton from "../BackButton";
import { Colors } from "../../constants/Color";

type InChatHeaderBarProps = {
    img : string
    name : string
    affiliation : string
    backClick : () => void
    menuClick : () => void
}

export default function InChatHeaderBar({img, name, affiliation, backClick, menuClick} : InChatHeaderBarProps) {
    return (
        <View>
            <View>
                <BackButton
                    width={20}
                    height={20}
                    color={Colors.black2} 
                    onClick={() => {backClick()}}
                />
                <Image style={{width : 40, height : 40}} source={{uri : img}}/>
                <View>
                    <Text>
                        {name}
                    </Text>
                    <Text>
                        {affiliation}
                    </Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => {menuClick()}}>
                <LineMenuIcon 
                    width={24} 
                    height={24} 
                    fill={Colors.black2}
                />
            </TouchableOpacity>
        </View>
    )
}