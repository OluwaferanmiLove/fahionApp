import React, { useContext } from 'react';
import {Platform, Text} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  AdminCategories,
  AdminDashboard,
  AdminLogin,
  AllStyles,
  Categories,
  Category,
  Home,
  Login,
  OnBoarding,
  SavedStyles,
  Signup,
  Style
} from '../screens';
import { AntDesign, Foundation, Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { fontFamily } from '../constants/fontFamily';
import { hp, wp } from '../util/dimension';
import AdminNav from './AdminNav';
import { AppContext } from '../context/AppContext';

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const HomeTab = createBottomTabNavigator();

const AuthNav = () => {
  const {state} = useContext(AppContext);

  return (
    <AuthStack.Navigator screenOptions={{
      headerShown: false,
      cardStyle: {
        backgroundColor: colors.mainBg
      }
    }}>
      {!state.loggedin ? (
        <>
          <AuthStack.Screen component={Login} name={'Login'} />
          <AuthStack.Screen component={Signup} name={'Signup'} />
        </>
      ) : state.user.userType === 'admin' ? (
        <>
          <AuthStack.Screen component={AdminNav} name={'AdminNav'} />
        </>
      ) : (
        <>
          <AuthStack.Screen component={SavedStyles} name={'SavedStyles'} />
          <AuthStack.Screen component={AllStyles} name={'AllStyles'} />
        </>
      )}
    </AuthStack.Navigator>
  )
}

const HomeNav = () => {
  return (
    <HomeTab.Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarLabel: ({focused, color}) => (
        <Text>Test</Text>
      ),
      tabBarLabelStyle: {
        fontFamily: fontFamily.ApparelDisplayBold,
        fontSize: hp(14)
      },
      tabBarStyle: {
        // position: 'absolute',
        // paddingBottom: hp(0),
        // marginBottom: hp(20),
        // borderRadius: wp(30),
        // marginHorizontal: wp(15),
        backgroundColor: colors.mainBg,
        borderTopRightRadius: wp(30),
        borderTopLeftRadius: wp(30),
        height: Platform.select({android: hp(65), ios: hp(78)}),
        // paddingTop: hp(10),
        shadowColor: colors.secondaryDarker,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        borderTopWidth: 0,
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 9,
      }
    }}>
      <HomeTab.Screen component={Home} name={'Home'} options={{
        tabBarIcon: ({focused, color, size}) => {
          if (focused) {
            return <Foundation name={'home'} size={28} color={colors.primary} />
          } else {
            return <AntDesign name={'home'} size={28} color={colors.secondary} />
          }
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondary,
      }} />
      <HomeTab.Screen component={AuthNav} name={'AuthNav'} options={{
        tabBarIcon: ({focused, color, size}) => (
          // <Ionicons name={focused ? 'ios-person' : 'ios-person-outline'} size={26} color={focused ? colors.primary : colors.secondary} />
          <Ionicons name={focused ? 'bookmarks' : 'bookmarks-outline'} size={26} color={focused ? colors.primary : colors.secondary} />
        )
      }} />
      {/* <HomeTab.Screen component={AdminNav} name={'AdminNav'} options={{
        tabBarIcon: ({focused, color, size}) => (
          <Ionicons name={focused ? 'bookmarks' : 'bookmarks-outline'} size={26} color={focused ? colors.primary : colors.secondary} />
        )
      }} /> */}
    </HomeTab.Navigator>
  )
}

export default function UserNav() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: colors.mainBg
        }
      }}>
        <Stack.Screen component={OnBoarding} name={'OnBoarding'} />
        <Stack.Screen component={HomeNav} name={"HomeNav"} />
        <Stack.Screen component={Categories} name={'Categories'} />
        <Stack.Screen component={AdminCategories} name={'AdminCategories'} />
        <Stack.Screen component={Category} name={'Category'} />
        <Stack.Screen component={Style} name={'Style'} />
        <Stack.Screen component={AllStyles} name={'AllStyles'} />
        <Stack.Screen component={AdminNav} name={'AdminNav'} />
    </Stack.Navigator>
  );
}
