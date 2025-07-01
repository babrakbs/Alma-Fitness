import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import MapIcon from '../../assets/icons/MapIcon';
import {SearchBar} from 'react-native-screens';
import SearchBarFilter from '../../components/Home/SearchBar';
import Venues from '../../components/Home/Venues';
import ClassesComponent from '../../components/Home/ClassesComponent';
import FilterIcon from '../../assets/icons/FilterIcon';
import Header from '../../components/header';

const Favorites = () => {
  const [selectedSpan, setSelectedSpan] = useState('Venues');

  return (
    <ScrollView
      style={{...styles.container}}>
      <View style={{marginHorizontal: '5%'}}>
        <Header showArrow={true} label={'Favourites'} />
      </View>

      <View style={{marginVertical: 10}}>
        <SearchBarFilter icon={<FilterIcon />} />

        <View style={{margin: 'auto', marginVertical: 20}}>
          <View style={styles.span}>
            <Pressable
              onPress={() => setSelectedSpan('Venues')}
              style={
                selectedSpan == 'Venues'
                  ? [styles.ml, styles.selected]
                  : styles.text
              }>
              <Text
                style={
                  selectedSpan == 'Venues' ? styles.selectedText : styles.text
                }>
                Venues
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setSelectedSpan('Classes')}
              style={
                selectedSpan == 'Classes'
                  ? [styles.mr, styles.selected]
                  : styles.text
              }>
              <Text
                style={
                  selectedSpan == 'Classes' ? styles.selectedText : styles?.text
                }>
                Classes
              </Text>
            </Pressable>
          </View>
        </View>
        {selectedSpan == 'Venues' && <Venues />}
        {selectedSpan == 'Classes' && <ClassesComponent />}
      </View>
    </ScrollView>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    //   flex: 1,
    //   width: '90%',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    margin: 'auto',
    marginTop: 15,
  },
  exploreText: {
    color: '#15161E',
    // fontWeight: '700',
    fontSize: 18,
  },

  // Move
  span: {
    width: 198,
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#15161E',
    height: 30,
    borderRadius: 26,
  },

  selected: {
    width: 99,
    textAlign: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 26,
    height: 24,
    margin: 'auto',
  },
  text: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 99,
    fontSize: 16,
    color: '#F5F5F5',
     
  },

  selectedText: {
    color: '#15161E',
    alignSelf: 'center',
    alignItems: 'center',
     
    fontSize: 16,
  },

  ml: {
    marginLeft: 3,
  },
  mr: {
    marginRight: 3,
  },
});
