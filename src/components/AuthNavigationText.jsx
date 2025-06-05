import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import { colors, fontFamily } from '../constants';

const AuthNavigationText = ({
  primaryText = 'Don’t have an account?',
  navText = 'Register',
  navTo = 'Signup',
  marginTop=180,
}) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.textContainer,{marginTop:marginTop}]}>
      <Text style={{color: colors.darkWhite, fontWeight: '400', fontFamily:fontFamily.regular, fontSize:16}}>{primaryText}</Text>
      <Text> </Text>
      <Pressable onPress={() => navigation.navigate(navTo)}>
        <Text style={{color: colors.black, fontWeight: '400', fontFamily:fontFamily.medium, fontSize:16}}>{navText}</Text>
      </Pressable>
    </View>
  );
};

export default AuthNavigationText;

const styles = StyleSheet.create({
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    // marginTop: 150,
    marginBottom: 20,
  },
});
