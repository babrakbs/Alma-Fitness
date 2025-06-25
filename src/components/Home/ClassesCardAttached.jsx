/** @format */

import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MapPinIcon from '../../assets/icons/NewMapIcon.svg';
import ArrowIcon from '../../assets/icons/ArrowIcon';
import {useNavigation} from '@react-navigation/native';
import {colors, fontFamily} from '../../constants';
import moment from 'moment';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const getDayFromDate = dateString => {
  if (!dateString) return 'Monday';
  // Handle date in format MM/DD/YYYY (from toLocaleDateString)
  return moment(dateString, 'MM/DD/YYYY').format('ddd');
};

const ClassesCard = ({
  title = 'Full Body + Bands',
  date,
  time = '11:00 - 12:00',
  location = 'AREA, 500 m',
  price = '€8',
  id = 0,
  onPressCard,
}) => {
  const navigation = useNavigation();
  const day = date ? getDayFromDate(date) : 'Monday';

  return (
    <Pressable
      onPress={() => {
        if (onPressCard) {
          onPressCard();
        } else {
          console.log('id', id);
          navigation.navigate('ClassDetails', {id: id});
        }
      }}
      style={styles.cardContainer}>
      <View style={styles.topRow}>
        <Text style={styles.dateText}>
          {date} <Text style={styles.timeText}>{time}</Text>
        </Text>

        <ArrowIcon style={styles.arrowIcon} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.bottomRow}>
        <View style={styles.locationContainer}>
          <MapPinIcon />
          <Text style={styles.locationText}>{location}</Text>
        </View>
        <Text style={styles.price}>{price}</Text>
      </View>
    </Pressable>
  );
};

export default ClassesCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FAFAFA',
    paddingVertical: heightPercentageToDP(1.5),
    paddingHorizontal: widthPercentageToDP(6),
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    // shadowRadius: 32,
    elevation: 1.5,
    marginBottom: 12, // Increased margin for better separation
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  screenContainer: {
    backgroundColor: '#F8F8F8', // Light gray background for contrast
    flex: 1,
    padding: 10, // Adds padding around all cards
  },
  dateText: {
    color: '#3D3D3D',
    fontSize: 14,
    fontWeight: '500',
  },
  timeText: {
    color: '#3D3D3D',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 10,
  },
  title: {
    fontSize: 19,
    // fontWeight: '600',
    color: '#15161E',
    fontFamily: fontFamily?.medium,
    marginBottom: 12,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: '#818C81',
    fontSize: 14,
    marginLeft: 6,
    fontFamily: fontFamily.regular,
    textDecorationLine: 'underline',
  },
  price: {
    borderColor: colors.darkWhite,
    borderWidth: 0.7,
    paddingVertical: 4,
    paddingHorizontal: 5,
    borderRadius: 6,
    fontSize: 14,
    // fontWeight: '600',
    color: colors.black,
  },
  arrowIcon: {
    marginLeft: 10,
  },
});
