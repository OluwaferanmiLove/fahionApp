import React from 'react';
import {View, FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { onBoardingData } from '../../constants/mockData';
import { hp, wp } from '../../util/dimension';
import OnboardingView from './components/OnboardingView';
import { colors } from '../../constants/colors';
import Button from '../../components/Button';

function OnBoarding({navigation}) {
  const onboardingRef = React.useRef(null);

  return (
    <View style={styles.main}>
      <StatusBar style={'inverted'} />
      <FlatList
        ref={onboardingRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={onBoardingData}
        scrollEnabled
        pagingEnabled
        snapToAlignment={'center'}
        // onEndReached={() => setOnboardingIndex(2)}
        scrollEventThrottle={20}
        keyExtractor={(item) => item.id}
        style={styles.content}
        renderItem={({ item }) => (
          <OnboardingView title={item.title} description={item.description} image={item.image} />
        )}
      />
      <View style={styles.floatingButton}>
        <Button title={'Get Started'} onPress={() => navigation.navigate('HomeNav')} />
        <View style={{marginTop: hp(10)}}>
          <TouchableOpacity onPress={() => navigation.navigate('AdminLogin')}>
            <Text
              style={{color: colors.secondary, fontSize: wp(16), fontWeight: 'bold'}}>
                Are you an Admin, Login here
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles=StyleSheet.create({
  main: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  floatingButton: {
    width: wp(375),
    alignItems: 'center',
    // marginHorizontal: wp(20),
    position: 'absolute',
    bottom: hp(60)
  }
})

export default OnBoarding;