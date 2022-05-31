import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../constants/colors';
import { hp, wp } from '../util/dimension';

function CategoryCard({marginTop, onPress, disabled, marginLeft, marginRight, image, category, onPressHeart, saved}) {
  return (
    <TouchableOpacity onPress={onPress} style={{marginTop}} disabled={disabled}>
      <View style={[styles.main, {marginLeft, marginRight}]}>
        <View  style={styles.imageContainer}>
          <Image source={image} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <Text
            style={styles.title}
            numberOfLines={1}
            ellipsizeMode={'tail'}>
              {category}
            </Text>
          {/* <Text
            style={styles.category}
            numberOfLines={1}
            ellipsizeMode={'tail'}>{category}
          </Text> */}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  main: {
    position: 'relative',
    alignItems: 'center',
    // height: hp(220),
    width: wp(125),
  },
  imageContainer: {
    overflow: 'hidden',
    borderRadius: wp(9999),
    height: wp(125),
    width: wp(125),
    backgroundColor: colors.secondary,
  },
  image: {
    height: wp(125),
    width: wp(125),
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

export default CategoryCard;