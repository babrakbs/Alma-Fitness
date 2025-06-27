import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import { colors, fontFamily } from '../constants';

// Define custom locale for single-letter days
moment.updateLocale('en-single-letter', {
  weekdaysShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
});

const CalendarComponent = ({ selectedDate, onDateChange }) => {
  return (
    <View style={styles.container}>
      <CalendarStrip
        calendarAnimation={{ type: 'sequence', duration: 30 }}
        scrollable
        dayNameFormat={'d'} // <- Add this line
        iconLeft={''}
        iconRight={''}
        style={styles.calendar}
        calendarColor={colors.white}
        dateNumberStyle={{
          color: colors.black,
          fontFamily: fontFamily.regular,
          fontSize: 16,
        }}
        locale={{
          name: 'en-single-letter',
          config: {
            weekdaysShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
          },
        }}
        dateNameStyle={{
          color: colors.darkWhite,
          fontFamily: fontFamily.regular,
          paddingVertical: 5,
          fontSize: 14,
          // height: 30,
        }}
        highlightDateNumberStyle={{
          color: colors.black,
          fontFamily: fontFamily.regular,
          fontSize: 16,
        }}
        highlightDateNameStyle={{
          color: colors.darkWhite,
          fontFamily: fontFamily.regular,
          paddingVertical: 5,
        }}
        highlightDateContainerStyle={{
          backgroundColor: colors.lightWhite,
          alignItems: 'center',
          justifyContent: 'center',
          // borderColor: colors.darkGray,
          // borderWidth: 0.5,
          // width: 50,
          // height: 80,
          borderRadius: 10,
          // height: 70,
          // paddingVertical: 5,
        }}
        iconContainer={{ flex: 0.01 }}
        showMonth={false}
        selectedDate={selectedDate}
        onDateSelected={onDateChange}
        markedDates={[
          { date: moment('2025-02-19'), dots: [{ color: colors.darkGray }] },
          { date: moment('2025-02-23'), dots: [{ color: colors.darkGray }] },
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
    height: 100,
    // paddingBottom: 10,
  },
});

export default CalendarComponent;
