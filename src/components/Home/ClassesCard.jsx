import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MapPinIcon from '../../assets/icons/NewMapIcon.svg';
import ArrowIcon from '../../assets/icons/ArrowIcon';
import {colors, fontFamily} from '../../constants';

const ClassesCard = ({
  heading = 'Full Body + Bands',
  dateText = 'Mon 22 Jan',
  timeText = '11:00 - 12:00',
  location = 'AREA, 500 m',
  price = '€8',
  id = '1',
  onPressTap = () => {},
}) => {
  return (
    <Pressable
      onPress={() => onPressTap(id)}
      style={{...styles.cardContainer, ...styles.shadow}}>
      <View style={styles.leftContainer}>
        <View style={styles.dateRow}>
          <Text style={styles.dateText}>
            {dateText} <Text style={styles.timeText}>{timeText}</Text>
          </Text>
          <ArrowIcon />
        </View>

        <Text style={styles.heading}>{heading}</Text>

        <View style={styles.rowContainer}>
          <View style={styles.locationContainer}>
            <MapPinIcon />
            <Text style={styles.locationText}>{location}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>{price}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ClassesCard;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#FAFAFA',
    padding: 14,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  leftContainer: {
    flex: 1,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    color: colors.black,
    fontWeight: '400',
    fontFamily: fontFamily.medium,
  },
  timeText: {
    fontSize: 14,
    color: colors.black,
    fontWeight: '400',
    fontFamily: fontFamily.regular,
  },
  heading: {
    fontSize: 18.49,
     
    color: colors.black,
    fontFamily: fontFamily.bold,
    marginVertical: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14.26,
    color: colors.darkWhite,
    textDecorationLine: 'underline',
    fontFamily: fontFamily.regular,
    marginLeft: 4,
  },
  priceContainer: {
    borderColor: colors.darkWhite,
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 5,
  },
  priceText: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.black,
    fontFamily: fontFamily.medium,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
