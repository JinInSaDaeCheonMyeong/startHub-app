import React from "react";
import { Text, View } from "react-native";
import { AuthStackParamList } from "../navigation/AuthStack";
import { StackScreenProps } from "@react-navigation/stack";

type SigninScreenProps = StackScreenProps<AuthStackParamList, "Signin">

export default function SigninScreen(navigation : SigninScreenProps) {
    return (
        <View>
            <Text>Start Screen</Text>
        </View>
    )
}