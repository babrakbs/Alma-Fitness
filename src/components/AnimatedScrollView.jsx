// components/AnimatedScrollViewHeader.js
import React, {useRef} from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  View,
  StatusBar,
  Text,
} from 'react-native';

const HEADER_MAX_HEIGHT = 150;
const HEADER_MIN_HEIGHT = 50;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const AnimatedScrollViewHeader = ({children, headerContent}) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Animated.View
        style={[
          styles.header,
          {
            height: headerHeight,
            opacity: headerOpacity,
          },
        ]}>
        {headerContent ? (
          headerContent
        ) : (
          <Text style={styles.headerText}>Header</Text>
        )}
      </Animated.View>
      <Animated.ScrollView
        contentContainerStyle={styles.scrollViewContent}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}>
        {children}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'tomato',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: StatusBar.currentHeight || 0,
  },
  scrollViewContent: {
    paddingTop: HEADER_MAX_HEIGHT,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});

export default AnimatedScrollViewHeader;
