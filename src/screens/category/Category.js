import { Ionicons } from '@expo/vector-icons';
import React, {useState, useEffect} from 'react';
import { Platform, StyleSheet, Text, View, StatusBar, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import CategoriesPill from '../../components/CategoriesPill';
import CategoryCard from '../../components/CategoryCard';
import StyleCard from '../../components/StyleCard';
import { colors } from '../../constants/colors';
import { categories, stylesList } from '../../constants/mockData';
import { hp, wp } from '../../util/dimension';
import { generateColor } from '../../util/randomColor';
import { collection, getFirestore, getDocs, doc, onSnapshot, query } from 'firebase/firestore';

let statusBarHeight = Platform.select({ios: hp(45), android: StatusBar.currentHeight});
function Category({navigation, route}) {
  const [data, setData] = useState([]);
  const categoryInfo = route.params;

  const db = getFirestore();

  const dbRef = collection(db, 'styles');

  useEffect(() => {
    const q = query(dbRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
          data.push(doc.data());
      });

      const newData = data.filter((item) => {
        return item.categoryName = categoryInfo?.categoryName
      })
      setData(newData);
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
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.backBtnContainer}>
              <Ionicons name={'arrow-back'} color={colors.secondaryDarker} size={wp(30)} />
            </View>
          </TouchableOpacity>
          <View style={{marginLeft: wp(15), flex: 1}}>
            <Text style={styles.title}>{categoryInfo.categoryName}</Text>
            <Text style={styles.description}>{categoryInfo.categoryDescription}</Text>
          </View>
        </View>
        <View style={styles.sectionStyle}>
          {/* <View  style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>Your Saved Styles</Text>
            <Text style={styles.sectionSubTitle}>Browse your saved styles</Text>
          </View> */}
            <View style={styles.content}>
              {data.map((item, index) => (
                <StyleCard
                  marginTop={index % 2 !== 0 ? hp(25) : hp(0) }
                  // marginTop={index === 1 || index === 0 ? hp(0) : hp(25) }
                  key={item.styleName}
                  title={item.styleName}
                  category={item.styleDescription}
                  image={{uri: item.image}}
                  onPress={() => navigation.navigate('Style', item)}
                  onPressHeart={() => {}}
                  // backgroundColor={generateColor()}
                />
              ))}
            </View>
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

export default Category;