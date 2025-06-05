import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ClassDetail from '../screens/app/HomeVenue/ClassDetail';
import VenueProfile from '../screens/app/HomeVenue/VenueProfile';

const Stack = createNativeStackNavigator();

const HomeVenueNav = () => {
  return (
    <Stack.Navigator initialRouteName="ClassDetails">
      <Stack.Screen
        options={{headerShown: false}}
        name="ClassDetails"
        component={ClassDetail}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="VenueProfile"
        component={VenueProfile}
      />
    </Stack.Navigator>
  );
};

export default HomeVenueNav;

const styles = StyleSheet.create({});
