import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors, fontFamily } from '../constants';
import { heightPercentageToDP } from 'react-native-responsive-screen';

const OrLine = ({ mt = heightPercentageToDP(4.6), mb = heightPercentageToDP(2.6) }) => {
  return (
    <View style={{ ...styles.container, marginTop: mt, marginBottom: mb }}>
      <View
        style={{
          width: '25%',
          borderWidth: 0.5,
          borderColor: colors.darkWhite,
        }} />
      <Text style={{ width:'40%',color: colors.darkWhite, fontFamily: fontFamily.regular }}>{`\t`}Or continue with{`\t`}</Text>
      <View
        style={{
          width: '25%',
          borderWidth: 0.5,
          borderColor: colors.darkWhite,
        }} />
    </View>
  );
};

export default OrLine;

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    // borderColor: 'red',
    // display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
