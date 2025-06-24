/** @format */

import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useState} from 'react'; // Import useState
import MapPinIcon from '../../assets/icons/MapPinIcon';
import {useNavigation} from '@react-navigation/native';
import {colors, fontFamily} from '../../constants';
import TextLink from './TextLink';
import axiosInstance from '../../helper/axiosInstance'; // Import axiosInstance
import HeartIconBlack from '../../assets/icons/HeartIconBlack';
import HeartIconWhite from '../../assets/icons/HeartIconWhite';
import {toast} from '../../helper/toast';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const VenueCard = ({
  imageUrl,
  pill = 'Pilates',
  name = 'SoulBase',
  time = 'Opening hours: 9:00 - 22:00',
  km = '500m',
  location = 'Sekeri 8 10674 Athens, Greece',
  id = 0,
  initialIsFavourite = false, // Add a prop for initial favourite state
  onFavouriteChanged, // <-- ADD THIS LINE
  right = 20
}) => {
  const {width} = useWindowDimensions();
  const {navigate} = useNavigation();
  const [isFavourite, setIsFavourite] = useState(initialIsFavourite);
  const [favouriteError, setFavouriteError] = useState(''); // For API errors

  const handleFavouritePress = async () => {
    const newFavouriteState = !isFavourite;
    setIsFavourite(newFavouriteState); // Optimistically update UI
    setFavouriteError(''); // Clear previous errors

    try {
      const endpoint = newFavouriteState
        ? '/api/addFavourite'
        : '/api/removeFavourite';
      const actionText = newFavouriteState ? 'add' : 'remove';

      const formData = new FormData();
      formData.append('venue_id', id);

      console.log(`Attempting to ${actionText} favourite for venue ID:`, id);
      const response = await axiosInstance.post(endpoint, {venue_id: id});

      if (
        response.data &&
        response.data.meta &&
        response.data.meta.code !== 200
      ) {
        console.error(
          `Failed to ${actionText} favourite (application-level):`,
          response.data,
        );
        setFavouriteError(
          response.data.meta.message || `Could not ${actionText} favourite.`,
        );
        // setIsFavourite(!newFavouriteState);
        toast(
          response.data.meta.message || `Could not ${actionText} favourite.`,
        );
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
      } else if (error.request) {
        errorMessage = 'No response from server. Please check your connection.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      // setFavouriteError(errorMessage);
      toast(errorMessage);
      setIsFavourite(!newFavouriteState); // Revert UI on error
    }
  };

  return (
    <View style={{borderRadius: 12, paddingVertical: 5, paddingLeft:5,paddingRight:10}}>
      <Pressable
        onPress={() => {
          console.log('VenueCard pressed asd as', id);
          navigate('VenueProfile', {id: id});
        }}>
        <View style={styles.imageContainer}>
          <Image
            style={{height: 196, width: width * 0.95, borderRadius: 20}}
            source={{uri: imageUrl}}
          />
          <Pressable onPress={handleFavouritePress} style={[styles.heartIcon,{right:right}]}>
            {isFavourite ? <HeartIconBlack /> : <HeartIconWhite />}
          </Pressable>
          <View style={styles.pillContainer}>
            <Text style={styles.pillText}>{name}</Text>
          </View>
        </View>

        {/* New Text Row - Name & Time */}
        <View style={styles.textRow}>
          <Text style={styles.venueName}>{name}</Text>
          <Text style={styles.venueTime}>{km ? km : '300km'}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default VenueCard;

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 13,
    // margin: 'auto',
    // backgroundColor: '#FFFFFF',
    // backgroundColor:'red',
    shadowColor: '#000',
    // elevation:10
  },
  heartIcon: {
    position: 'absolute',
    top: 20,
    
  },
  pillContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 21,
    // width: 87,
    // height: 30,
    paddingVertical: widthPercentageToDP(1.2),
    paddingHorizontal: widthPercentageToDP(3),
    // display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 155,
    left: 15,
  },
  pillText: {
    color: colors.black,
    fontFamily: fontFamily.medium,
    fontWeight: '500',
    fontSize: 11.55,
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 8,
    marginBottom: 10,
  },
  venueName: {
    fontSize: 18,
    fontWeight: '500',
    fontFamily: fontFamily.semiBold,
    color: colors.black,
  },
  venueTime: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.darkGray,
  },
  errorText: {
    // Style for the error message
    color: 'red',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 2,
  },
});
