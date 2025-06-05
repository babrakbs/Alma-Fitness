import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import Screen1 from './Screen1';
import Screen2 from './Screen2';

const da = {
  0: <Screen1 />,
  1: <Screen2 />,
};

const MainScreen = () => {
  console.log('MainScreen');
  const width = Dimensions.get('window').width;
  return (
    <View style={{flex: 1.2, borderColor: 'red'}}>
      <Carousel
        mode="parallax"
        vertical={false}
        width={width}
        // height={width / 2}
        // autoPlay={true}
        data={[...new Array(6).keys()]}
        scrollAnimationDuration={500}
        modeConfig={{
          parallaxScrollingScale: 0.95,
          parallaxScrollingOffset: 22,
        }}
        onSnapToItem={index => console.log('current index:', index)}
        renderItem={({index}) => (
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              justifyContent: 'center',
              backgroundColor: 'green',
            }}>
            {da[index]}
          </View>
        )}
      />
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
