import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {AppleIcon, FacebookIcon, GoogleIcon} from '../constants/svgs';

const SocialAuthButtons = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity id="google" style={styles.iconContainer}>
        <GoogleIcon />
      </TouchableOpacity>
      <TouchableOpacity id="apple" style={styles.iconContainer}>
        <AppleIcon />
      </TouchableOpacity>
      <TouchableOpacity id="facebook" style={styles.iconContainer}>
        <FacebookIcon />
      </TouchableOpacity>
    </View>
  );
};

export default SocialAuthButtons;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconContainer: {
    marginHorizontal: 10,
    width: 44,
    height: 44,
    borderColor: '#E1E4E8',
    borderWidth: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#F5F5F5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
});
