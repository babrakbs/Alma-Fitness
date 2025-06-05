import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import MapPinIcon from '../../assets/icons/MapPinIcon';
import {useNavigation} from '@react-navigation/native';
import {HeartIconWhite, HeartIconWhites} from '../../constants/svgs';
import { colors, fontFamily } from '../../constants';

const VenueCardSmall = ({
  imageUrl = require('../../assets/images/practiceimage.jpg'),
  pill = 'What are you up for today?',
  name = 'SoulBase',
  time = 'Opening hours: 9:00 - 22:00',
  location = 'Sekeri 8 10674 Athens, Greece',
}) => {
  const {width} = useWindowDimensions();
  const {navigate} = useNavigation();
  return (
    <Pressable
      onPress={() => {
        // navigate('ClassDetails');
      }}>
      <View style={styles.imageContainer}>
        <Image
          style={{height: 196, width: width * 0.95, borderRadius: 20}}
          source={imageUrl}
        />
        <View
          style={{
            position: 'absolute',
            top: 10,
            right: 16,
          }}>
          {/* <HeartIconWhites width={24} height={24} /> */}
        </View>
        <View
          style={{
            // backgroundColor: '#EFEFEB',
            borderRadius: 21,
            width: 307,
            height: 37,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 80,
            left: 35,
          }}>
          <Text style={{color: colors.white,fontFamily:fontFamily.medium, fontWeight: '400', fontSize: 20}}>
            {pill}
          </Text>
        </View>
        {/* <View
          style={{
            height: 95,
          }}> */}
          {/* <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '90%',
              margin: 'auto',
              //   paddingTop: 10,
            }}>
            <Text style={{color: '#15161E', fontSize: 24, fontWeight: '600'}}>
              {name}
            </Text>
            <Text
              style={{
                color: '#818C81',
                // textDecorationLine: 'underline',
                fontWeight: '500',
                fontSize: 14,
              }}>
              {time}
            </Text>
          </View> */}
          {/* <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '90%',
              margin: 'auto',
              paddingBottom: 10,
            }}>
            <MapPinIcon />
            <Text
              style={{
                color: '#46515A',
                fontWeight: '300',
                fontSize: 12,
                marginHorizontal: 5,
              }}>
              {location}
            </Text>
          </View> */}
        {/* </View> */}
      </View>
    </Pressable>
  );
};

export default VenueCardSmall;

const styles = StyleSheet.create({
  imageContainer: {
    // borderTopRightRadius: 20,
    // borderTopLeftRadius: 20,
    // /paddingBottom: 10,
    borderRadius: 20,
    margin: 'auto',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 5,
    // },
    // shadowOpacity: 0.36,
    // shadowRadius: 6.68,

    // elevation: 11,
  },
});
