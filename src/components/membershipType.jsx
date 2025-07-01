import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import CalendarDark from '../assets/icons/CalendarDark.svg'; // Import CalendarDark icon

const MembershipType = ({ title, checked, handleClick, index }) => {
  return (
    <>
    {index === 1 && (
    <Text style={styles.startDateText}>Start on a specific Date</Text>)}
    <Pressable
      onPress={handleClick}
      style={[styles.container, { marginTop: index === 0 ? '7%' : '4%' }]}
    >
      <View style={styles.innerView}>
        <Text style={styles.title}>{title}</Text>
        {index === 1 ? (
          <CalendarDark width={24} height={24} />
        ) : (
          <View
            style={[styles.radioButtonView, { borderColor: checked ? 'black' : '#C7CACD' }]}
          >
            {checked && <View style={styles.radioButtonChecked} />}
          </View>
        )}
      </View>
    </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    elevation: 5,
    backgroundColor: '#ffffff',
    borderRadius: 100,
  },
  innerView: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: '5%',
    marginVertical: 10,
  },
  title: {
    color: '#15161E',
     
    fontSize: 16,
  },
  radioButtonView: {
    width: 18,
    height: 18,
    borderRadius: 100,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonChecked: {
    width: 13,
    height: 13,
    borderRadius: 100,
    backgroundColor: 'black',
  },
  startDateText: {
    marginTop:20,
    fontSize: 15,
    fontWeight: '400',
    color: '#000000',
  },
});

export default MembershipType;
