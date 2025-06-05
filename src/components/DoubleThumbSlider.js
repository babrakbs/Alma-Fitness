import React, { useRef, useState, useEffect } from 'react';
import { View, PanResponder, StyleSheet, Text, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const SLIDER_WIDTH = width - 40;
const THUMB_SIZE = 16;

const DoubleThumbSlider = ({ onValueChange }) => {
  const [values, setValues] = useState({ left: 0, right: 24 });

  const leftThumbX = useRef((0 / 24) * SLIDER_WIDTH);
  const rightThumbX = useRef((24 / 24) * SLIDER_WIDTH);

  const leftStartX = useRef(0);
  const rightStartX = useRef(0);

  // Keep thumb positions in sync with state
  useEffect(() => {
    leftThumbX.current = (values.left / 24) * SLIDER_WIDTH;
    rightThumbX.current = (values.right / 24) * SLIDER_WIDTH;
  }, [values.left, values.right]);

  const panResponderLeft = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        leftStartX.current = leftThumbX.current;
      },
      onPanResponderMove: (_, gestureState) => {
        let newX = Math.min(
          Math.max(0, leftStartX.current + gestureState.dx),
          rightThumbX.current - THUMB_SIZE
        );
        const newLeft = Math.round((newX / SLIDER_WIDTH) * 24);
        setValues(prev => {
          if (newLeft !== prev.left) {
            const updated = { left: newLeft, right: prev.right };
            if (onValueChange) onValueChange(updated.left, updated.right);
            return updated;
          }
          return prev;
        });
      },
    })
  ).current;

  const panResponderRight = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        rightStartX.current = rightThumbX.current;
      },
      onPanResponderMove: (_, gestureState) => {
        let newX = Math.max(
          Math.min(SLIDER_WIDTH, rightStartX.current + gestureState.dx),
          leftThumbX.current + THUMB_SIZE
        );
        const newRight = Math.round((newX / SLIDER_WIDTH) * 24);
        setValues(prev => {
          if (newRight !== prev.right) {
            const updated = { left: prev.left, right: newRight };
            if (onValueChange) onValueChange(updated.left, updated.right);
            return updated;
          }
          return prev;
        });
      },
    })
  ).current;

  // Helper to move thumb to tapped position
  const moveThumbTo = (thumb, x) => {
    let value = Math.round((x / SLIDER_WIDTH) * 24);
    value = Math.max(0, Math.min(24, value));
    setValues(prev => {
      if (thumb === 'left') {
        value = Math.min(value, prev.right - 1);
        if (value !== prev.left) {
          const updated = { left: value, right: prev.right };
          if (onValueChange) onValueChange(updated.left, updated.right);
          return updated;
        }
      } else {
        value = Math.max(value, prev.left + 1);
        if (value !== prev.right) {
          const updated = { left: prev.left, right: value };
          if (onValueChange) onValueChange(updated.left, updated.right);
          return updated;
        }
      }
      return prev;
    });
  };

  // Calculate thumb positions for label and thumb
  const leftThumbPos = (values.left / 24) * SLIDER_WIDTH - THUMB_SIZE / 2;
  const rightThumbPos = (values.right / 24) * SLIDER_WIDTH - THUMB_SIZE / 2;

  // Handler for tapping on the slider track
  const handleTrackPress = (e) => {
    const x = e.nativeEvent.locationX;
    const leftDist = Math.abs(x - (values.left / 24) * SLIDER_WIDTH);
    const rightDist = Math.abs(x - (values.right / 24) * SLIDER_WIDTH);
    if (leftDist < rightDist) {
      moveThumbTo('left', x);
    } else {
      moveThumbTo('right', x);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={styles.sliderTrack}
        onStartShouldSetResponder={() => true}
        onResponderGrant={handleTrackPress}
      >
        {/* The visible slider line */}
        <View style={styles.sliderLine} />
        {/* Selected track */}
        <View
          style={[
            styles.selectedTrack,
            {
              left: (values.left / 24) * SLIDER_WIDTH,
              width: ((values.right - values.left) / 24) * SLIDER_WIDTH,
            },
          ]}
        />
        {/* Left thumb touch area */}
        <View
          {...panResponderLeft.panHandlers}
          style={[
            styles.thumbTouchArea,
            { left: leftThumbPos }
          ]}
          pointerEvents="box-only"
        >
          <View style={styles.thumb} />
        </View>
        {/* Right thumb touch area */}
        <View
          {...panResponderRight.panHandlers}
          style={[
            styles.thumbTouchArea,
            { left: rightThumbPos }
          ]}
          pointerEvents="box-only"
        >
          <View style={styles.thumb} />
        </View>
        {/* Value labels below thumbs */}
        <Text style={[styles.valueLabel, { left: leftThumbPos - 8 }]}>{formatTime(values.left)}</Text>
        <Text style={[styles.valueLabel, { left: rightThumbPos - 8 }]}>{formatTime(values.right)}</Text>
      </View>
    </View>
  );
};

const formatTime = (number) => {
  const displayHour = number % 12 === 0 ? 12 : number % 12;
  const ampm = number < 12 ? 'AM' : 'PM';
  return `${displayHour} ${ampm}`;
};

export default DoubleThumbSlider;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 40,
    alignItems: 'center',
  },
  sliderTrack: {
    width: SLIDER_WIDTH,
    height: 20, // Large tap area
    backgroundColor: 'transparent',
    position: 'relative',
    justifyContent: 'center',
  },
  sliderLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0, // (40-2)/2 to center the line
    height: 2,
    backgroundColor: '#ccc',
    zIndex: 0,
  },
  selectedTrack: {
    position: 'absolute',
    height: 2,
    backgroundColor: 'black',
    top: 0, // Same as sliderLine
    zIndex: 1,
  },
  thumb: {
    position: 'absolute',
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: '#333',
    top: -4,
    left: 0,
    zIndex: 2,
  },
  thumbTouchArea: {
    position: 'absolute',
    width: 40,
    height: 40,
    top: 8 - (40 - THUMB_SIZE) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    backgroundColor: 'transparent',
  },
  valueLabel: {
    position: 'absolute',
    top: 22,
    fontSize: 12,
    color: 'black',
    zIndex: 3,
  },
});
