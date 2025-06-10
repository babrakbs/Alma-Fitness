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
import {widthPercentageToDP} from 'react-native-responsive-screen';

const MessageIconScreen = ({
  headingText = 'Account created!',
  secondaryText = 'Your account has been created successfully.',
  headingSize = 26,
  navigateTo = 'Plans',
  btnText = 'Continue',
  theme = 'blackWhite',
  size = 60,
  iconMTop = 52,
  purchaseSuccess = false,
  accountCreated = false,
  isIcon = true,
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
            marginTop: isIcon ? 0 : 40,
          }}>
          {isIcon ? (
            accountCreated ? (
              <Checkcircle />
            ) : purchaseSuccess ? (
              <SuccessIconPlus
                style={{backgroundColor: '#15161E', borderRadius: 10}}
              />
            ) : (
              <AlmaLogoImage
                style={{
                  marginTop: iconMTop,
                  backgroundColor: '#15161E',
                  borderRadius: 10,
                }}
                width={size}
                height={size}
              />
            )
          ) : (
            ''
          )}
          <Text
            style={[
              {
                ...styles.heading,
                fontSize: headingSize,
              },
              styles[`${theme}`].heading,
            ]}>
            {headingText}
          </Text>
          <Text
            style={[styles.secondaryText, styles[`${theme}`].secondaryText]}>
            {secondaryText}
          </Text>
        </View>
        <View
          style={{
            height: '20%',
            alignItems: 'center',
            justifyContent: 'center',
            width: '90%',
            margin: 'auto',
          }}>
          <Button
            text={btnText}
            handleClick={() => {
              nav.navigate(navigateTo, {screen: 'Registration'});
            }}
            textBold={false}
            theme={theme}
            fontSize={16}
            transparent={true}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default MessageIconScreen;

const styles = StyleSheet.create({
  blackWhite: {
    // container: {
    //   // flex: 1,
    //   height: '100%',
    //   // borderWidth: 1,
    //   // borderColor: 'green',
    // },
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
      width: widthPercentageToDP(80),
      paddingHorizontal: 20,
      marginTop: 20,
    },
  },
  whiteBlack: {
    container: {
      // flex: 1,
      height: '100%',
      // borderWidth: 1,
      // borderColor: 'green',
      // backgroundColor: '#15161E',
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
});
