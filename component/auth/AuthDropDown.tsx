import { Dispatch, SetStateAction, useState } from "react";
import DropDownPicker, { ItemType } from "react-native-dropdown-picker";
import TopButton from "../../assets/icons/top-arrow-back.svg"
import BottomButton from "../../assets/icons/bottom-arrow-back.svg"
import CheckMark from "../../assets/icons/checkmark.svg"
import { StyleSheet } from "react-native";
import { Colors } from "../../constants/Color";

type AuthDropDownProps = {
    open : boolean, 
    value : string | null, 
    items: ItemType<any>[],
    placeholder : string,
    setOpen : Dispatch<SetStateAction<boolean>>
    setValue : (value : string) => void
}

export default function AuthDropDown(props : AuthDropDownProps){

    return (
        <DropDownPicker
            open={props.open}
            value={props.value}
            items={props.items}
            setOpen={props.setOpen}
            multiple = {false}
            setValue={(callback) => {
            const newValue =
                typeof callback === "function"
                ? callback(props.value)
                : callback;
            if (newValue !== null) {
                props.setValue(newValue);
            }}}
            placeholder={props.placeholder}
            placeholderStyle={styles.placeholderStyle}
            style={styles.mainStyle}
            dropDownContainerStyle={styles.dropdownContainerStyle}
            textStyle={styles.textStyle}
            labelStyle={styles.lableStyle}
            containerStyle={{height : 48}}
            ArrowUpIconComponent={
                ({style}) => (
                <TopButton
                    width={18} 
                    height={18} 
                    color={Colors.gray2} 
                    style={style}
                />
            )}
            ArrowDownIconComponent={
                ({style}) => (
                <BottomButton
                    width={18}
                    height={18}
                    color={Colors.gray2}
                    style={style}
                />
            )}
            TickIconComponent={
                ({style}) => (
                <CheckMark
                    width={18}
                    height={18}
                    color={Colors.gray2}
                    style={style}
                />
            )}
        />
    )
}

const styles = StyleSheet.create({
    mainStyle : {
        backgroundColor : Colors.white2,
        borderWidth : 0,
        borderRadius : 8,
        padding : 16
    },
    placeholderStyle : {
        color : Colors.gray2,
        fontSize : 18,
        fontWeight : "medium"
    },
    dropdownContainerStyle : {
        backgroundColor : Colors.white2,
        borderWidth : 0,
        borderRadius : 8,
    },
    textStyle : {
        color : Colors.black2,
        fontSize : 18,
        fontWeight : "medium",
        paddingVertical : 8,
        paddingHorizontal : 6,
    },
    lableStyle : {
        color : Colors.black2,
        fontSize : 18,
        fontWeight : "medium",
        paddingVertical : 8,
        paddingHorizontal : 6,
    }
})