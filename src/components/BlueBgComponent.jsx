import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from 'react-native';
import React from 'react';
import SuccessIconPlus from '../assets/icons/SuccessIconPlus';
import Button from './Button';
import {useNavigation} from '@react-navigation/native';
import {AlmaLogoImage, Checkcircle} from '../constants/svgs';
import {colors, fontFamily} from '../constants';
import {OnBoardingData} from '../constants/staticData';
import TickCircleIcon from '../assets/icons/tickCircle';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const BlueBgComponent = ({
  heading = 'Account created!',
  headStyles,
  description = 'Your account has been created successfully.',
  headingSize = 26,
  navigateTo = 'Plans',
  btnText = 'Continue',
  theme = 'blackWhite',
  size = 60,
  iconMTop = 52,
  isIcon = true,
  bottomTextColor,
  isbottomTextColor = false,
  icon = <TickCircleIcon />,
  bottomText,
  bottomButton,
  onPressBtn,
}) => {
  const nav = useNavigation();
  return (
    <ImageBackground
      // style={styles.container}
      // resizeMode='cover'
      source={require('../assets/images/OnB1.png')}>
      <View style={[styles.container, styles[`${theme}`].container]}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {isIcon && icon}
          <View style={{marginTop: 20}} />
          <Text style={headStyles ? headStyles : styles.heading}>
            {heading}
          </Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '90%',
            // margin: 'auto',
            alignSelf: 'center',
            marginBottom: '3%',
          }}>
          {bottomText && (
            <Text
              style={[
                styles.bottomText,
                isbottomTextColor && {color: bottomTextColor},
              ]}>
              {bottomText}
            </Text>
          )}
          <Button
            text={btnText}
            handleClick={() => {
              if (onPressBtn) {
                onPressBtn();
              } else {
                nav.navigate('Login');
              }
            }}
            textBold={false}
            theme={theme}
            fontSize={16}
            transparent={true}
          />
          {bottomButton && (
            <View style={{marginTop: 16, width: '100%',marginBottom:5}}>{bottomButton}</View>
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

export default BlueBgComponent;

const styles = StyleSheet.create({
  blackWhite: {
    container: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    heading: {
      color: colors.darkGray,
      fontSize: 19.59,
      textAlign: 'center',
      alignSelf: 'center',
      fontWeight: '400',
      fontFamily: fontFamily.regular,
      marginTop: 20,
      paddingHorizontal: 20,
    },
    secondaryText: {
      color: colors.white,
      textAlign: 'center',
      alignSelf: 'center',
      fontFamily: fontFamily.bold,
      fontSize: 26,
      fontWeight: '600',
      paddingHorizontal: 20,
      marginTop: 20,
    },
  },
  whiteBlack: {
    container: {
      height: '100%',
    },
    heading: {
      color: colors.white,
      textAlign: 'center',
      fontFamily: fontFamily.bold,
      // fontSize: 20,
      fontWeight: '700',
      paddingTop: 50,
    },
    secondaryText: {
      color: '#E1E4E8',
      fontWeight: '400',
      fontSize: 16,
      marginTop: 10,
      textAlign: 'center',
      width: '80%',
    },
  },
  heading: {
    color: colors.darkWhite,
    fontSize: 19.59,
    fontWeight: '400',
    fontFamily: fontFamily.regular,
    marginVertical: '2%',
    textAlign: 'center',
  },
  bottomText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fontFamily.regular,
    width: '80%',
    fontWeight: '400',
    textAlign: 'center',
    marginVertical: '5%',
  },
  description: {
    color: colors.white,
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: fontFamily.semiBold,
    fontSize: 26,
    fontWeight: '600',
    paddingHorizontal: widthPercentageToDP(10),
    // marginVertical: '2%',
  },
});
