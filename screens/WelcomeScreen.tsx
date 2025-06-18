import React, {useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet, Dimensions, Image, StatusBar} from 'react-native';
import {StackScreenProps} from "@react-navigation/stack";
import {AuthStackParamList} from "../navigation/AuthStack";
import {Colors} from "../constants/Color";
import Carousel from "react-native-reanimated-carousel";
import CommonButton from "../component/CommonButton";
import { useDisabled } from '../hooks/util/useDisabled';
import { Fonts } from '../constants/Fonts';

const { width } = Dimensions.get('window');

//나중에 변경예정
const images = [
    require('../assets/images/slide.png'),
    require('../assets/images/slide.png'),
    require('../assets/images/slide.png')
];

type WelcomeScreenProps = StackScreenProps<AuthStackParamList, 'Welcome'>;

export default function WelcomeScreen({navigation}: WelcomeScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { disabled } = useDisabled()
  return (
      <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor={Colors.white1}/>
          <Text style={styles.headText}>
              Start
              <Text style={[styles.headText, {color : Colors.primary}]}>
                  Hub</Text>에 {"\n"} 오신것을
              <Text style={[styles.headText, {color : Colors.primary}]}>
               {' 환영'}
              </Text>
              합니다
          </Text>
          <View style={styles.bodyContent}>
              <Carousel
                autoPlay={true}
                autoPlayInterval={3000}
                  loop={true}
                  data={images}
                  renderItem={({ item }) => (
                      <View style={styles.item}>
                          <Image source={item} style={styles.image} resizeMode='cover' />
                      </View>
                  )}
                  mode="parallax"
                  width={240}
                  modeConfig={{
                      parallaxScrollingScale: 0.9,
                      parallaxScrollingOffset: 16,
                  }}
                  style={[{ justifyContent: 'center'},{width: width},{flex: 1} ]}
                  defaultIndex={0}
                  overscrollEnabled={true}
                  onProgressChange={(progress) => {
                      if (progress ===  0|| progress < -600) {
                          setCurrentIndex(0);
                      }
                      else {
                          const index = Math.abs(Math.round(progress / 240));
                          setCurrentIndex(index);
                      }
                  }
              }
              />
              <View style={styles.indicatorContainer}>
                  {images.map((_, index) => (
                      <View
                          key={index}
                          style={[
                              styles.indicator,
                              currentIndex === index && styles.activeIndicator,
                          ]}
                      />
                  ))}
              </View>
          </View>
          <View style={styles.bottomButton}>
              <CommonButton disabled={disabled} title={'StartHub 시작하기'} onPress={() => navigation.navigate('Start')}/>
          </View>
          <StatusBar barStyle="dark-content" backgroundColor={Colors.white1}/>
      </SafeAreaView>
  );
}
const styles = StyleSheet.create({
    container : {
        flex : 1,
        flexDirection : 'column',
    },
    headText : {
        marginTop : 60,
        fontSize : 24,
        fontFamily : Fonts.bold,
        textAlign : 'center'
    },
    bodyContent : {
        paddingTop : 30,
        paddingBottom : 60,
        flex : 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        backgroundColor: Colors.black1,
        width: 240,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        borderRadius: 8,
        width: '100%',
        height: '100%',
    },
    bottomButton : {
        margin : 16,
        marginTop : 0,
    },
    indicatorContainer: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    indicator: {
        width: 12,
        height: 12,
        borderRadius: 10,
        backgroundColor: Colors.gray3,
        marginHorizontal: 4,
    },
    activeIndicator: {
        width: 12,
        height: 12,
        borderRadius: 10,
        backgroundColor: Colors.primary,
        marginHorizontal: 4,
    },
})