import React, {useContext, useState, useEffect} from 'react';
import { Platform, StyleSheet, Text, View, StatusBar, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import CategoriesPill from '../../components/CategoriesPill';
import CategoryCard from '../../components/CategoryCard';
import SectionHeaders from '../../components/SectionHeaders';
import StyleCard from '../../components/StyleCard';
import { colors } from '../../constants/colors';
import { categories, stylesList } from '../../constants/mockData';
import { logout } from '../../context/action';
import { AppContext } from '../../context/AppContext';
import { hp, wp } from '../../util/dimension';
import { generateColor } from '../../util/randomColor';
import { deleteFromStorage } from '../../util/storageUtil';
import { collection, getFirestore, onSnapshot, query } from 'firebase/firestore';

let statusBarHeight = Platform.select({ios: hp(45), android: StatusBar.currentHeight});
function Home({navigation}) {
  const {state} = useContext(AppContext);
  const [categoriesData, setCategoriesData] = useState([]);
  const [styleData, setStyleData] = useState([]);

  const db = getFirestore();

  const dbRefCategories = collection(db, 'categories');
  const dbRefStyles = collection(db, 'styles');

  useEffect(() => {
    const q = query(dbRefCategories);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
          data.push(doc.data());
      });
      setCategoriesData(data);
    },
    (error) => {
      console.log(error.message);
    });
    
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(dbRefStyles);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
          data.push(doc.data());
      });
      setStyleData(data);
    },
    (error) => {
      console.log(error.message);
    });
    
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.main}>
      <StatusBar barStyle={'dark-content'} />
      <ScrollView style={{flex: 1}}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Jummy Fashion Home</Text>
            <Text style={styles.description}>Welcome to Jummy Fashion House.</Text>
          </View>
          {/* <Text style={styles.description}>Welcome to Jummy Fashion House, browse through for the best fashion collection</Text> */}
        </View>
        <View style={styles.categoriesCarousel}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categoriesData}
            scrollEnabled
            snapToAlignment={'center'}
            scrollEventThrottle={20}
            keyExtractor={(item) => item.id}
            // style={styles.content}
            renderItem={({ item , index}) => (
              <CategoriesPill
                index={index}
                category={item.categoryName}
                backgroundColor={generateColor()} />
            )}
          />
        </View>
        {/* {state.user.userType !== 'admin' && 
        <View style={styles.sectionStyle}>
          <SectionHeaders
            title={'Your Saved Styles'}
            subTitle={'Browse your saved styles'}
            actionTitle={'See All'}
            backgroundColor={generateColor()}
            onPressAction={() => navigation.navigate('SavedStyles')}
          />
          <FlatList
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
                marginLeft={index === 0 ? wp(20) : 0}
                marginRight={wp(20)}
                title={item.title}
                category={item.description}
                image={item.image}
                onPress={() => navigation.navigate('Style')}
                onPressHeart={() => {}}
                // backgroundColor={generateColor()}
              />
            )}
          />
        </View>} */}
        <View style={styles.sectionStyle}>
          <SectionHeaders
            title={'Categories'}
            subTitle={'Browse style categories.'}
            actionTitle={'See All'}
            onPressAction={() => navigation.navigate('AdminCategories')}
            backgroundColor={generateColor()}
          />
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categoriesData}
            scrollEnabled
            snapToAlignment={'center'}
            scrollEventThrottle={20}
            keyExtractor={(item) => item.id}
            style={styles.slides}
            renderItem={({ item , index}) => (
              <CategoryCard
                marginLeft={index === 0 ? wp(20) : 0}
                marginRight={wp(20)}
                category={item.categoryName}
                image={{uri: item.cover}}
                onPress={() => navigation.navigate('Category', item)}
              />
            )}
          />
        </View>
        <View style={[styles.sectionStyle, {paddingBottom: hp(25)}]}>
          <SectionHeaders
            title={'Styles'}
            subTitle={'Browse popular styles right now.'}
            actionTitle={'See All'}
            onPressAction={() => navigation.navigate('AllStyles')}
            backgroundColor={generateColor()}
          />
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={styleData}
            scrollEnabled
            snapToAlignment={'center'}
            scrollEventThrottle={20}
            keyExtractor={(item) => item.id}
            style={styles.slides}
            renderItem={({ item , index}) => (
              <StyleCard
                index={index}
                marginLeft={index === 0 ? wp(20) : 0}
                marginRight={wp(20)}
                title={item.styleName}
                category={item.styleDescription}
                image={{uri: item.image}}
                // onPressHeart={() => {}}
                onPress={() => navigation.navigate('Style', item)}
                // backgroundColor={generateColor()}
              />
            )}
          />
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
    fontSize: hp(30),
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
})

export default Home;