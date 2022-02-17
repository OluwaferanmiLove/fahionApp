import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View, StatusBar, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import CategoriesPill from '../../components/CategoriesPill';
import CategoryCard from '../../components/CategoryCard';
import StyleCard from '../../components/StyleCard';
import { colors } from '../../constants/colors';
import { categories, styleContent, stylesList } from '../../constants/mockData';
import { hp, wp } from '../../util/dimension';
import { generateColor } from '../../util/randomColor';
import ImageListCarousel from './components/ImageListCarousel';
import ImageView from "react-native-image-viewing";

let statusBarHeight = Platform.select({ios: hp(45), android: StatusBar.currentHeight});
function Style({navigation}) {
  const [visible, setIsVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const handleViewImage = (index) => {
    setImageIndex(index);
    setIsVisible(true);
  }

  return (
    <View style={styles.main}>
      <StatusBar barStyle={'dark-content'} />
      <ScrollView style={{flex: 1}}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.backBtnContainer}>
              <Ionicons name={'arrow-back'} color={colors.secondaryDarker} size={wp(30)} />
            </View>
          </TouchableOpacity>
          <View style={{marginLeft: wp(15)}}>
            <Text style={styles.title}>Style Name</Text>
            <Text style={styles.description}>Style description.</Text>
          </View>
        </View>
        <View style={styles.sectionStyles}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={styleContent.pictures}
            scrollEnabled
            pagingEnabled
            snapToAlignment={'center'}
            scrollEventThrottle={20}
            keyExtractor={(item) => item.id}
            style={styles.slides}
            renderItem={({ item , index}) => (
              <ImageListCarousel
                image={item}
                onPress={() => handleViewImage(index)}
                // backgroundColor={generateColor()}
              />
            )}
          />
        </View>
        <View  style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Similar categories</Text>
          <Text style={styles.sectionSubTitle}>Other related categories</Text>
          <View style={styles.similarCategories}>
            {styleContent.similarCategories.map((item) => (
              <CategoriesPill backgroundColor={generateColor()} category={item} marginTop={hp(15)} />
            ))}
          </View>
        </View>
      </ScrollView>
      <ImageView
        images={styleContent.pictures}
        imageIndex={imageIndex}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
        swipeToCloseEnabled={false}
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  main: {
    flex: 1,
    // height: hp(812),
    width: wp(375),
    backgroundColor: colors.mainBg
  },
  header: {
    // position: 'absolute',
    bottom: hp(0),
    zIndex: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: hp(55),
    paddingHorizontal: wp(20),
    width: wp(375),
  },
  backBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: wp(45),
    width: wp(45),
    borderRadius: 9999,
    backgroundColor: colors.secondary
  },
  title: {
    fontFamily: 'ApparelDisplayBold',
    fontSize: hp(35),
    color: colors.primary,
  },
  description: {
    // fontFamily: 'ApparelDisplayBold',
    fontSize: hp(16),
    color: colors.secondaryDarker,
    marginTop: hp(4)
  },
  sectionStyles: {
    marginTop: hp(20),
    paddingHorizontal: wp(20),
  },
  sectionTitleContainer: {
    marginTop: hp(20),
    marginHorizontal: wp(20),
    marginBottom: hp(16),
  },
  sectionTitle: {
    fontFamily: 'ApparelDisplayBold',
    fontSize: hp(22),
    color: colors.primaryLighter,
  },
  sectionSubTitle: {
    // fontFamily: 'ApparelDisplayBold',
    fontSize: hp(16),
    color: colors.primaryLighter,
  },
  similarCategories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  slides: {
    // overflow: 'hidden',
    borderRadius: wp(8),
    // marginTop: hp(10),
    // marginHorizontal: wp(20),
  },
})

export default Style;