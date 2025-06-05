import {
  Dimensions,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Carousel from 'react-native-reanimated-carousel';
import Screen1 from './Screen1';
import Screen2 from './Screen2';
import {ScrollView} from 'react-native-gesture-handler';
import PlanIcon1 from '../../assets/icons/PlanIcon1';
import PlanIcon2 from '../../assets/icons/PlanIcon2';
import PlanIcon3 from '../../assets/icons/PlanIcon3';
import PlanIcon4 from '../../assets/icons/PlanIcon4';
import axiosInstance from '../../helper/axiosInstance';

const dats = {
  0: 'I am being shown as a first planner',
  1: 'Second Planner i am being shown as',
  2: 'Third Planner i am here',
};

const plansData = {
  Monthly: {
    0: {
      bgColor: '#DBDCDB',
      primaryColor: '#15161E',
      planName: 'Basic Plan',
      memberShipColor: '#46515A',
      credits: '25 credits',
      price: '€29',
      perSpan: '/month',
      heading: 'Get Started',
      descreption:
        'Perfect for those who want flexibility without overcommitting. Start small, explore your options.',
      workouts: 'Approximately 2-4 workouts.',
      stepperIcon: <PlanIcon1 />,
    },
    1: {
      bgColor: '#818C81',
      primaryColor: '#F5F5F5',
      planName: 'Active Plan',
      memberShipColor: '#AEAEAE',
      credits: '45 credits',
      price: '€59',
      perSpan: '/month',
      heading: 'Stay Consistent',
      descreption:
        'Balance your routine with a plan that supports regular workouts. Reliable and straightforward.',
      workouts: 'Approximately 5-10 workouts.',
      stepperIcon: <PlanIcon2 />,
    },
    2: {
      bgColor: '#46515A',
      primaryColor: '#F5F5F5',
      planName: 'Pro Plan',
      memberShipColor: '#AEAEAE',
      credits: '65 credits',
      price: '€89',
      perSpan: '/month',
      heading: 'Level Up',
      descreption:
        'Designed for users who are serious about their fitness journey and want more access to different workouts.',
      workouts: 'Approximately 8-15 workouts.',
      stepperIcon: <PlanIcon3 />,
    },
    3: {
      bgColor: '#373A36',
      primaryColor: '#F5F5F5',
      planName: 'Pro Plan',
      memberShipColor: '#AEAEAE',
      credits: '85 credits',
      price: '€129',
      perSpan: '/month',
      heading: 'All-in Access',
      descreption:
        'For those who need complete freedom to workout as often as they like. Full access, full flexibility.',
      workouts: 'Approximately 15-20+ workouts.',
      stepperIcon: <PlanIcon4 />,
    },
  },
  Yearly: {},
};

const CarouselContainer = ({selectedSpan}) => {
  const {width} = useWindowDimensions();
  const [isScrolling, setIsScrolling] = useState(false);
  const [plans, setPlans] = useState([]);
 
  console.log('isScrolling', isScrolling);

  return (
    <View style={{flex: 1}}>
     <Carousel
  mode="parallax"
  fixedDirection="horizontal"
  width={width}
  height={400} // or set your desired height
  onScrollBegin={() => setIsScrolling(true)}
  onScrollEnd={() => setIsScrolling(false)}
  data={Object.values(plansData[selectedSpan])}
  scrollAnimationDuration={500}
  panGestureHandlerProps={{
    activeOffsetX: [-10, 10],
    failOffsetY: [-30, 30],
  }}
  modeConfig={{
    parallaxScrollingScale: 0.95,
    parallaxScrollingOffset: 22,
  }}
  onSnapToItem={index => console.log('current index:', index)}
  renderItem={({ item, index }) => (
    <Screen1
      carouselIndex={index}
      selectedSpan={selectedSpan}
      isScrolling={isScrolling}
      {...item}
    />
  )}
/>

    </View>
  );
};

export default CarouselContainer;

const styles = StyleSheet.create({});
