import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import VenueCard from './VenueCard';

const Venues = ({classVenues}) => {
  return (
    <View style={styles.contianer}>
      <View style={{marginVertical: 20}}>
        {Array.isArray(classVenues) && classVenues.length > 0 ? (
          classVenues.map((venue, idx) => (
            <VenueCard
              key={venue.class_id || idx}
              name={venue.class_title}
              imageUrl={
                typeof venue.image === 'string'
                  ? venue.image.replace(/`/g, '').trim()
                  : ''
              }
              time={
                venue.start_time && venue.end_time
                  ? `Opening hours: ${venue.start_time} - ${venue.end_time}`
                  : 'Opening hours: 9:00 - 22:00'
              }
              location={venue.location || ''}
              km={venue.km || ''}
              workoutType={venue.workout_type}
              price={venue.price}
              id={venue.class_id}
              right={10}
              // Add any other props you need
            />
          ))
        ) : (
          <Text style={styles.availableText}>No venues available.</Text>
        )}
      </View>
    </View>
  );
};

export default Venues;

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
});
