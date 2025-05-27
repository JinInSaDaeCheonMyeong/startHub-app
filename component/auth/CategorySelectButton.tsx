import { Text, TouchableOpacity, View } from "react-native";
import CategoryCheckMark from "../../assets/icons/category/category-check-mark.svg"
import { Colors } from "../../constants/color";
import { ReactElement } from "react";
import { SvgProps } from "react-native-svg";

type CategorySelectButtonProps = {
    title : string,
    icons : React.FC<SvgProps>,
    color : string,
    onClick : () => void
}

export default function CategorySelectButton(props : CategorySelectButtonProps) {
    return(
        <TouchableOpacity onPress={() => {props.onClick()}}>
            <View>
                <View>
                    {<props.icons color={props.color}/>}
                    <Text>{props.title}</Text>
                </View>
                <CategoryCheckMark color={Colors.fintech}/>
            </View>
        </TouchableOpacity>
    )
}