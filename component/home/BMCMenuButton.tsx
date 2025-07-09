import React, { useState } from 'react';
import { Menu } from 'react-native-paper';
import DotMenuIcon from "../../assets/icons/dot-menu.svg";
import { TouchableOpacity } from "react-native";
import { Colors } from "../../constants/Color";
import {Fonts} from "../../constants/Fonts";
import DeleteIcon from "../../assets/icons/delete.svg"

type BMCMenuButtonProps = {
    onDelete: () => void;
};

export function BMCMenuButton({ onDelete }: BMCMenuButtonProps) {
    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    return (
        <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchorPosition="bottom"
            contentStyle={{
                transform: [{ translateY: -90 }],
                alignSelf: 'flex-end',
                paddingVertical: 0,
                backgroundColor: Colors.gray4,
                elevation: 0,
                shadowColor: 'transparent',
                borderRadius: 12,
                width: 120,
        }}
            anchor={
                <TouchableOpacity onPress={openMenu}>
                    <DotMenuIcon width={16} height={16} color={Colors.gray2} />
                </TouchableOpacity>
            }
        >
            <Menu.Item
                onPress={() => {
                    closeMenu();
                    onDelete();
                }}
                title="삭제"
                titleStyle={{ fontFamily: Fonts.medium, color: Colors.error }}
                style={{ backgroundColor: Colors.gray4 }}
                leadingIcon={() => <DeleteIcon width={20} height={20} color={Colors.error} style={{ marginTop: 2 }}/>}
            />
        </Menu>
    );
}
