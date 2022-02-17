import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../constants/colors';
import { hp, wp } from '../../../util/dimension';

function ImageListCarousel({onPress, image}) {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={[styles.main]}>
        <View  style={styles.imageContainer}>
          <Image source={image} style={styles.image} />
          <LinearGradient colors={['#3E2A1Daa', '#3E2A1D50']} end={{ x: 0.5, y: 0.78 }} style={[styles.image, {position: 'absolute'}]}/>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    // marginRight: wp(20),
    // height: hp(220),
    overflow: 'hidden',
    // borderRadius: wp(8),
    width: wp(375)  - wp(40),
    paddingHorizontal: wp(20),
    
  },
  imageContainer: {
    height: hp(450),
    width: wp(375) - wp(40),
    backgroundColor: colors.secondary,
  },
  image: {
    height: hp(450),
    width: wp(375) - wp(40),
    resizeMode: 'cover',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: hp(5)
  },
  title: {
    fontFamily: 'ApparelDisplayBold',
    fontSize: hp(18),
    color: colors.primary,
  },
  category: {
    // fontFamily: 'ApparelDisplayBold',
    textAlign: 'center',
    fontSize: hp(14),
    color: colors.secondaryDarker,
  },
})

export default ImageListCarousel;