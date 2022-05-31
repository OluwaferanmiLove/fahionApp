import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
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
function Style({navigation, route}) {
  const [visible, setIsVisible] = useState(false);
  const [images, setImages] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);

  const styleInfo = route.params;
  // console.log(styleInfo.images);

  const handleViewImage = (index) => {
    setImageIndex(index);
    setIsVisible(true);
  }

  useEffect(() => {
    let newImageArray = styleInfo.images.map((item) => (
      {uri: item}
    ))

    setImages(newImageArray);
  }, [])

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
          <View style={{marginLeft: wp(15), flex: 1}}>
            <Text style={styles.title}>{styleInfo.styleName}</Text>
            <Text style={styles.description}>{styleInfo.styleDescription}</Text>
          </View>
        </View>
        <View style={styles.sectionStyles}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={images}
            scrollEnabled
            pagingEnabled
            snapToAlignment={'center'}
            scrollEventThrottle={20}
            keyExtractor={(item) => item.id}
            style={styles.slides}
            renderItem={({ item , index}) => (
              <ImageListCarousel
                image={{uri: item.uri}}
                onPress={() => handleViewImage(index)}
                // backgroundColor={generateColor()}
              />
            )}
          />
        </View>
        <View  style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Category</Text>
          <Text style={styles.sectionSubTitle}>Category of the style</Text>
          <View style={styles.similarCategories}>
            <CategoriesPill backgroundColor={generateColor()} category={styleInfo.category.categoryName} marginTop={hp(15)} />
            {/* {styleContent.similarCategories.map((item) => (
              <CategoriesPill backgroundColor={generateColor()} category={item} marginTop={hp(15)} />
            ))} */}
          </View>
        </View>
      </ScrollView>
      <ImageView
        images={images}
        // imageIndex={imageIndex}
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
    // alignItems: 'center',
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