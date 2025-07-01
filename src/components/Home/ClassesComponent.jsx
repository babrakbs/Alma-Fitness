/** @format */

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ClassesCard from './ClassesCard';
import ClassesCardAttached from './ClassesCardAttached';

const ClassesComponent = ({classVenues}) => {
  return (
    <View style={styles.contianer}>
      <View style={{marginTop: 20}}>
        {Array.isArray(classVenues) && classVenues.length > 0 ? (
          classVenues.map((d, index) => (
            <ClassesCardAttached
              key={d?.class_id || index}
              id={d?.class_id}
              title={d?.class_title || ''}
              // date={
              //   d?.start_date
              //     ? new Date(d?.start_date)?.toLocaleDateString()
              //     : ''
              // }
              // time={
              //   d?.start_time && d?.end_time
              //     ? `${d?.start_time} - ${d?.end_time}`
              //     : ''
              // }
              location={d?.class_venue_address}
              price={d.price === 0 ? 'Free' : `€${d.price}`}
              date={(() => {
                const date = new Date(d.start_date);
                const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
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
              time={`${d.start_time?.slice(0, 5)} - ${d.end_time?.slice(0, 5)}`}
            />
          ))
        ) : (
          <Text style={styles.availableText}>No classes available.</Text>
        )}
      </View>
    </View>
  );
};

export default ClassesComponent;

const styles = StyleSheet.create({
  contianer: {
    width: '95%',
    margin: 'auto',
  },
  availableText: {
    color: '#46515A',
    fontWeight: '400',
    fontSize: 12,
  },
  shaddow: {
    // shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    elevation: 16,
  },
});
