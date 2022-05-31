import { Ionicons } from '@expo/vector-icons';
import React, { useContext } from 'react';
import { Platform, StyleSheet, Text, View, StatusBar, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import StyleCard from '../../components/StyleCard';
import { colors } from '../../constants/colors';
import { login } from '../../context/action';
import { AppContext } from '../../context/AppContext';
import { hp, wp } from '../../util/dimension';

let statusBarHeight = Platform.select({ios: hp(45), android: StatusBar.currentHeight});
function Signup({navigation}) {
  const {state, dispatch} = useContext(AppContext);

  const handleLogin = () => {
    dispatch(login({userType: 'admin'}))
    console.log(state)
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
          <View>
            <Text style={styles.title}>Sign up</Text>
            <Text style={styles.description}>Create account to access your personal space.</Text>
          </View>
        </View>
        <View style={styles.mainContent}>
          <Input label={'Email'} placeholder={'Email'} />
          <Input label={'Username'} placeholder={'Username'} />
          <Input label={'Password'} marginTop={hp(26)}  placeholder={'**********'} />
          <Button
            marginTop={hp(40)}
            dark height={hp(50)}
            title={'Signup'}
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

export default Signup;