import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import OnBoardingBG from '../../../components/onboardingBG';
import {OnBoardingData} from '../../../constants/staticData';

const OnBoarding = ({navigation}) => {
  return (
    <SafeAreaView>
      <OnBoardingBG navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default OnBoarding;
