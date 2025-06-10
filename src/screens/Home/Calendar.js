import {
  FlatList,
  ImageBackground,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import FilterIcon from '../../assets/icons/filterBlack.svg';
import FilterPillText from '../../components/Home/FilterPillText';
import CalendarComponet from '../../components/calendar';
import ClassesCard from '../../components/Home/ClassesCard';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
  BottomSheetView,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
// import {ScrollView} from 'react-native-gesture-handler';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import Input from '../../components/input';
import SearchIcon from '../../assets/icons/SearchIcon';
import FilterPill from '../../components/Home/FilterPill';
import TextLink from '../../components/Home/TextLink';
import PreferenceListItem from '../../components/preferenceListItem';
import {
  PreeferenceListItemsData,
  preferenceListShort,
} from '../../constants/staticData';
import ClockIcon from '../../assets/icons/ClockIcon';
import Button from '../../components/Button';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import Header from '../../components/header';
import {colors, fontFamily} from '../../constants';
import axiosInstance from '../../helper/axiosInstance';
import moment from 'moment';
import DoubleThumbSlider from '../../components/DoubleThumbSlider';
import {ActivityIndicator} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const filters = [
  'Yoga',
  'Free Training',
  'Pilates',
  'Cardio',
  'CrossFit',
  'View more',
];

const Calendar = () => {
  const navigation = useNavigation();
  const bottomSheetModalRef = useRef();
  // Track multiple selected categories with 'all' as default for UI
  const [selectedCategories, setSelectedCategories] = useState(['all']);
  const [preferenceList, setPreferenceList] = useState(
    PreeferenceListItemsData,
  );
  const [categories, setCategories] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [classVenues, setClassVenues] = useState([]);
  const [filtersOfclasses, setFiltersOfclasses] = useState({
    page: 1,
    limit: 10,
    categories: [], // Empty array initially for API
    date: new Date().toISOString().split('T')[0],
    start_time: '00:00:00',
    end_time: '24:00:00',
  });
  const [loading, setLoading] = useState(false);

  const fetchClassesVenues = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        '/api/venueClasses',
        filtersOfclasses ? filtersOfclasses : {},
      );
      setClassVenues(response?.data?.data?.records);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClassesVenues();
  }, [filtersOfclasses]);

  // Fetch categories from API
  const fetchCategories = async (filters = {}) => {
    try {
      // Pass selected categories and current date/time as filters
      const response = await axiosInstance.get('/api/categoriesList');
      setCategories(response?.data?.data?.records);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Refetch when selectedCategories changes
  useEffect(() => {
    fetchCategories();
  }, [selectedCategories]);

  // Handler for date change (e.g., from CalendarComponent)
  const handleDateChange = date => {
    // If date is a moment object, convert to JS Date
    const jsDate = date instanceof Date ? date : date.toDate();
    setCurrentDate(jsDate);
    setFiltersOfclasses(filters => ({
      ...filters,
      date: jsDate.toISOString().split('T')[0],
    }));
  };

  // Helper to get label for selected date
  const getDateLabel = () => {
    const today = moment().startOf('day');
    const selected = moment(currentDate).startOf('day');
    if (selected.isSame(today)) return 'Today';
    if (selected.isSame(today.clone().subtract(1, 'day'))) return 'Yesterday';
    if (selected.isSame(today.clone().add(1, 'day'))) return 'Tomorrow';
    return selected.format('ddd, MMM D YYYY');
  };

  // Handler for time change (e.g., from slider)
  const handleTimeChange = (startHour, endHour) => {
    // Convert hour (0-24) to "HH:00:00" format
    const pad = n => n.toString().padStart(2, '0');
    const start = `${pad(startHour)}:00:00`;
    const end = `${pad(endHour)}:00:00`;
    console.log('start', start);
    console.log('end', end);
    setFiltersOfclasses(filters => ({
      ...filters,
      start_time: start,
      end_time: end,
    }));
  };

  // Handler for category selection
  const handleCategoryPress = item => {
    if (item.id === 'all') {
      // Toggle 'all' selection - if it's selected, remove it; if not, select it
      setSelectedCategories(prev => {
        const updated = prev.includes('all') ? [] : ['all'];
        setFiltersOfclasses(filters => ({
          ...filters,
          categories: [], // Empty array when 'all' is selected
        }));
        return updated;
      });
    } else {
      setSelectedCategories(prev => {
        // If 'all' was previously selected, remove it
        let updated = prev.filter(id => id !== 'all');

        if (updated.includes(item.id)) {
          updated = updated.filter(id => id !== item.id);
        } else {
          updated = [...updated, item.id];
        }

        setFiltersOfclasses(filters => ({
          ...filters,
          categories: updated, // Send actual category IDs when specific categories are selected
        }));
        return updated;
      });
    }
  };

  // Example: set default filters on mount (date, time, etc.)
  useEffect(() => {
    setFiltersOfclasses({
      page: 1,
      limit: 10,
      categories: [], // Empty array initially for API
      date: currentDate.toISOString().split('T')[0],
      start_time: '00:00:00',
      end_time: '24:00:00',
    });
  }, []);

  const allResultsSheet = useRef();

  const allResultsSnapPoints = useMemo(() => ['95%', '95%'], []);

  const snapPoints = useMemo(() => ['70%', '90%'], []);

  const handlePresentModalPress = useCallback(() => {
    console.log('PREEE', bottomSheetModalRef);
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  const presentAllResultSheet = useCallback(() => {
    // console.log('PREEE', bottomSheetModalRef);
    allResultsSheet.current?.present();
  }, []);

  const onAllResultsSheetChange = useCallback(() => {
    // console.log('PREEE', bottomSheetModalRef);
    // allResultsSheet.current?.present();
  }, []);

  const handleOnPress = id => {
    console.log('id', id);
    navigation.navigate('ClassDetails', {
      id: id,
    });
  };

  // Add new snap points for the main bottom sheet
  const mainSheetSnapPoints = useMemo(() => ['90%'], []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <ImageBackground
          source={require('../../assets/images/OnB1.png')}
          style={styles.backgroundImage}
          resizeMode="cover">
          <View style={styles.mainContainer}>
            <ScrollView style={styles.container}>
              <View style={styles.dateContainerMain}>
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
                  <Text style={styles.todayText}>{getDateLabel()}</Text>
                </TouchableOpacity>
              </View>

              <View style={{width: '95%', margin: 'auto'}}>
                <CalendarComponet
                  selectedDate={moment(currentDate)}
                  onDateChange={handleDateChange}
                />
              </View>

              <View style={styles.container2}>
                <DoubleThumbSlider onValueChange={handleTimeChange} />
              </View>
              <View style={styles.filtersContainer}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Filter')}
                  style={{marginRight: 10}}>
                  <FilterIcon />
                </TouchableOpacity>

                <FlatList
                  scrollEnabled={true}
                  data={[{id: 'all', name: 'All'}, ...categories]}
                  renderItem={({item}) => (
                    <Pressable
                      onPress={() => handleCategoryPress(item)}
                      style={[
                        {
                          marginRight: 8,
                          paddingHorizontal: 16,
                          paddingVertical: 5,
                          borderRadius: 20,
                          borderWidth: 1,
                          borderColor: colors.darkWhite,
                          alignItems: 'center',
                          justifyContent: 'center',
                        },
                        item.id === 'all'
                          ? selectedCategories.includes('all') && {
                              backgroundColor: colors.black,
                            }
                          : selectedCategories.includes(item.id) && {
                              backgroundColor: colors.black,
                            },
                      ]}>
                      <Text
                        style={[
                          {
                            color: colors.black,
                            fontFamily: fontFamily.semiBold,
                            fontWeight: '600',
                            fontSize: 14.3,
                          },
                          item.id === 'all'
                            ? selectedCategories.includes('all') && {
                                color: colors.white,
                              }
                            : selectedCategories.includes(item.id) && {
                                color: colors.white,
                              },
                        ]}>
                        {item?.name}
                      </Text>
                    </Pressable>
                  )}
                  keyExtractor={item => item.id.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
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
                  <Text
                    style={{textAlign: 'center', color: '#888', marginTop: 20}}>
                    No classes found.
                  </Text>
                )}
              </View>

              <BottomSheetModal
                enableDismissOnClose
                backgroundStyle={{backgroundColor: '#F5F5F5'}}
                backdropComponent={props => (
                  <BottomSheetBackdrop
                    {...props}
                    opacity={0.2}
                    enableTouchThrough={true}
                  />
                )}
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}>
                <BottomSheetView style={styles.contentContainer}>
                  <ScrollView>
                    <Text style={styles.filterText}>Filter</Text>
                    <View style={{width: '93%', margin: 'auto', marginTop: 17}}>
                      <Input
                        placeholder="Search Location"
                        showLeftIcon
                        leftSVGIcon={<SearchIcon />}
                      />
                    </View>
                    <View style={{width: '93%', margin: 'auto', marginTop: 15}}>
                      <Text style={styles.creditsText}>Credits</Text>
                      <View style={{marginTop: 11, marginBottom: -10}}>
                        <FilterPill />
                      </View>
                      <NavigationContainer>
                        <TextLink
                          firstText="Type of Workout"
                          navTo="/"
                          smallText
                          handleClick={() => presentAllResultSheet()}
                        />
                      </NavigationContainer>

                      <View
                        style={{
                          width: '87%',
                          margin: 'auto',
                        }}>
                        {preferenceList.slice(0, 8).map((item, index) => {
                          return (
                            <PreferenceListItem
                              theme="black"
                              key={index}
                              title={item.title}
                              checked={item.checked}
                              handleClick={() => {
                                const updatedOptions = preferenceList.map(
                                  (option, i) => {
                                    if (i === index) {
                                      // Toggle the checked state instead of making everything else unchecked
                                      return {
                                        ...option,
                                        checked: !option.checked,
                                      };
                                    }
                                    return option; // Keep other options unchanged
                                  },
                                );
                                setPreferenceList(updatedOptions);
                              }}
                            />
                          );
                        })}
                      </View>
                      <Text
                        style={{
                          color: '#15161E',
                          fontWeight: '600',
                          fontSize: 16,
                          marginTop: 20,
                        }}>
                        Time
                      </Text>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          marginTop: 10,
                          alignItems: 'center',
                        }}>
                        <View style={{width: '20%'}}>
                          <ClockIcon />
                        </View>
                        <View
                          style={{
                            width: '80%',
                            display: 'flex',
                            flexDirection: 'row',
                          }}>
                          <View id="time"></View>
                          <View
                            id="slider"
                            style={{
                              width: '100%',
                              height: 22,
                              borderRadius: 20,
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              backgroundColor: '#3D424A1A',
                              paddingLeft: 20,
                            }}>
                            <View
                              style={{
                                width: 22,
                                height: 22,
                                backgroundColor: '#F5F5F5',
                                borderRadius: 20,
                                marginRight: -10,
                                zIndex: 10,
                              }}></View>
                            <View
                              style={{
                                backgroundColor: '#15161E',
                                width: '65%',
                                height: 22,
                              }}></View>
                            <View
                              style={{
                                width: 22,
                                height: 22,
                                backgroundColor: '#F5F5F5',
                                borderRadius: 20,
                                marginLeft: -10,
                                zIndex: 10,
                              }}></View>
                          </View>
                        </View>
                      </View>
                      <View style={{marginVertical: 30}}>
                        <Button
                          text="Show 34 results"
                          rounded={10}
                          textBold={false}
                          handleClick={presentAllResultSheet}
                        />
                      </View>
                    </View>
                  </ScrollView>
                </BottomSheetView>

                <BottomSheetModal
                  enableDismissOnClose
                  style={{zIndex: 999, elevation: 99}}
                  backgroundStyle={{backgroundColor: '#F5F5F5'}}
                  backdropComponent={props => (
                    <BottomSheetBackdrop
                      {...props}
                      opacity={0.2}
                      enableTouchThrough={true}
                    />
                  )}
                  ref={allResultsSheet}
                  index={1}
                  snapPoints={allResultsSnapPoints}
                  onChange={onAllResultsSheetChange}>
                  <BottomSheetView style={styles.contentContainer}>
                    <ScrollView>
                      <NavigationContainer>
                        <View style={{width: '95%', margin: 'auto'}}>
                          <Header
                            showArrow
                            label={'Type of Workout'}
                            navigation={navigation}
                            backButtonPress={() => {
                              allResultsSheet.current.close();
                            }}
                          />
                        </View>
                      </NavigationContainer>
                      <View
                        style={{width: '95%', margin: 'auto', marginTop: 17}}>
                        <Input
                          placeholder="Search Location"
                          showLeftIcon
                          leftSVGIcon={<SearchIcon />}
                        />
                      </View>
                      <View
                        style={{width: '93%', margin: 'auto', marginTop: 15}}>
                        <View
                          style={{
                            width: '87%',
                            margin: 'auto',
                          }}>
                          {preferenceList?.map((item, index) => {
                            return (
                              <PreferenceListItem
                                theme="black"
                                key={index}
                                title={item.title}
                                checked={item.checked}
                                handleClick={() => {
                                  const updatedOptions = preferenceList.map(
                                    (option, i) => {
                                      if (i === index) {
                                        // Toggle the checked state instead of making everything else unchecked
                                        return {
                                          ...option,
                                          checked: !option.checked,
                                        };
                                      }
                                      return option; // Keep other options unchanged
                                    },
                                  );
                                  setPreferenceList(updatedOptions);
                                }}
                              />
                            );
                          })}
                        </View>
                        <View style={{marginVertical: 48}}>
                          <Button
                            text="Apply"
                            rounded={10}
                            textBold={false}
                            handleClick={() => {
                              allResultsSheet.current.close();
                            }}
                          />
                        </View>
                      </View>
                    </ScrollView>
                  </BottomSheetView>
                </BottomSheetModal>
              </BottomSheetModal>
            </ScrollView>
          </View>
        </ImageBackground>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    margin: 'auto',
    marginVertical: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  headingText: {
    color: '#15161E',
    fontWeight: '700',
    fontSize: 18,
  },
  filtersContainer: {
    flexDirection: 'row',
    width: '95%',
    margin: 'auto',
    alignItems: 'center',
    marginTop: 10,
  },
  timeRange: {
    marginTop: 30,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    width: '95%',
    margin: 'auto',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  textColor: {
    color: colors.black,
    fontFamily: fontFamily.regular,
    fontWeight: '400',
    fontSize: 13,
  },

  filterText: {
    fontWeight: '600',
    color: '#15161E',
    textAlign: 'center',
    marginTop: 5,
  },
  creditsText: {
    color: '#15161E',
    fontWeight: '600',
    fontSize: 16,
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
    fontSize: 18,
    color: colors.black,
    fontWeight: '500',
    fontFamily: fontFamily.medium,
  },

  container2: {
    alignItems: 'center',
  },
  timeline: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    justifyContent: 'center',
    marginBottom: 5,
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 100,
    backgroundColor: '#373A36',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#373A36',
    borderWidth: 1,
  },
  divider: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 25,
    height: 0.5,
    backgroundColor: colors.lightGray,
    borderWidth: 0.2,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: heightPercentageToDP(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
});