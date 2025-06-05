import {ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import AlmaWhite from '../../assets/icons/AlmaWhite';
import WhiteClose from '../../assets/icons/WhiteClose';
import Carousel from './CarouselContainer';
import {SafeAreaView} from 'react-native-safe-area-context';
import NewCarousel from './NewCarousel';

const Plans = () => {
  const [selectedSpan, setSelectedSpan] = useState('Monthly');
  return (
    <View style={{flex: 1}}>
      <ImageBackground
          resizeMode='cover'
        source={require('../../assets/images/OnB1.png')}
        style={styles.container}>
        <SafeAreaView style={styles.header}>
          {/* <AlmaWhite /> */}
          {/* <View style={styles.span}>
            <Pressable
              onPress={() => setSelectedSpan('Monthly')}
              style={
                selectedSpan == 'Monthly'
                  ? [styles.ml, styles.selected]
                  : styles.text
              }>
              <Text style={selectedSpan == 'Monthly' ? styles.selectedText : styles.unSelectedText}>
                Monthly
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setSelectedSpan('Yearly')}
              style={
                selectedSpan == 'Yearly'
                  ? [styles.mr, styles.selected]
                  : styles.text
              }>
              <Text style={selectedSpan == 'Yearly' ? styles.selectedText : styles.unSelectedText}>
                Yearly
              </Text>
            </Pressable>
          </View> */}
          {/* <WhiteClose /> */}
        </SafeAreaView>
        <View style={styles.carouselContainer}>
          {/* <Carousel selectedSpan={selectedSpan} /> */}
          <NewCarousel selectedSpan={selectedSpan}/>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Plans;

const styles = StyleSheet.create({
  container: {flex: 1, borderWidth: 1},
  ml: {
    marginLeft: 3,
  },
  mr: {
    marginRight: 3,
  },
  header: {
    flex: 0.1,
    // borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    // paddingTop: 10,
    width: '95%',
    margin: 'auto',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: 20,
  },
  carouselContainer: {flex: 0.9},
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
    fontWeight: '500',
  },

  selectedText: {
    color: '#15161E',
    alignSelf: 'center',
    alignItems: 'center',
    fontWeight: '500',
    fontSize: 16,
  },
  unSelectedText: {
    color: '#F5F5F5',
    alignSelf: 'center',
    alignItems: 'center',
    fontWeight: '500',
    fontSize: 16,
  }
});
// #F5F5F5
