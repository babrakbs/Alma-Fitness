import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ClassesCard from './ClassesCard';
import ClassesCardAttached from './ClassesCardAttached';

const ClassesComponent = ({classVenues}) => {
  return (
    <View style={styles.contianer}>
      <View style={{marginVertical: 20}}>
        {Array.isArray(classVenues) && classVenues.length > 0 ? (
          classVenues.map((d, index) => (
            <ClassesCardAttached
              key={d?.class_id || index}
              id={d?.class_id}
              title={d?.class_title || ''}
              date={
                d?.start_date
                  ? new Date(d?.start_date)?.toLocaleDateString()
                  : ''
              }
              time={
                d?.start_time && d?.end_time
                  ? `${d?.start_time} - ${d?.end_time}`
                  : ''
              }
              location={d?.class_venue_address}
              price={d?.price !== undefined ? d?.price : ''}
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
