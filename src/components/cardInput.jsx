import React from 'react';
import {View, Text, TextInput, StyleSheet, ViewStyle} from 'react-native';

const CardInput = ({label, placeholder, containerStyle, keyboardType = 'name-phone-pad'}) => {
  return (
    <View style={{...styles.container, ...containerStyle}}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          keyboardType={keyboardType}
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#A3A3A3"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    color: 'rgba(0, 0, 0, 1)',
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 10,
  },
  inputContainer: {
    borderRadius: 26,
    backgroundColor: '#ffffff',
    minHeight: 50,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    color: '#818C81',
    fontSize: 14,
    fontFamily: 'Inter Tight, sans-serif',
  },
});

export default CardInput;
