import React, {useState, useRef} from 'react';
import {
  ImageBackground,
  View,
  StyleSheet,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import ViewPager from 'react-native-pager-view';
import Button from './Button';
import {OnBoardingData} from '../constants/staticData';
import {colors, fontFamily} from '../constants';
import OnBoardingProgress from './onBoardingProgress';

const {width, height} = Dimensions.get('window');

const OnBoardingBG = ({navigation}) => {
  const viewPagerRef = useRef(null);
  const [page, setPage] = useState(0);

  return (
    <>
      <StatusBar animated={true} backgroundColor="transparent" translucent />
      <ImageBackground
        source={require('../assets/images/OnB2.png')}
        style={styles.imageBackground}
        resizeMode="cover">
        {page < OnBoardingData.length - 1 && (
          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => navigation.replace('Login')}>
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>
        )}
        <ViewPager
          style={styles.viewPager}
          initialPage={0}
          ref={viewPagerRef}
          onPageSelected={e => setPage(e.nativeEvent.position)}>
          {OnBoardingData.map((item, index) => (
            <View key={index} style={styles.slide}>
              <Text style={styles.headingText}>{item.headingText}</Text>
              <Text style={styles.bodyText}>{item.bodyText}</Text>
              <OnBoardingProgress screen={page} />
            </View>
          ))}
        </ViewPager>
        <View style={styles.buttonContainer}>
          <Button
            handleClick={() => {
              if (page < OnBoardingData.length - 1) {
                viewPagerRef.current.setPage(page + 1);
              } else {
                navigation.replace('Login');
              }
            }}
            fontSize={16}
            text={page === OnBoardingData.length - 1 ? 'Next' : 'Next'}
            theme="whiteBlack"
            widthSize="large2"
            textBold={false}
            transparent={true}
          />
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  viewPager: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '90%',
  },
  imageBackground: {
    // flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingText: {
    color: colors.darkGray,
    fontSize: 22,
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontWeight: '400',
    fontFamily: fontFamily.regular,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  bodyText: {
    color: colors.white,
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontFamily: fontFamily.medium,
    fontSize: 30,
    fontWeight: '600',
    paddingHorizontal: 20,
    marginTop: 6,
    marginBottom: 32,
  },
  paginationContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
  dot: {
    backgroundColor: colors.darkWhite,
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: colors.white,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  buttonContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    marginBottom: 50,
    alignItems: 'center',
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    padding: 10,
  },
  skipButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '400',
    fontFamily: fontFamily.regular,
  },
});

export default OnBoardingBG;
