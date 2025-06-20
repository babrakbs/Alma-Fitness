import {Image, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import React from 'react';
import MapPinIcon from '../../../assets/icons/NewMapIcon.svg';
import AlmaXSIcon from '../../../assets/icons/AlmaXSIcon';
// import MapPinIcon from '../../assets/icons/MapPinIcon';

const VenuCarouselCard = ({
  imageUrl = require('../../../assets/images/VenueProfile.png'),
  pill = 'Pilates',
  name = 'Strength Training',
  time = '12 Sept. 11:30 - 12:30',
  location = 'Sekeri 8 10674 Athens, Greece',
}) => {
  const {width} = useWindowDimensions();
  return (
    <View>
      <View style={styles.imageContainer}>
        <Image
          style={{
            height: 214,
            width: 315,
            borderRadius: 20,
            // margin: 15,
            margin: 'auto',
            marginTop: 20,
            marginLeft: 18,
            marginRight: 18,
          }}
          source={imageUrl}
        />
        <View
          style={{
            backgroundColor: '#818C81',
            borderRadius: 21,
            width: 87,
            height: 37,
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',
            bottom: 95,
            right: 25,
          }}>
          <View
            style={{
              width: 20,
              height: 20,
              backgroundColor: 'white',
              //   borderWidth: 1,
              //   padding: 'auto',
              borderRadius: 20,
              marginHorizontal: 7,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',

              //   margin: 'auto',
            }}>
            <AlmaXSIcon />
          </View>
          <Text style={{fontSize: 14, fontWeight: '400', color: '#F5F5F5'}}>
            10
          </Text>
        </View>
        <View
          style={{
            height: 95,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '90%',
              margin: 'auto',
              marginTop: 30,
              //   paddingTop: 10,
            }}>
            <Text style={{color: '#46515A', fontSize: 14, fontWeight: '600'}}>
              {name}
            </Text>
            <Text
              style={{
                color: '#373A36',
                // textDecorationLine: 'underline',
                fontWeight: '500',
                fontSize: 10,
              }}>
              {time}
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '90%',
              margin: 'auto',
              paddingBottom: 10,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <MapPinIcon />
              <Text
                style={{
                  color: '#818C81',
                  fontWeight: '400',
                  fontSize: 12,
                  marginHorizontal: 5,
                }}>
                {location}
              </Text>
            </View>
            <Text style={{color: '#373A36', fontSize: 12, fontWeight: '400'}}>
              5 KM away
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default VenuCarouselCard;

const styles = StyleSheet.create({
  imageContainer: {
    // borderTopRightRadius: 20,
    // borderTopLeftRadius: 20,
    // /paddingBottom: 10,
    borderRadius: 20,
    margin: 'auto',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 2,
  },
});
