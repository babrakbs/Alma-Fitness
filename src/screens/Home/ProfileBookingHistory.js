import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useMemo, useRef} from 'react';
import Header from '../../components/header';
import SearchBarFilter from '../../components/Home/SearchBar';
import FilterIconSecondary from '../../assets/icons/FilterIconSecondary';
import ClassesCardAttached from '../../components/Home/ClassesCardAttached';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
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
import {ScrollView} from 'react-native-gesture-handler';

const workouts = [
  {
    imageUrl: require('../../assets/images/TwoMenExercise.jpg'),
    heading: 'Flow Pilates',
    subText: 'Pilates Hub',
    dateText: '18 Sept. 13:30 - 14:30',
    address: 'Panormou 130, 10865 Athens, Greece',
    number: '10',
  },
  {
    imageUrl: require('../../assets/images/TwoMenExercise.jpg'),
    heading: 'Yin Yoga',
    subText: 'Tar Studio',
    dateText: '11 July. 18:00 - 19:30',
    address: 'Pl. Asteros 38 10832 Athens Greece',
    number: '10',
  },
  {
    imageUrl: require('../../assets/images/TwoMenExercise.jpg'),
    heading: 'Boxing Techniques',
    subText: 'Dopamine Studio',
    dateText: '18 Sept. 13:30 - 14:30',
    address: 'Panormou 130, 10865 Athens, Greece',
    number: '10',
  },
  {
    imageUrl: require('../../assets/images/TwoMenExercise.jpg'),
    heading: 'Boxing Technique',
    subText: 'Pilates Hub',
    dateText: '18 Sept. 13:30 - 14:30',
    address: 'Panormou 130, 10865 Athens, Greece',
    number: '10',
  },
  {
    imageUrl: require('../../assets/images/TwoMenExercise.jpg'),
    heading: 'Boxing Technique',
    subText: 'Pilates Hub',
    dateText: '18 Sept. 13:30 - 14:30',
    address: 'Panormou 130, 10865 Athens, Greece',
    number: '10',
  },
  {
    imageUrl: require('../../assets/images/TwoMenExercise.jpg'),
    heading: 'Boxing Technique',
    subText: 'Pilates Hub',
    dateText: '18 Sept. 13:30 - 14:30',
    address: 'Panormou 130, 10865 Athens, Greece',
    number: '10',
  },
];

const ProfileBookingHistory = () => {
  const bottomSheetModalRef = useRef();
  const allResultsSheet = useRef();
  const navigation = useNavigation();

  const snapPoints = useMemo(() => ['70%', '90%'], []);
  const allResultsSnapPoints = useMemo(() => ['95%', '95%'], []);

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

  const handleFilterClick = () => {
    console.log('PRessed');
    handlePresentModalPress();
  };

  return (
    <ScrollView
      >
      <View style={{width: '95%', margin: 'auto'}}>
        <Header showArrow={true} label={'Booking History'} theme="light" />
      </View>
      <View style={{marginTop: 25}}>
        <SearchBarFilter
          icon={<FilterIconSecondary />}
          onRightIconClick={handleFilterClick}
        />
      </View>

      <View
        style={{
          width: '95%',
          margin: 'auto',
          marginTop: 15,
          //   borderWidth: 1,
          //   borderColor: 'red',
          ...styles.shaddow,
          marginBottom: 12,
          borderRadius: 21,
          //   width: '90%',
          backgroundColor: 'white',
          borderWidth: 0,
        }}>
        {/* <View
          style={{
            borderWidth: 1,
            width: '100%',
            borderRadius: 40,
            overflow: 'hidden',
          }}> */}
        {workouts?.map((d, index) => (
          <ClassesCardAttached
            attached={true}
            imageUrl={d?.imageUrl}
            address={d?.address}
            dateText={d?.dateText}
            heading={d?.heading}
            key={index}
            number={d.number}
            subText={d?.subText}
            position={index == workouts.length - 1 ? 'last' : index}
          />
        ))}
        {/* </View> */}

        <BottomSheetModal
          enableDismissOnClose
          // style={{zIndex: 999, elevation: 99}}
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
                    navTo="/profile"
                    smallText
                  />
                </NavigationContainer>

                <View
                  style={{
                    width: '87%',
                    margin: 'auto',
                  }}>
                  {preferenceListShort?.map((item, index) => {
                    return (
                      <PreferenceListItem
                        theme="black"
                        key={index}
                        title={item.title}
                        checked={item.checked}
                        handleClick={() => {
                          console.log(item);
                        }}
                      />
                    );
                  })}
                </View>
                <Text
                  style={{
                    color: '#15161E',
                    // fontWeight: '600',
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
                    // height: 60,
                    alignItems: 'center',

                    // alignItems:"center"
                  }}>
                  <View style={{width: '20%'}}>
                    <ClockIcon />
                  </View>
                  <View
                    style={{
                      width: '80%',
                      // borderWidth: 1,
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
                          // marginLeft: 22,
                        }}></View>
                      <View
                        style={{
                          backgroundColor: '#15161E',
                          width: '65%',
                          height: 22,
                          // zIndex: 10,
                        }}></View>
                      <View
                        style={{
                          width: 22,
                          height: 22,
                          backgroundColor: '#F5F5F5',
                          borderRadius: 20,
                          marginLeft: -10,
                          zIndex: 10,
                          // marginLeft: 22,
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
              {/* {Array(50)
              .fill(0)
              .map(() => {
                return (
                  <BottomSheetView
                    style={{
                      borderWidth: 1,
                      borderColor: 'green',
                      height: 30,
                    }}>
                    <Text style={{color: 'red'}}>Helo tjhere</Text>
                  </BottomSheetView>
                );
              })} */}
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
                <View style={{width: '95%', margin: 'auto', marginTop: 17}}>
                  <Input
                    placeholder="Search Location"
                    showLeftIcon
                    leftSVGIcon={<SearchIcon />}
                  />
                </View>
                <View style={{width: '93%', margin: 'auto', marginTop: 15}}>
                  <View
                    style={{
                      width: '87%',
                      margin: 'auto',
                    }}>
                    {PreeferenceListItemsData?.map((item, index) => {
                      return (
                        <PreferenceListItem
                          theme="black"
                          key={index}
                          title={item.title}
                          checked={item.checked}
                          handleClick={() => {
                            console.log(item);
                          }}
                        />
                      );
                    })}
                  </View>
                  <View style={{marginVertical: 48}}>
                    <Button text="Apply" rounded={10} textBold={false} />
                  </View>
                </View>
                {/* {Array(50)
              .fill(0)
              .map(() => {
                return (
                  <BottomSheetView
                    style={{
                      borderWidth: 1,
                      borderColor: 'green',
                      height: 30,
                    }}>
                    <Text style={{color: 'red'}}>Helo tjhere</Text>
                  </BottomSheetView>
                );
              })} */}
              </ScrollView>
            </BottomSheetView>
          </BottomSheetModal>
        </BottomSheetModal>
      </View>
    </ScrollView>
  );
};

export default ProfileBookingHistory;

const styles = StyleSheet.create({
  shaddow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
  },
});
