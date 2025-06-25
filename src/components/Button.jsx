import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {colors, fontFamily} from '../constants';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';

const Button = ({
  text = 'Button',
  theme = 'blackWhite',
  widthSize = 'large',
  borderLess = true,
  textBold = true,
  handleClick,
  fontSize,
  marginTop = 0,
  disabled = false,
  rounded = 65,
  transparent = false,
  deleteBtn = false,
  loading,
  elevation = true,
}) => {
  const buttonContent = loading ? (
    <ActivityIndicator
      style={{
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      size="small"
      color={colors.white}
    />
  ) : (
    <Text
      style={[
        styles.textStyle,
        styles[`${theme}`].text,
        textBold ? styles?.boldText : styles?.nonBold,
        {fontSize: fontSize && fontSize},
        transparent && {color: colors.white},
      ]}>
      {text}
    </Text>
  );

  if (transparent) {
    return (
      <LinearGradient
        colors={['#383EF6', '#4D38C1', '#4E39C4']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={[
          styles.buttonContainer,
          styles[`${theme}`]?.button,
          styles?.widthSize[widthSize],
          !borderLess && [
            styles?.border,
            {borderColor: theme === 'gray' ? colors.darkWhite : colors.black},
          ],
          disabled && styles.disabled,
          {marginTop: marginTop},
          {borderRadius: rounded},
          deleteBtn && {backgroundColor: colors.red},
          elevation
            ? Platform.select({
                ios: {
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.2,
                  shadowRadius: 4,
                },
                android: {elevation: 2},
              })
            : {elevation: 0},
        ]}>
        <Pressable
          onPress={handleClick}
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          disabled={disabled}>
          {buttonContent}
        </Pressable>
      </LinearGradient>
    );
  }

  return (
    <Pressable
      onPress={handleClick}
      style={[
        styles.buttonContainer,
        styles[`${theme}`]?.button,
        styles?.widthSize[widthSize],
        !borderLess && [
          styles?.border,
          {borderColor: theme === 'gray' ? colors.darkWhite : colors.black},
        ],
        disabled && styles.disabled,
        {marginTop: marginTop},
        {borderRadius: rounded},
        deleteBtn && {backgroundColor: colors.red},
        elevation
          ? Platform.select({
              ios: {
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.2,
                shadowRadius: 4,
              },
              android: {elevation: 2},
            })
          : {elevation: 0},
      ]}
      disabled={disabled}>
      {buttonContent}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    height: 45,
    width: '90%',
    padding: 0,
  },
  blackWhite: {
    button: {
      backgroundColor: colors.black,
    },
    text: {
      color: colors.white,
      fontWeight: '500',
      fontSize: 16,
      fontFamily: fontFamily.medium,
    },
  },
  gray: {
    button: {
      backgroundColor: colors.white,
      borderColor: colors.darkWhite,
    },
    text: {
      fontFamily: fontFamily.medium,
      color: colors.darkWhite,
      fontWeight: '500',
      fontSize: 16,
    },
  },
  transparentWhite: {
    button: {
      backgroundColor: 'transparent',
      borderColor: colors.darkWhite,
    },
    text: {
      fontFamily: fontFamily.medium,
      color: colors.darkWhite,
      fontWeight: '500',
      fontSize: 16,
    },
  },
  transparentBlack: {
    button: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.black,
    },
    text: {
      fontFamily: fontFamily.medium,
      color: colors.black,
      fontWeight: '500',
      fontSize: 16,
    },
  },
  grayWhite: {
    button: {
      backgroundColor: colors.black,
    },
    text: {
      fontFamily: fontFamily.medium,
      color: colors.white,
      fontWeight: '500',
      fontSize: 16,
    },
  },
  outline: {
    button: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.white,
    },
    text: {
      fontFamily: fontFamily.medium,
      color: colors.black,
      fontWeight: '500',
      fontSize: 16,
    },
  },
  whiteBlack: {
    button: {
      backgroundColor: colors.white,
      borderColor: colors.black,
      borderWidth: 1,
    },
    text: {
      fontFamily: fontFamily.medium,
      color: colors.black,
      fontWeight: '500',
      fontSize: 16,
    },
  },
  textStyle: {
    margin: 'auto',
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  widthSize: {
    large: {
      width: '100%',
    },
    large2: {
      width: '90%',
    },
    medium: {
      width: '65%',
    },
    xmedium: {
      width: '50%',
    },
    small: {
      width: '41%',
    },
    xsmall: {
      width: '35%',
    },
  },
  border: {
    borderWidth: 1,
    borderColor: 'black',
  },
  boldText: {
    fontWeight: '800',
  },
  nonBold: {
    fontWeight: '500',
  },
  disabled: {
    // backgroundColor: '#DCDCDC',
  },
});
