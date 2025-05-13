import React from 'react';
import { View, Text, Button } from 'react-native';
import {StackScreenProps} from "@react-navigation/stack";
import { RootStackParamList } from '../navigation/RootStack';

type WelcomeScreenProps = StackScreenProps<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen(navigation: WelcomeScreenProps) {
  return (
    <View>
      <Text>Welcome Screen</Text>
    </View>
  );
}