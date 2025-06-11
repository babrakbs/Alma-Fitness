import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import {colors, fontFamily} from '../constants';

const CalendarComponent = ({selectedDate, onDateChange}) => {
  return (
    <View style={styles.container}>
      <CalendarStrip
        calendarAnimation={{type: 'sequence', duration: 30}}
        scrollable
        iconLeft={''}
        iconRight={''}
        style={styles.calendar}
        calendarColor={colors.white}
        dateNumberStyle={{
          color: colors.black,
          fontFamily: fontFamily.semiBold,
          fontSize: 16,
        }}
        dateNameStyle={{
          color: colors.darkWhite,
          fontFamily: fontFamily.semiBold,
        }}
        highlightDateNumberStyle={{
          color: colors.black,
          fontFamily: fontFamily.semiBold,
          fontSize: 16,
        }}
        highlightDateNameStyle={{
          color: colors.darkWhite,
          fontFamily: fontFamily.semiBold,
        }}
        highlightDateContainerStyle={{
          backgroundColor: colors.lightWhite,
          borderColor: colors.darkGray,
          borderWidth: 0.5,
          borderRadius: 10,
        }}
        iconContainer={{flex: 0.01}}
        showMonth={false}
        selectedDate={selectedDate}
        onDateSelected={onDateChange}
        markedDates={[
          {date: moment('2025-02-19'), dots: [{color: colors.darkGray}]},
          {date: moment('2025-02-23'), dots: [{color: colors.darkGray}]},
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  calendar: {
    // height: 100,
    // paddingBottom: 10,
    // backgroundColor:'red'
  },
});

export default CalendarComponent;
