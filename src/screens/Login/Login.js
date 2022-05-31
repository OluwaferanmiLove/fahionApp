import { Ionicons } from '@expo/vector-icons';
import React, { useContext, useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  FlatList,
  TouchableOpacity
} from 'react-native';
import Button from '../../components/Button';
import CategoriesPill from '../../components/CategoriesPill';
import CategoryCard from '../../components/CategoryCard';
import Input from '../../components/Input';
import StyleCard from '../../components/StyleCard';
import { colors } from '../../constants/colors';
import { categories, stylesList } from '../../constants/mockData';
import { login } from '../../context/action';
import { AppContext } from '../../context/AppContext';
import { hp, wp } from '../../util/dimension';
import { generateColor } from '../../util/randomColor';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDocs, getFirestore, collection, getDoc } from 'firebase/firestore';
import { useToast } from 'react-native-toast-notifications'
import { saveToStorage } from '../../util/storageUtil';

let statusBarHeight = Platform.select({ios: hp(45), android: StatusBar.currentHeight});
function Login({navigation}) {
  const [email, setEmail] = useState(null);
  const [password, setPassWord] = useState(null);
  const [loading, setLoading] = useState(false);

  const {state, dispatch} = useContext(AppContext);

  const auth = getAuth();
  const db = getFirestore();
  // const userRef = collection(db, 'users')
  const userRef = collection(db, 'users')

  const toast = useToast()

  const handleLogin = async () => {
    try {
      setLoading(true);

      if(email === null) {
        toast.show('Email cannot be empty, please enter your email')
        setLoading(false);
        return;
      }

      if(password === null) {
        toast.show('Please enter password');
        setLoading(false);
        return;
      }

      //signin with firebase
      let loginRequest = await signInWithEmailAndPassword(auth, email, password);
      const userRef = doc(db, 'users', loginRequest.user.uid);

      //get user data in firestore
      let userInfo = await getDoc(userRef);
      toast.show('Login successfull');
      dispatch(login(userInfo.data()));
      saveToStorage('userData', JSON.stringify(userInfo.data()));
      setLoading(false);
    } catch (e) {
      toast.show(e.message)
      console.log(e.message)
      setLoading(false)
    }


    // signInWithEmailAndPassword(auth, email, password)
    // .then((response) => {
    //   toast.show('Login successfull')
    //   // getDocs(userRef, response.user.uid)
    //   const userRef = doc(db, 'users', response.user.uid)
    //   getDoc(userRef)
    //   .then(docSnap => {
    //     console.log(docSnap.data())
    //     setLoading(false)
    //   })
    //   .catch(error => {
    //     console.log(error.message)
    //     setLoading(false)
    //   })
    // })
    // .catch((error) => {
    //   toast.show(error.message)
    //   console.log(error.message)
    //   setLoading(false)
    // })
  }

  return (
    <View style={styles.main}>
      <StatusBar barStyle={'dark-content'} />
      <ScrollView style={{flex: 1}}>
        <View style={styles.header}>
          {/* <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.backBtnContainer}>
              <Ionicons name={'arrow-back'} color={colors.secondaryDarker} size={wp(30)} />
            </View>
          </TouchableOpacity> */}
          <View>
            <Text style={styles.title}>Login</Text>
            <Text style={styles.description}>Login to access your personal space.</Text>
          </View>
        </View>
        <View style={styles.mainContent}>
          <Input
            label={'Email'}
            placeholder={'Email'}
            keyboardType={'email-address'}
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            label={'Password'}
            marginTop={hp(26)}
            placeholder={'**********'}
            secureTextEntry
            onChangeText={(text) => setPassWord(text)}
          />
          <Button
            marginTop={hp(40)}
            dark height={hp(50)}
            loading={loading}
            title={'Login'}
            onPress={() => handleLogin()}
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
  mainContent: {
    marginTop: hp(170),
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
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginHorizontal: wp(40),
    paddingBottom: hp(25),
    // backgroundColor: 'red'
  }
})

export default Login;