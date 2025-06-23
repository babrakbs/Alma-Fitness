/** @format */

// This component is for header with back button and label with it.

import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {colors, fontFamily} from '../constants';
import axiosInstance from '../helper/axiosInstance';
import HeartIconBlack from '../assets/icons/HeartIconBlack';
import HeartIconWhite from '../assets/icons/HeartIconWhite';
import ArrowBackIcon from '../assets/icons/arrowback';
import ArrowBackWhiteIcon from '../assets/icons/arrowbackwhite';

const Header = ({
  label,
  backButtonPress,
  navigation,
  showArrow,
  theme = 'light',
  removeFlex,
  marginTop,
  paddingVertical,
  isClass = false,
  classId,
  venueId,
  initialIsFavourite = false,
  onFavouriteChanged,
  showFavourite = false,
}) => {
  const navigationC = useNavigation();
  const [isFavourite, setIsFavourite] = useState(initialIsFavourite);
  const [favouriteError, setFavouriteError] = useState('');

  const handleBackButtonPress = () => {
    navigationC.goBack();
  };

  const handleFavouritePress = async () => {
    if (!venueId) return;

    const newFavouriteState = !isFavourite;
    setIsFavourite(newFavouriteState);
    setFavouriteError('');

    try {
      const endpoint = newFavouriteState
        ? '/api/addFavourite'
        : '/api/removeFavourite';
      const actionText = newFavouriteState ? 'add' : 'remove';

      const response = await axiosInstance.post(endpoint, {
        ...(isClass ? {venue_id: venueId} : {class_id: classId}),
      });
      if (
        response.data &&
        response.data.meta &&
        response.data.meta.code !== 200
      ) {
        console.error(`Failed to ${actionText} favourite:`, response.data);
        setFavouriteError(
          response.data.meta.message || `Could not ${actionText} favourite.`,
        );
        setIsFavourite(!newFavouriteState);
        return;
      }

      if (!newFavouriteState && typeof onFavouriteChanged === 'function') {
        onFavouriteChanged();
      }

      console.log(`Successfully ${actionText}d favourite:`, response.data);
    } catch (error) {
      const actionText = newFavouriteState ? 'add' : 'remove';
      console.error(`Error trying to ${actionText} favourite:`, error);
      let errorMessage = `An error occurred while trying to ${actionText} favourite. Please try again.`;
      if (error.response && error.response.data) {
        const data = error.response.data;
        if (
          data.meta &&
          typeof data.meta.message === 'string' &&
          data.meta.message.trim() !== ''
        ) {
          errorMessage = data.meta.message;
        } else if (
          typeof data.message === 'string' &&
          data.message.trim() !== ''
        ) {
          errorMessage = data.message;
        }
      }
      setFavouriteError(errorMessage);
      setIsFavourite(!newFavouriteState);
    }
  };

  return (
    <>
      {theme == 'light' ? (
        <View
          style={[
            styles.container,
            {
              marginTop: marginTop,
              paddingVertical: paddingVertical ? paddingVertical : 20,
            },
          ]}>
          {showArrow ? (
            <Pressable
              onPress={
                backButtonPress ? backButtonPress : handleBackButtonPress
              }>
              <ArrowBackIcon />
            </Pressable>
          ) : (
            <View />
          )}
          <Text style={styles.label}>{label}</Text>
          {showFavourite && venueId ? (
            <Pressable onPress={handleFavouritePress} style={styles.heartIcon}>
              {isFavourite ? <HeartIconBlack /> : <HeartIconWhite />}
            </Pressable>
          ) : (
            <View />
          )}
        </View>
      ) : (
        <View style={[styles.container, {marginTop: marginTop}]}>
          {showArrow ? (
            <Pressable
              onPress={
                backButtonPress ? backButtonPress : handleBackButtonPress
              }>
              <ArrowBackWhiteIcon />
            </Pressable>
          ) : (
            <View />
          )}
          <Text style={[styles.label, {color: '#F5F5F5'}]}>{label}</Text>
          {showFavourite && venueId ? (
            <Pressable onPress={handleFavouritePress} style={styles.heartIcon}>
              {isFavourite ? (
                <HeartIconBlack />
              ) : (
                <HeartIconWhite />
                // <HeartIconWhites width={24} height={24} />
              )}
            </Pressable>
          ) : (
            <View />
          )}
        </View>
      )}
      {/* {favouriteError ? (
        <Text style={styles.errorText}>{favouriteError}</Text>
      ) : null} */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    // flex: 0.1,
  },
  label: {
    fontSize: 20,
    fontWeight: '500',
    color: colors.black,
    fontFamily: fontFamily.medium,
  },
  heartIcon: {
    padding: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 2,
  },
});

export default Header;
