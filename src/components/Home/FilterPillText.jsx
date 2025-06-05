import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { fontFamily } from '../../constants';

const FilterPillText = ({text = 'Yoga', selected}) => {
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: selected == text ? '#373A36' : '#EFEFEB',
      }}>
      <Text
        style={{
          //   borderWidth: 1,
          fontSize: 13.71,
          fontWeight: '500',
          fontFamily:fontFamily.regular,
          color: selected == text ? '#EFEFEB' : '#373A36',
          textDecorationLine: text == 'View more' ? 'underline' : 'none',
        }}>
        {text}
      </Text>
    </View>
  );
};

export default FilterPillText;

const styles = StyleSheet.create({
  container: {
    // height: 26,
    // width: 'auto',
    gap: 12,
    // backgroundColor: '#EFEFEB',
    textAlign: 'center',
    marginRight: 5,
    borderRadius: 27,
    paddingHorizontal: 12,
    paddingVertical: 7,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
