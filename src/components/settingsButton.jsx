import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, Pressable, Linking } from 'react-native';
import { ArrowRightIcon } from '../constants/svgs';
import { useNavigation } from '@react-navigation/native';
import { Switch } from 'react-native-switch';
import { colors, fontFamily } from '../constants';
import ArrowIcon from '../assets/icons/ArrowIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsButton = ({ title, showRadioButton, navString }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const navigation = useNavigation();
  const handleNavigation = () => {
    if (title === 'Log Out') {
      AsyncStorage.clear();
      navigation.navigate('Login');
    }
    else if (title === 'Edit Profile') {
      navigation.navigate('EditProfile', {
        comingFromSettings: true
      });
    }
    else if (navString) {
      if (navString === 'PrivacyPolicy') {
        Linking.openURL('https://almaxcollective.com/privacypolicy/')
      } else if (navString === 'TermsCondition') {
        Linking.openURL('https://almaxcollective.com/terms/')
      } else if (navString === 'CustomerSupport') {
        Linking.openURL('https://almaxcollective.com/general/')
      } else {
        navigation.navigate(navString);
      }
    } else {
      console.log('Navigation not added for this button');
    }
  };

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
  };
  return (
    <Pressable
      onPress={handleNavigation}
      style={[styles.container, { marginTop: 0 }]}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      {!showRadioButton ? <ArrowIcon /> : <View />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // borderRadius: 26,
    // backgroundColor: colors.white,
    borderBottomColor: colors.darkWhite,
    borderBottomWidth: 0.5,
    // display: "flex",
    // gap: 40,
    justifyContent: 'space-between',
    // paddingHorizontal: 13,
    shadowColor: 'rgba(22, 25, 102, 0.05)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 5,
    flexDirection: 'row',
    width: '90%',
    marginHorizontal: '5%',
    paddingVertical: 15,
  },
  titleContainer: {
    alignSelf: 'stretch',
    marginVertical: 'auto',
  },
  titleText: {
    color: colors.black,
    fontFamily: fontFamily.medium,
    fontSize: 17.01,
    fontWeight: '500',
    lineHeight: 25.5,
  },
  backIcon: {
    alignSelf: 'stretch',
    position: 'relative',
    display: 'flex',
    width: 16,
    aspectRatio: 1,
    marginVertical: 'auto',
  },
});

export default SettingsButton;
