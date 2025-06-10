import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MapPinIcon from '../../assets/icons/MapPinIcon';
import ArrowIcon from '../../assets/icons/ArrowIcon';
import {useNavigation} from '@react-navigation/native';
import {colors, fontFamily} from '../../constants';
import moment from 'moment';

const getDayFromDate = dateString => {
  if (!dateString) return 'Monday';
  // Handle date in format MM/DD/YYYY (from toLocaleDateString)
  return moment(dateString, 'MM/DD/YYYY').format('dddd');
};

const ClassesCard = ({
  title = 'Full Body + Bands',
  date,
  time = '11:00 - 12:00',
  location = 'AREA, 500 m',
  price = '€8',
  id = 0,
}) => {
  const navigation = useNavigation();
  const day = date ? getDayFromDate(date) : 'Monday';

  return (
    <Pressable
      onPress={() => {
        console.log('id', id);
        navigation.navigate('ClassDetails', {id: id});
      }}
      style={styles.cardContainer}>
      <View style={styles.topRow}>
        <Text style={styles.dateText}>
          {day} <Text style={styles.timeText}>{time}</Text>
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
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 6,
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
    fontSize: 18,
    fontWeight: '600',
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
    borderWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 5,
    borderRadius: 6,
    fontSize: 14,
    fontWeight: '600',
    color: colors.black,
  },
  arrowIcon: {
    marginLeft: 10,
  },
});
