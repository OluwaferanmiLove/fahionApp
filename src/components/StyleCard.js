import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../constants/colors';
import { hp, wp } from '../util/dimension';

function StyleCard({marginTop, onPress, marginLeft, marginRight, image, title, category, onPressHeart, saved}) {
  return (
    <TouchableOpacity onPress={onPress} style={{marginTop}}>
      <View style={[styles.main, {marginLeft, marginRight}]}>
        <View  style={styles.imageContainer}>
          <Image source={image} style={styles.image} />
          <LinearGradient colors={['#3E2A1Daa', '#3E2A1D50']} end={{ x: 0.5, y: 0.78 }} style={[styles.image, {position: 'absolute'}]}/>
        </View>
        <View style={styles.textContainer}>
          <Text
            style={styles.title}
            numberOfLines={1}
            ellipsizeMode={'tail'}>
              {title}
            </Text>
          <Text
            style={styles.category}
            numberOfLines={1}
            ellipsizeMode={'tail'}>{category}</Text>
        </View>
        <View style={styles.heart}>
          <TouchableOpacity onPress={onPressHeart}>
            <Ionicons name={saved ? 'heart' : 'heart-outline'} size={hp(30)} color={colors.secondary} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  main: {
    position: 'relative',
    alignItems: 'center',
    // marginRight: wp(20),
    // height: hp(220),
    width: wp(155),
  },
  imageContainer: {
    overflow: 'hidden',
    borderRadius: wp(8),
    height: hp(220),
    width: wp(155),
    backgroundColor: colors.secondary,
  },
  image: {
    height: hp(220),
    width: wp(155),
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
  heart: {
    position: 'absolute',
    top: wp(10),
    right: wp(15),
  },
})

export default StyleCard;