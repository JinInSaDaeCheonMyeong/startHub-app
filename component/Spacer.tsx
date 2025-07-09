import { View } from "react-native";

export default function Spacer({width = 0, height = 0} : {width ?: number, height ?: number}){
    return(
        <View style={{width : width, height : height}}/>
    )
}