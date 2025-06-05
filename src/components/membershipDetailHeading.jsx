import React from 'react';
import {Text, StyleSheet} from 'react-native';
import { colors, fontFamily } from '../constants';

const MembershipDetailsHeading = ({text}) => {
  return (
    <>
      <Text style={styles.heading}>{text}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 16,
    fontFamily:fontFamily.medium,
    fontWeight: '500',
    color: colors.black,
  },
});

export default MembershipDetailsHeading;
