import { StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../screens/Home/Profile';
import ProfileBookingUpcoming from '../screens/Home/ProfileBookingUpcoming';
import ProfileBookingHistory from '../screens/Home/ProfileBookingHistory';
import EditUserProfile from '../screens/Home/EditUserProfile';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import ClassDetail from '../screens/app/HomeVenue/ClassDetail';
import Favorites from '../screens/Home/Favorites';

const Stack = createNativeStackNavigator();

const ProfileNav = ({ navigation, route }) => {
  useLayoutEffect(() => {
    console.log(navigation, route);
    const routeName = getFocusedRouteNameFromRoute(route);

    if (routeName == 'EditUserProfile') {
      console.log('JUST LANDED', navigation, routeName);
      navigation.setOptions({
        tabBarVisible: false,
      });
    } else {
      console.log('ELSE BLOCK');
      navigation.setOptions({ tabBarVisible: true });
    }
  }, [navigation, route]);



  return (
    <Stack.Navigator initialRouteName="ProfileNav">
      <Stack.Screen
        options={{ headerShown: false }}
        name="ProfileNav"
        component={Profile}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ProfileBooking"
        component={ProfileBookingUpcoming}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ProfileHistory"
        component={ProfileBookingHistory}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="EditUserProfile"
        component={EditUserProfile}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="Favorites"
        component={Favorites}
      />

    </Stack.Navigator>
  );
};

export default ProfileNav;

const styles = StyleSheet.create({});
