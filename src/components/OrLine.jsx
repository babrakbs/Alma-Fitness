import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { colors, fontFamily } from '../constants';

const OrLine = ({mt = 25, mb = 15}) => {
  return (
    <View style={{...styles.container, marginTop: mt, marginBottom: mb}}>
      <View
        style={{
          width: '30%',
          borderWidth: 0.5,
          borderColor: colors.darkWhite,
        }}></View>
      <View style={{width: '30%', marginHorizontal: 'auto'}}>
        <Text style={{color: colors.darkWhite, fontFamily:fontFamily.regular}}>Or continue with</Text>
      </View>

      <View
        style={{
          width: '30%',
          borderWidth: 0.5,
          borderColor: colors.darkWhite,
        }}></View>
    </View>
  );
};

export default OrLine;

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    // borderColor: 'red',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
