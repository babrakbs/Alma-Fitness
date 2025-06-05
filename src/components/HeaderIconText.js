import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AlmaLogoBlack} from '../constants/svgs';
import { colors, fontFamily } from '../constants';

const HeaderIconText = ({
  size = 60,
  text = 'Welcome to Alma',
  headingSize = 24,
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
    fontSize: 24,
    fontFamily:fontFamily.medium,
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
    fontFamily:fontFamily.regular,
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 14,
    marginTop: 20,
    justifyContent: 'center',
  },
});
