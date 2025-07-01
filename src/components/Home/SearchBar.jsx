import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import SearchIcon from '../../assets/icons/SearchIcon';
import FilterIcon from '../../assets/icons/FilterIcon';
import { colors, fontFamily } from '../../constants';

const SearchBarFilter = props => {
  return (
    <View style={styles.searchContainer}>
      <Pressable onPress={props.onRightIconClick}>{props?.leftIcon}</Pressable>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        placeholderTextColor={colors.darkWhite}
        value={props.value}
        onChangeText={props.onChangeText}
      />
      <Pressable onPress={props.onRightIconClick}>
        {typeof props.icon === 'number' ? (
          <Image source={props.icon} style={{ width: 20, height: 20 }} />
        ) : (
          props.icon
        )}
      </Pressable>
    </View>
  );
};

export default SearchBarFilter;

const styles = StyleSheet.create({
  searchContainer: {
    height: 46,
    width: '95%',
    margin: 'auto',
    backgroundColor: '#F7F7F7',
    borderRadius: 26,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  searchInput: {
    width: '80%',
    alignSelf: 'center',
    marginLeft: 10,
    fontSize: 16,
    textAlign: 'left',
    textAlignVertical: 'center',
    fontFamily: fontFamily.regular,
    color: 'black',
  },
});
