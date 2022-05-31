import React, {useContext} from 'react';
import { Platform, StyleSheet, Text, View, StatusBar, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import CategoriesPill from '../../components/CategoriesPill';
import CategoryCard from '../../components/CategoryCard';
import StyleCard from '../../components/StyleCard';
import { colors } from '../../constants/colors';
import { categories, stylesList } from '../../constants/mockData';
import { logout } from '../../context/action';
import { AppContext } from '../../context/AppContext';
import { hp, wp } from '../../util/dimension';
import { generateColor } from '../../util/randomColor';
import { deleteFromStorage } from '../../util/storageUtil';

let statusBarHeight = Platform.select({ios: hp(45), android: StatusBar.currentHeight});
function SavedStyles() {
  const {dispatch} = useContext(AppContext);

  const handleLogOut = () => {
    deleteFromStorage('userData')
      .then((response) => {
        dispatch(logout())
        // dispatch(resetState())
      })
  }

  return (
    <View style={styles.main}>
      <StatusBar barStyle={'dark-content'} />
      <ScrollView style={{flex: 1}}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Your Saved Styles</Text>
            <Text style={styles.description}>Your personal saved styles.</Text>
          </View>
          <TouchableOpacity onPress={handleLogOut}>
            <Text style={{fontSize: wp(18), color: colors.primaryLighter}}>Logout</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.categoriesCarousel}>
          <View  style={styles.sectionTitleContainer}>
            {/* <Text style={styles.sectionTitle}>Filter your styles</Text> */}
            <Text style={styles.sectionSubTitle}>Filter your styles</Text>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            scrollEnabled
            snapToAlignment={'center'}
            scrollEventThrottle={20}
            keyExtractor={(item) => item.id}
            // style={styles.content}
            renderItem={({ item , index}) => (
              <CategoriesPill index={index} category={item.category} backgroundColor={generateColor()} />
            )}
          />
        </View>
        <View style={styles.sectionStyle}>
          <View  style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>Your Saved Styles</Text>
            <Text style={styles.sectionSubTitle}>Browse your saved styles</Text>
          </View>
            <View style={styles.content}>
              {stylesList.map((item, index) => (
                <StyleCard
                  marginTop={index % 2 !== 0 ? hp(25) : hp(0) }
                  // marginTop={index === 1 || index === 0 ? hp(0) : hp(25) }
                  key={item.id}
                  title={item.title}
                  category={item.description}
                  image={item.image}
                  onPressHeart={() => {}}
                  // backgroundColor={generateColor()}
                />
              ))}
            </View>
          {/* <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={stylesList}
            scrollEnabled
            snapToAlignment={'center'}
            scrollEventThrottle={20}
            keyExtractor={(item) => item.id}
            style={styles.slides}
            renderItem={({ item , index}) => (
              <StyleCard
                index={index}
                title={item.title}
                category={item.description}
                image={item.image}
                onPressHeart={() => {}}
                // backgroundColor={generateColor()}
              />
            )}
          /> */}
        </View>
      </ScrollView>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: hp(55),
    paddingHorizontal: wp(20),
    width: wp(375),
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
  categoriesCarousel: {
    marginTop: hp(20),
    // marginHorizontal: wp(20),
  },
  sectionStyle: {
    marginTop: hp(35)
  },
  sectionTitleContainer: {
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
  slides: {
    marginTop: hp(10),
    // marginHorizontal: wp(20),
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginHorizontal: wp(20),
    paddingBottom: hp(25),
    // backgroundColor: 'red'
  }
})

export default SavedStyles;