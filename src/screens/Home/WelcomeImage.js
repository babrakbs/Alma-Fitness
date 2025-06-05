import {FlatList, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import React, {useRef} from 'react';
import VenueCard from '../../components/Home/VenueCard';
import Carousel from 'react-native-reanimated-carousel';
import VenueCardSmall from '../../components/Home/VenueCardSmall';

const WelcomeImage = props => {
  const {width} = useWindowDimensions();
  const ref = useRef(null);

  // console.log('Refffff', ref.current.getCurrentIndex());

  return (
    <View style={{height: 200, backgroundColor: '#F5F5F5'}}>
      <FlatList
        ref={ref}
        // snapEnabled={true}
        // vertical={false}
        // loop={false}
        // onScrollBegin={() => console.log('CALLED BEGIN')}
        // onScrollEnd={() => {
        //   // props.enablScroll();
        // }}
        // mode="parallax"
        // fixedDirection="horizontal" // or "horizontal" depending on your requirement
        // width={width}
        // pagingEnabled={true}
        // height={310}
        data={[...new Array(1).keys()]}
        // scrollAnimationDuration={500}
        // panGestureHandlerProps={{
        //   activeOffsetX: [-5, 5], // Enable horizontal panning
        //   failOffsetY: [-10, 10],
        // }}
        // // onConfigurePanGesture={gestureChain =>
        // //   gestureChain.activeOffsetY([-10, 10])
        // // }
        // modeConfig={{
        //   parallaxScrollingScale: 0.98,
        //   parallaxScrollingOffset: 21,
        // }}
        // onSnapToItem={index => console.log('current index:', index)}
        renderItem={() => <VenueCardSmall />}
      />
    </View>
  );
};

export default WelcomeImage;

const styles = StyleSheet.create({});
