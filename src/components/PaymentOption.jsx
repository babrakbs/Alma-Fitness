import React from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';

const PaymentOption = ({title, description, checked, handleClickFunction}) => {
  return (
    <Pressable onPress={() => handleClickFunction()} style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {/* <Text numberOfLines={1} adjustsFontSizeToFit style={styles.description}>
          {description}
        </Text> */}
      </View>
      <View style={styles.radioButton}>
        {checked ? <View style={styles.selectedRadioButton}></View> : <></>}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 45,
    alignSelf: 'center',
    display: 'flex',
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'row',
    height: 60,
    padding: 20,
    elevation:5,
    backgroundColor:'#ffffff'
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: '#15161E',
    fontSize: 16,
    // fontWeight: '600',
    fontFamily: 'Inter Tight',
  },
  description: {
    color: '#818C81',
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Inter Tight',
    marginTop: 7,
  },
  radioButton: {
    width: 22,
    height: 22,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#C7CACD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRadioButton: {
    height: 18,
    width: 18,
    borderRadius: 100,
    alignSelf:'center',
    backgroundColor: '#15161E',
  },
});

export default PaymentOption;
