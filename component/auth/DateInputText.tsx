import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BottomArrow from "../../assets/icons/bottom-arrow-back.svg"
import TopArrow from "../../assets/icons/top-arrow-back.svg"
import { Colors } from "../../constants/Color";
import { useMemo, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

type DateInputProps = {
    items : string[]
    placeholder : string
    text : string
    setText : (s : string) => void
}

export default function DateInputText(props : DateInputProps) {

    const items = props.items.map(item => ({ label: item, value: item }))
    const [open, setOpen] = useState(false)

    return (
        <View style={styles.mainContainer}>
            <DropDownPicker<string>
                open={open}
                value={props.text}
                setOpen={setOpen}
                setValue={(callback) => {
                    const newValue =
                        typeof callback === "function"
                        ? callback(props.text)
                        : callback;
                    if (newValue !== null) {
                        props.setText(newValue);
                    }
                }}
                items={items}
                placeholder={props.placeholder}
                listMode="SCROLLVIEW"
                searchable={true}
                searchPlaceholder=""
                disableLocalSearch={false}
                scrollViewProps={{
                    nestedScrollEnabled : true,
                    showsVerticalScrollIndicator : true
                }}
                searchTextInputProps={{
                    placeholder: props.placeholder,
                    placeholderTextColor: Colors.gray2,
                }}
                style={styles.picker}
                containerStyle={styles.pickerContainer}
                dropDownContainerStyle={styles.dropDownContainer}
                textStyle={styles.pickerText}
                placeholderStyle={styles.placeholderStyle}
                searchContainerStyle={styles.hiddenSearchContainer}
                searchTextInputStyle={styles.searchInput}
                listItemContainerStyle={styles.listItem}
                listItemLabelStyle={styles.listItemText}
                ArrowUpIconComponent={({style}) => (
                    <TopArrow
                        width={14} 
                        height={14} 
                        color={Colors.gray2} 
                        style={[style, styles.arrow]}
                    />
                )}
                ArrowDownIconComponent={({style}) => (
                    <BottomArrow
                        width={14}
                        height={14}
                        color={Colors.gray2}
                        style={[style, styles.arrow]}
                    />
                )}
                searchPlaceholderTextColor={Colors.gray2}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        minHeight: 48,
        position: 'relative',
    },
    pickerContainer: {
        flex: 1,
    },
    picker: {
        backgroundColor: Colors.white2,
        borderColor: Colors.white2,
        borderWidth: 0,
        borderRadius: 8,
        minHeight: 48,
        paddingHorizontal: 16,
        paddingVertical: 0,
        elevation: 0,
        shadowOpacity: 0,
    },
    dropDownContainer: {
        backgroundColor: Colors.white2,
        borderColor: Colors.white2,
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 2,
    },
    pickerText: {
        color: Colors.black2,
        fontSize: 16,
        fontWeight: '400',
    },
    placeholderStyle: {
        color: Colors.gray2,
        fontSize: 16,
        fontWeight: '400',
    },
    hiddenSearchContainer: {
        height: 0,
        opacity: 0,
        display: 'none',
    },
    searchInput: {
        backgroundColor: Colors.white2,
        borderColor: Colors.white2,
        color: Colors.black2,
        fontSize: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
    },
    listItem: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        minHeight: 44,
    },
    listItemText: {
        color: Colors.black2,
        fontSize: 16,
        fontWeight: '400',
    },
    selectedItem: {
        backgroundColor: Colors.white2,
    },
    selectedItemText: {
        color: Colors.primary || Colors.black2,
        fontWeight: '500',
    },
    arrow : {
        marginEnd : -4
    }
})