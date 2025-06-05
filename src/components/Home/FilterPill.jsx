import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import AlmaIconSm from '../../assets/icons/AlmaIconSm';

const nums = [6, 10, 30];

const FilterPill = () => {
  const [selected, setSelected] = useState(nums[0]);
  return (
    <View style={styles.mainContainer}>
      {nums.map((num, index) => (
        <Pressable
          style={{
            ...styles.container,
            backgroundColor: selected == num ? '#15161E' : '#DBDCDB',
          }}
          key={index}
          onPress={() => setSelected(num)}>
          <View style={styles.iconContainer}>
            <AlmaIconSm />
          </View>
          <Text
            style={{
              ...styles.text,
              color: selected == num ? '#F5F5F5' : '#15161E',
            }}>
            {'< '}
            {num}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default FilterPill;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'row',
  },
  container: {
    marginRight: 10,
    width: 67,
    height: 26,
    borderRadius: 54,
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 5,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  iconContainer: {
    width: 16,
    height: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '400',
    // marginHorizontal: 2,
    fontSize: 14,
  },
});
