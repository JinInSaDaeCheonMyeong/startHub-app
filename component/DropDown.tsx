import { Dispatch, SetStateAction, useState } from "react";
import DropDownPicker, { ItemType } from "react-native-dropdown-picker";
import TopButton from "../assets/icons/top-arrow-back.svg"
import BottomButton from "../assets/icons/bottom-arrow-back.svg"
import CheckMark from "../assets/icons/checkmark.svg"
import {StyleProp, StyleSheet, TextStyle, ViewStyle} from "react-native";
import { Colors } from "../constants/Color";
import { Fonts } from "../constants/Fonts";

type DropDownProps = {
    open : boolean, 
    value : string | null, 
    items: ItemType<any>[],
    placeholder : string,
    setOpen : Dispatch<SetStateAction<boolean>>
    setValue : (value : string) => void,
    textStyle? : StyleProp<TextStyle>,
    placeholderStyle? : StyleProp<TextStyle>,
    labelStyle?: StyleProp<TextStyle>,
    iconWidth?: number
    iconHeight?: number
    containerStyle?: StyleProp<ViewStyle>,
}

export default function DropDown(props :DropDownProps){
    const textStyle = props.textStyle ?? styles.textStyle;
    const placeholderStyle = props.placeholderStyle ?? styles.placeholderStyle;
    const labelStyle = props.labelStyle ?? styles.labelStyle;
    const iconWidth = props.iconWidth?? 18;
    const iconHeight = props.iconHeight?? 18;
    const containerStyle = props.containerStyle?? {height:48};
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
            placeholderStyle={placeholderStyle}
            style={styles.mainStyle}
            dropDownContainerStyle={styles.dropdownContainerStyle}
            textStyle={textStyle}
            labelStyle={labelStyle}
            containerStyle={containerStyle}
            ArrowUpIconComponent={
                ({style}) => (
                <TopButton
                    width={iconWidth}
                    height={iconHeight}
                    color={Colors.gray2} 
                    style={style}
                />
            )}
            ArrowDownIconComponent={
                ({style}) => (
                <BottomButton
                    width={iconWidth}
                    height={iconHeight}
                    color={Colors.gray2}
                    style={style}
                />
            )}
            TickIconComponent={
                ({style}) => (
                <CheckMark
                    width={iconWidth}
                    height={iconHeight}
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
        fontFamily : Fonts.medium
    },
    dropdownContainerStyle : {
        backgroundColor : Colors.white2,
        borderWidth : 0,
        borderRadius : 8,
    },
    textStyle : {
        color : Colors.black2,
        fontSize : 18,
        fontFamily : Fonts.medium,
        paddingVertical : 8,
        paddingHorizontal : 6,
    },
    labelStyle : {
        color : Colors.black2,
        fontSize : 18,
        fontFamily : Fonts.medium,
        paddingVertical : 8,
        paddingHorizontal : 6,
    }
})