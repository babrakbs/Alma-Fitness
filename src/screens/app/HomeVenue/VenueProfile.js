import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  StyleSheet,
  Pressable,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Header from '../../../components/header';
import ArrowIcon from '../../../assets/icons/ArrowIcon';
import {useNavigation} from '@react-navigation/native';
import {colors, fontFamily} from '../../../constants';
import ExternalLinkIcon from '../../../assets/icons/External_Link';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const VenueProfile = () => {
  const handleWebsitePress = () => {
    Linking.openURL('https://example.com');
  };
  const navigation = useNavigation();

  return (
    <>
      <ScrollView style={styles.container}>
        <SafeAreaView />

        {/* Header */}
        {/* <View style={styles.header}>
        
        <TouchableOpacity>
          <Text style={styles.backArrow}>{'←'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>AREA Athens</Text>
        <TouchableOpacity>
          <Text style={styles.heart}>♡</Text>
        </TouchableOpacity>
      </View> */}
        <View
          style={{
            width: '100%',
            margin: 'auto',
            backgroundColor: 'white',
            paddingHorizontal: 10,
            paddingBottom: 20,
            //   top: 20,
          }}>
          <Header
            label={'AREA Athens'}
            showArrow
            theme="light"
            venueId={1}
            initialIsFavourite={1}
            onFavouriteChanged={() => {
              console.log('favourite changed');
            }}
            showFavourite={true}
          />

          {/* Main Image */}
          <TouchableOpacity onPress={handleWebsitePress}>
            <Image
              style={styles.mainImage}
              source={{
                uri: 'https://images.pexels.com/photos/317155/pexels-photo-317155.jpeg?cs=srgb&dl=pexels-chevanon-317155.jpg&fm=jpg',
              }}
            />
            <Text style={styles.visitText}>
              <View style={styles.visitContainer}>
                <ExternalLinkIcon />
                <Text style={styles.visitTextContent}>Visit Website</Text>
              </View>
            </Text>
          </TouchableOpacity>
        </View>

        {/* View Schedule */}
        {/* <View style={styles.scheduleContainer}>
        <Text style={styles.viewSchedule}>View Schedule</Text>
        <Text style={styles.arrow}>›</Text>
      </View> */}
        <Pressable
          style={{
            // borderWidth: 1,
            marginTop: 10,
            width: '100%',
            margin: 'auto',
            paddingHorizontal: widthPercentageToDP(2),
            paddingVertical: heightPercentageToDP(2),
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#FFFFFF',
            alignItems: 'center',
          }}
          onPress={() => {
            navigation.navigate('VenueSchedule');
          }}>
          <Text
            style={{
              color: '#15161E',
              fontWeight: '500',
              fontSize: 18,
              marginHorizontal: 10,
            }}>
            View Schedule
          </Text>
          <Pressable
            onPress={() => {
              navigation.navigate('VenueSchedule');
            }}
            style={{
              width: 30,
              height: 37,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 22,
            }}>
            <ArrowIcon />
          </Pressable>
        </Pressable>

        <View
          style={{
            // borderWidth: 1,
            marginTop: 10,
            width: '100%',
            margin: 'auto',
            paddingHorizontal: widthPercentageToDP(2),
            paddingVertical: heightPercentageToDP(2),
            display: 'flex',
            // flexDirection: 'row',
            justifyContent: 'start',
            backgroundColor: '#FFFFFF',
            alignItems: 'flex-start',
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#8A8A8A',
                fontWeight: '400',
                fontSize: 16,
                fontFamily: fontFamily.regular,
                marginHorizontal: 10,
              }}>
              Lorem ipsum dolor sit amet. Et voluptatibus reprehenderit est
              dolor assumenda sit illum Quis ea minus iste et consequatur
              fugiat. Est eaque dolorem 33 quia doloribus aut rerum omnis ad
              quia vitae.
            </Text>
          </View>
          {/* Tags */}
          <View style={styles.tagsContainer}>
            {['Meditation', 'Aqua', 'Wellness'].map(tag => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        <View
          style={{
            marginTop: 10,
            width: '100%',
            margin: 'auto',
            // borderWidth: 1,
            backgroundColor: '#FFFFFF',
            paddingHorizontal: widthPercentageToDP(2),
            paddingVertical: heightPercentageToDP(2),
            display: 'flex',

            borderBottomColor: '#EAEAEA',
            borderBottomWidth: 1,
          }}>
          <View style={{width: '100%'}}>
            <View
              style={[
                styles.locationContainer,
                {justifyContent: 'space-between'},
              ]}>
              {/* <MapPinIcon /> */}
              <Text
                style={[
                  styles.locationText,
                  {textDecorationLine: 'underline', marginLeft: 10},
                ]}>
                Ieros Kazika 6, 10331 Athens, Greece
              </Text>
            </View>
            <Image
              //   width={'100%'}
              style={[
                styles.image,
                {width: '100%'},
                // {marginTop: -15},
                // {marginBottom: -17},
              ]} // Adjust height to maintain aspect ratio
              resizeMode="contain"
              source={require('../../../assets/icons/Map.png')}
            />
          </View>
        </View>

        {/* Opening Hours */}
        <View
          style={{
            marginTop: 10,
            width: '100%',
            margin: 'auto',
            // borderWidth: 1,
            backgroundColor: '#FFFFFF',
            paddingHorizontal: widthPercentageToDP(2),
            paddingVertical: heightPercentageToDP(2),
            display: 'flex',

            marginBottom: 40,
            borderBottomColor: '#EAEAEA',
            borderBottomWidth: 1,
          }}>
          <View style={styles.hoursRow}>
            <Text>Mon - Fri</Text>
            <Text style={styles.time}>10:00 - 22:00</Text>
          </View>
          <View style={styles.hoursRow}>
            <Text>Sat</Text>
            <Text style={styles.time}>10:00 - 22:00</Text>
          </View>
          <View style={styles.hoursRow}>
            <Text>Sun</Text>
            <Text style={styles.time}>10:00 - 22:00</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 24,
  },
  heart: {
    fontSize: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  mainImage: {
    height: 200,
    borderRadius: 10,

    width: '100%',
  },
  visitText: {
    position: 'absolute',
    top: 10,
    left: 2,
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  viewSchedule: {
    fontSize: 16,
    fontWeight: '500',
  },
  arrow: {
    fontSize: 18,
    color: '#888',
  },
  description: {
    color: '#666',
    lineHeight: 20,
    marginTop: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
    marginHorizontal: 10,
  },
  tag: {
    backgroundColor: '#fff',
    borderColor: colors.darkGray,

    borderWidth: 0.5,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#333',
    fontFamily: fontFamily.bold,
  },
  locationText: {
    color: '#888',
    fontSize: 13,
    marginBottom: 8,
  },
  mapImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 20,
  },

  hoursRow: {
    fontSize: 14,
    fontFamily: fontFamily.medium,
    marginBottom: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: '500',
    paddingHorizontal: 10,
  },
  time: {
    color: '#666',
    fontWeight: '400',
  },
  visitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5, // Adds space between icon and text
  },
  visitTextContent: {
    color: colors.white,
    fontFamily: fontFamily.medium,
    textDecorationLine: 'underline',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default VenueProfile;
