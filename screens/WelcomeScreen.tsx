import React from 'react';
import { View, Text } from 'react-native';
import {StackScreenProps} from "@react-navigation/stack";
import {AuthStackParamList} from "../navigation/AuthStack";

type WelcomeScreenProps = StackScreenProps<AuthStackParamList, 'Welcome'>;

export default function WelcomeScreen(navigation: WelcomeScreenProps) {
  return (
    <View>
      <Text>Welome Screen</Text>
    </View>
  );
}