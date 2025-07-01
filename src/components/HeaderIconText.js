import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AlmaLogoBlack} from '../constants/svgs';
import {colors, fontFamily} from '../constants';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const HeaderIconText = ({
  size = 120,
  text = 'Welcome to Alma',
  headingSize = 26,
  headingColor = '#15161E',
  headingMTop = 44,
  iconMTop = 52,
  additionalText = '',
}) => {
  return (
    <View style={styles.container}>
      <AlmaLogoBlack style={{marginTop: iconMTop}} width={size} height={size} />
      <Text
        style={{
          ...styles.textStyle,
          fontSize: headingSize,
          color: headingColor,
          marginTop: headingMTop,
          lineHeight:26
        }}>
        {text}
      </Text>
      {additionalText && (
        <Text style={styles.additionalText}>{additionalText}</Text>
      )}
    </View>
  );
};

export default HeaderIconText;

const styles = StyleSheet.create({
  textStyle: {
    fontWeight: '400',
    fontSize: 26,
    fontFamily: fontFamily.regular,
    textAlign: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '90%',
    margin: 'auto',
    // borderWidth: 1,
    // borderColor: 'red',
  },

  additionalText: {
    color: colors.darkWhite,
    fontFamily: fontFamily.regular,
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 14,
    marginTop: 20,
    width: widthPercentageToDP(50),
    justifyContent: 'center',
  },
});
