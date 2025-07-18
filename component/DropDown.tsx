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
    minWidth?: number,
    maxWidth?: number,
}

export default function DropDown(props :DropDownProps){
    const textStyle = props.textStyle ?? styles.textStyle;
    const placeholderStyle = props.placeholderStyle ?? styles.placeholderStyle;
    const labelStyle = props.labelStyle ?? styles.labelStyle;
    const iconWidth = props.iconWidth?? 18;
    const iconHeight = props.iconHeight?? 18;
    const calculateTextWidth = (text: string) => {
        let width = 0;
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (/[가-힣]/.test(char)) {
                width += 16;
            } else if (/[a-zA-Z0-9]/.test(char)) {
                width += 13;
            } else {
                width += 6;
            }
        }
        return width + 60;
    };
    const selectedItem = props.items.find(item => item.value === props.value);
    const displayText = selectedItem ? selectedItem.label : props.placeholder;
    const calculatedWidth = calculateTextWidth(displayText || "");
    
    const minWidth = props.minWidth ?? 80;
    const maxWidth = props.maxWidth ?? 200;
    const dynamicWidth = Math.max(minWidth, Math.min(maxWidth, calculatedWidth));
    
    const containerStyle = props.containerStyle ?? {height:48, width: dynamicWidth};
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
            listItemLabelStyle={labelStyle}
            selectedItemLabelStyle={labelStyle}
            listItemContainerStyle={styles.listItemContainerStyle}
            listChildLabelStyle={labelStyle}
            disableBorderRadius={false}
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
        maxHeight : 200,
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
        fontSize : 16,
        fontFamily : Fonts.medium,
        paddingVertical : 4,
        paddingHorizontal : 6,
        flexWrap : 'wrap',
        flexShrink : 1,
        textAlign : 'left',
        lineHeight : 20,
        width : '90%',
    },
    listItemContainerStyle : {
        minHeight : 60,
        justifyContent : 'center',
        paddingHorizontal : 8,
        paddingVertical : 4,
        flexDirection : 'row',
        alignItems : 'center',
        flexWrap : 'wrap',
    }
})