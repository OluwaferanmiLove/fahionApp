import React, {useContext, useEffect, useState} from 'react';
import { Platform, StyleSheet, Text, View, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
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
import SectionCard from './components/SectionCard';
import { collection, getFirestore, getDocs, doc, onSnapshot, query } from 'firebase/firestore';

let statusBarHeight = Platform.select({ios: hp(45), android: StatusBar.currentHeight});
function AdminDashboard({navigation}) {
  const [categoryLength, setCategoryLength] = useState(0);
  const [styleLength, setStyleLength] = useState(0);
  const {dispatch} = useContext(AppContext);

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
      setCategoryLength(data.length);
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
      setStyleLength(data.length);
    },
    (error) => {
      console.log(error.message);
    });
    
    return () => unsubscribe();
  }, []);

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
            <Text style={styles.description}>Welcome back admin name.</Text>
            <Text style={styles.title}>Admin Dashboard</Text>
          </View>
          <TouchableOpacity onPress={handleLogOut}>
            <Text style={{fontSize: wp(18), color: colors.primaryLighter}}>Logout</Text>
          </TouchableOpacity>
          {/* <Text style={styles.description}>Welcome to Jummy Fashion House, browse through for the best fashion collection</Text> */}
        </View>
        <View style={styles.sectionStyle}>
          <SectionCard
            number={categoryLength}
            title={'Categories'}
            onPress={() => navigation.navigate('AdminCategories')} />
          <SectionCard
            number={styleLength}
            title={'Styles'}
            onPress={() => navigation.navigate('AllStyles')} />
          {/* <SectionCard marginTop={hp(20)} number={'5'} title={'Admin'}/>
          <SectionCard marginTop={hp(20)} /> */}
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: hp(35),
    marginHorizontal: wp(20),
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

export default AdminDashboard;