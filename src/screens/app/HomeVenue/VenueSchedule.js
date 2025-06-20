import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Pressable,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import CustomBottomSheet from '../../../components/CustomBottomSheet';
import Header from '../../../components/header';
import CalendarComponent from '../../../components/calendar';
import moment from 'moment';
import axiosInstance from '../../../helper/axiosInstance';
import ClassesCard from '../../../components/Home/ClassesCard';
import {useNavigation} from '@react-navigation/native';
import {colors, fontFamily} from '../../../constants';
import DoubleThumbSlider from '../../../components/DoubleThumbSlider';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const VenueSchedule = () => {
  const bottomSheetRef = useRef(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigation = useNavigation();
  const [classVenues, setClassVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtersOfclasses, setFiltersOfclasses] = useState({
    page: 1,
    limit: 10,
    date: new Date().toISOString().split('T')[0],
    start_time: '00:00:00',
    end_time: '24:00:00',
  });

  const handleDateChange = date => {
    const jsDate = date instanceof Date ? date : date.toDate();
    setCurrentDate(jsDate);
    setFiltersOfclasses(filters => ({
      ...filters,
      date: jsDate.toISOString().split('T')[0],
    }));
  };

  const handleTimeChange = (startHour, endHour) => {
    const pad = n => n.toString().padStart(2, '0');
    const start = `${pad(startHour)}:00:00`;
    const end = `${pad(endHour)}:00:00`;
    setFiltersOfclasses(filters => ({
      ...filters,
      start_time: start,
      end_time: end,
    }));
  };

  const fetchClassesVenues = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        '/api/venueClasses',
        filtersOfclasses,
      );
      setClassVenues(response?.data?.data?.records);
    } catch (error) {
      console.error('Error fetching classes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClassesVenues();
  }, [filtersOfclasses]);

  const getDateLabel = () => {
    const today = moment().startOf('day');
    const selected = moment(currentDate).startOf('day');
    if (selected.isSame(today)) return 'Today';
    if (selected.isSame(today.clone().subtract(1, 'day'))) return 'Yesterday';
    if (selected.isSame(today.clone().add(1, 'day'))) return 'Tomorrow';
    return selected.format('ddd, MMM D YYYY');
  };

  const handleOnPress = id => {
    navigation.navigate('ClassDetails', {
      id: id,
    });
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      {/* <ImageBackground
        source={{
          uri: 'https://images.pexels.com/photos/317155/pexels-photo-317155.jpeg?cs=srgb&dl=pexels-chevanon-317155.jpg&fm=jpg',
        }}
        style={styles.backgroundImage}
        
        resizeMode="cover"> */}
      <SafeAreaView />

      <View style={{paddingHorizontal: '2%'}}>
        <Header
          label={'Venue Schedule'}
          showArrow
          theme="light"
          venueId={1}
          classId={2}
          isClass={true}
          initialIsFavourite={0}
          // onFavouriteChanged={() => {
          //   fetchClassDetails(1);
          // }}
          showFavourite={true}
        />
      </View>
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          {/* <View style={styles.dateContainerMain}>
              <View style={styles.dateContainer}>
                <Text style={styles.dateNumber}>
                  {moment(currentDate).date()}
                </Text>
                <View>
                  <Text style={styles.dayText}>
                    {moment(currentDate).format('ddd')}
                  </Text>
                  <Text style={styles.monthText}>
                    {moment(currentDate).format('MMM YYYY')}
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.todayButton}>
              
              </TouchableOpacity>
            </View> */}

          <View style={{width: '95%', margin: 'auto', marginTop: 10}}>
            <CalendarComponent
              selectedDate={moment(currentDate)}
              onDateChange={handleDateChange}
            />
            <Text style={styles.todayText}>{getDateLabel()}</Text>
          </View>

          <View style={styles.divider} />

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
        </ScrollView>
      </View>
      {/* </ImageBackground> */}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: -2,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 5,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 12,
  },
  dateContainerMain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateNumber: {
    fontSize: 50.69,
    fontWeight: '500',
    fontFamily: fontFamily.semiBold,
    color: colors.black,
    marginRight: 10,
  },
  dayText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.darkWhite,
    fontFamily: fontFamily.regular,
  },
  monthText: {
    fontSize: 16,
    color: '#A0A0A0',
  },
  todayButton: {
    backgroundColor: colors.lightWhite,
    borderColor: colors.darkWhite,
    borderWidth: 0.3,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  todayText: {
    fontSize: 14,
    color: '#BCC1CD',
    marginLeft: 10,
    fontWeight: '500',
    fontFamily: fontFamily.medium,
  },
  container2: {
    alignItems: 'center',
  },
  divider: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
    height: 0.5,
    backgroundColor: '#DBDBDB',
    borderWidth: 0.12,
  },
});

export default VenueSchedule;
