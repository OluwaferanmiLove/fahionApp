import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../constants/colors';
import { hp, wp } from '../../../util/dimension';

function SectionCard({
  marginTop,
  onPress,
  marginLeft,
  marginRight,
  number,
  title
}) {
  return (
    <TouchableOpacity onPress={onPress} style={[{marginTop}]}>
      <View style={[styles.main, {marginLeft, marginRight}]}>
        <Text style={styles.number}>{number}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  main: {
    position: 'relative',
    justifyContent: 'center',
    // alignItems: 'center',
    paddingLeft: wp(15),
    height: hp(150),
    width: wp(155),
    borderRadius: wp(10),
    backgroundColor: colors.secondary,
  },
  number: {
    fontFamily: 'ApparelDisplayBold',
    fontSize: hp(50),
    color: colors.primary,
  },
  title: {
    fontFamily: 'ApparelDisplayBold',
    fontSize: hp(18),
    color: colors.primary,
  },
})

export default SectionCard;