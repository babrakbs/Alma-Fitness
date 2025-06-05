import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import { colors, fontFamily } from '../constants';

const PreferenceListItem = ({title, checked, handleClick, theme = 'white'}) => {
  console.log(title, checked, theme);
  return (
    <Pressable onPress={handleClick} style={styles.container}>
      <View
        style={{
          ...styles.checkbox,
          borderColor: theme == 'white' ? '#15161E' : colors.black,
        }}>
        {checked && (
          <View
            style={{
              ...styles.checkBoxChecked,
              backgroundColor: theme == 'white' ? '#15161E' : colors.black,
            }}></View>
        )}
      </View>
      <Text
        style={{
          ...styles.listItemText,
          color: theme == 'white' ? '#15161E' : colors.black,
        }}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    flexDirection: 'row',
    paddingVertical: 5,
    alignItems: 'center',
  },
  checkbox: {
    height: 22,
    width: 22,
    // borderColor: '#C7CACD',
    borderWidth: 1,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBoxChecked: {
    height: 16,
    width: 16,
    borderRadius: 100,
  },
  listItemText: {
    color: colors.black,
    fontSize: 14,
    fontFamily:fontFamily.semiBold,
    fontWeight: '400',
    marginLeft: '3%',
  },
});

export default PreferenceListItem;
