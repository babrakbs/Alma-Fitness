import React, {useRef, useEffect, useState} from 'react';
import {View, Image, StyleSheet, Text, ActivityIndicator} from 'react-native';
import CustomBottomSheet from '../../../components/CustomBottomSheet'; // Adjust the import path
import Header from '../../../components/header';
import CalendarComponent from '../../../components/calendar';
import moment from 'moment';
import axiosInstance from '../../../helper/axiosInstance';
import ClassesCard from '../../../components/Home/ClassesCard';
import {useNavigation} from '@react-navigation/native';
const VenueSchedule = () => {
  const bottomSheetRef = useRef(null);

  useEffect(() => {
    // Automatically expand the bottom sheet to the first snap point
    bottomSheetRef.current?.open();
  }, []);
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigation = useNavigation();
  const handleDateChange = date => {
    // If date is a moment object, convert to JS Date
    const jsDate = date instanceof Date ? date : date.toDate();
    setCurrentDate(jsDate);
    // setFiltersOfclasses(filters => ({
    //   ...filters,
    //   date: jsDate.toISOString().split('T')[0],
    // }));
  };
  const [classVenues, setClassVenues] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchClassesVenues = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post('/api/venueClasses');
      setClassVenues(response?.data?.data?.records);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClassesVenues();
  }, []);

  const getDateLabel = () => {
    const today = moment().startOf('day');
    const selected = moment(currentDate).startOf('day');
    if (selected.isSame(today)) return 'Today';
    if (selected.isSame(today.clone().subtract(1, 'day'))) return 'Yesterday';
    if (selected.isSame(today.clone().add(1, 'day'))) return 'Tomorrow';
    return selected.format('ddd, MMM D YYYY');
  };
  const handleOnPress = id => {
    console.log('id', id);
    navigation.navigate('ClassDetails', {
      id: id,
    });
  };

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image
        source={{
          uri: 'https://images.pexels.com/photos/317155/pexels-photo-317155.jpeg?cs=srgb&dl=pexels-chevanon-317155.jpg&fm=jpg',
        }}
        style={styles.backgroundImage}
      />

      {/* Header */}
      <Header
        label="Your Header Title"
        showArrow
        theme="light"
        initialIsFavourite={1}
        onFavouriteChanged={() => {}}
      />

      {/* Custom Bottom Sheet */}
      <CustomBottomSheet
        snapPoints={['80%']}
        ref={bottomSheetRef}
        enablePanDownToClose={false}>
        {/* <View style={{width: '95%', margin: 'auto'}}> */}
        <CalendarComponent
          selectedDate={moment(currentDate)}
          onDateChange={handleDateChange}
        />

        <View style={{marginTop: 15, marginBottom: 25}}>
          {loading ? (
            <View style={{alignItems: 'center', marginVertical: 20}}>
              <ActivityIndicator size="large" color="#000" />
            </View>
          ) : classVenues && classVenues.length > 0 ? (
            classVenues.map((item, index) => (
              <ClassesCard
                key={item.class_schedule_id || index}
                heading={item.class_title}
                onPressTap={handleOnPress}
                id={item.class_schedule_id}
                dateText={(() => {
                  const date = new Date(item.start_date);
                  const days = [
                    'Sun',
                    'Mon',
                    'Tue',
                    'Wed',
                    'Thu',
                    'Fri',
                    'Sat',
                  ];
                  const months = [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec',
                  ];
                  return `${days[date.getDay()]} ${date.getDate()} ${
                    months[date.getMonth()]
                  }`;
                })()}
                timeText={`${item.start_time?.slice(
                  0,
                  5,
                )} - ${item.end_time?.slice(0, 5)}`}
                location={item.workout_type || 'AREA'}
                price={item.price === 0 ? 'Free' : `€${item.price}`}
              />
            ))
          ) : (
            <Text style={{textAlign: 'center', color: '#888', marginTop: 20}}>
              No classes found.
            </Text>
          )}
        </View>
        {/* </View> */}
      </CustomBottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default VenueSchedule;
