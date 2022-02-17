import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../constants/colors';
import { hp, wp } from '../util/dimension';

function Button({
  title,
  loading = false,
  outlined = false,
  onPress,
  style,
  width = wp(320),
  height = hp(48),
  borderRadius = wp(6),
  fontSize = wp(16),
  fontWeight = '500',
  disabled,
}) {
  const backgroundColor = outlined ? '#ffffff00' : disabled ? colors.grey : colors.secondary;
  const titleColor = outlined ? '#ffffff' :  disabled ? colors.secondary : colors.primary;
  const borderWidth = outlined ? wp(1) : 0;

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled ? disabled : loading}>
      <View style={[styles.main, { backgroundColor, borderWidth, width, height, borderRadius }, style]}>
        {loading ? (
          <ActivityIndicator size={'large'} color={colors.text.black} />
        ) : (
          <Text style={[styles.title, { color: titleColor, fontWeight, fontSize }]}>
            {title}
          </Text>  
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  main: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.secondary,
  },
  title: {
    fontFamily: 'ApparelDisplayBold',
    fontSize: wp(20),
  }
})

export default React.memo(Button);
