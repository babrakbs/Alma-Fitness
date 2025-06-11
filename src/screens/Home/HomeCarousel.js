import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import React, {useRef} from 'react';
import VenueCard from '../../components/Home/VenueCard';
import Carousel from 'react-native-reanimated-carousel';

const HomeCarousel = props => {
  const {width} = useWindowDimensions();
  const ref = useRef(null);
  // console.log('Refffff', ref.current.getCurrentIndex());
  console.log('Props', props?.venues);

  return (
    <View style={{height: 180}}>
      <Carousel
        ref={ref}
        snapEnabled={true}
        vertical={false}
        loop={false}
        onScrollBegin={() => console.log('CALLED BEGIN')}
        onScrollEnd={() => {}}
        mode="parallax"
        fixedDirection="horizontal"
        width={width}
        height={310}
        data={props.venues}
        scrollAnimationDuration={500}
        panGestureHandlerProps={{
          activeOffsetX: [-5, 5],
          failOffsetY: [-10, 10],
        }}
        modeConfig={{
          parallaxScrollingScale: 0.98,
          parallaxScrollingOffset: 21,
        }}
        onSnapToItem={index => console.log('current index:', index)}
        renderItem={({item}) => (
          <VenueCard
            imageUrl={typeof item.image === 'string' ? item.image : ''}
            name={item.name}
            id={props?.isProfile ? item?.venue_id : item.id}
            initialIsFavourite={item?.favourite === 0 ? false : true}
            onFavouriteChanged={
              props?.isProfile ? props.onFavouriteChanged : ''
            }
          />
        )}
      />
    </View>
  );
};

export default HomeCarousel;

const styles = StyleSheet.create({});
