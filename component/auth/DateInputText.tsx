import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AutocompleteInput from "react-native-autocomplete-input";
import BottomArrow from "../../assets/icons/bottom-arrow-back.svg"
import TopArrow from "../../assets/icons/top-arrow-back.svg"
import { Colors } from "../../constants/Color";
import { useState } from "react";

type DateInputProps = {
    data : string[]
    placeholder : string
    text : string
    setText : (s : string) => void
}

export default function DateInputText(props : DateInputProps) {

    const [listVisible, setListVisible] = useState(false)
    const [mainWidth, setMainWidth] = useState(0)
    const [mainHeight, setMainHeight] = useState(0)

    return (
        <View 
            onLayout={(event) => {
                setMainWidth(event.nativeEvent.layout.width)
                setMainHeight(event.nativeEvent.layout.height)
            }}
            style={styles.mainContainer}
        >
            <AutocompleteInput
                autoCorrect={false}
                data={props.data}
                defaultValue={props.text}
                hideResults={!listVisible}
                onChangeText={(text) => {props.setText(text)}}
                placeholder={props.placeholder}
                placeholderTextColor={Colors.gray2}
                containerStyle = {styles.container}
                listContainerStyle = {styles.listConatiner}
                inputContainerStyle = {styles.inputContainer}
                style = {styles.dateInputTextContainer}
                maxLength={props.placeholder.length}
                keyboardType="numeric"
                flatListProps={{
                    keyboardShouldPersistTaps: 'always',
                    style : {...styles.listConatiner, 
                        width : mainWidth, 
                        height : mainHeight,
                    },
                    renderItem: ({ item }) => (
                        <TouchableOpacity 
                            style={styles.itemContainer}
                            onPress={() => {
                            props.setText(item)
                            setListVisible(!listVisible)
                        }}
                        >
                            <Text style={styles.itemText}>{item}</Text>
                        </TouchableOpacity>
                    ),
                }}
            />
            <TouchableOpacity onPress={() => setListVisible(!listVisible)}>
                {listVisible ? 
                    <TopArrow color={Colors.gray2} width={14} height={14}/> : 
                    <BottomArrow color={Colors.gray2} width={14} height={14}/> 
                }
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer : {
        minHeight: 48, 
        position: 'relative', 
        zIndex: 1000, 
        borderRadius : 8,
        backgroundColor : Colors.white2,
        paddingEnd : 12,
        flex : 1,
        flexDirection : "row",
        justifyContent : "center",
        alignItems : "center",
    },
    container : {
        flex : 1,
        borderColor : Colors.white2,
        borderRadius : 8,
    },
    dateInputTextContainer : {
        borderColor : Colors.white2,
        backgroundColor : Colors.white2,
        paddingLeft : 16,
    },
    listConatiner : {
        borderColor : Colors.white2,
        backgroundColor : Colors.white2,
        borderRadius : 8,
        paddingHorizontal : 16
    },
    inputContainer : {
        borderColor : Colors.white2,
        backgroundColor : Colors.white2,
        borderRadius : 8,
    },
    itemContainer : {
        marginBottom : 6
    },
    itemText : {
        color : Colors.black2
    }
})