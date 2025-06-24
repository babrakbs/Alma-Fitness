import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import SettingIcon from '../../assets/icons/SettingIcon';
import AlmaXSIcon from '../../assets/icons/AlmaXSIcon';
import TextLink from '../../components/Home/TextLink';
import ClassesCard from '../../components/Home/ClassesCard';
import {useNavigation} from '@react-navigation/native';
import {colors, fontFamily} from '../../constants';
import HomeCarousel from './HomeCarousel';
import Settings from '../app/settings/settings';
import axiosInstance from '../../helper/axiosInstance';
import {ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Venues from '../../components/Home/Venues';

const Bookings = ({bookings, loading, navigation}) => {
  const filterBookings = () => {
    const now = new Date();
    const upcoming = [];
    const history = [];

    bookings?.forEach(booking => {
      const bookingDate = new Date(booking.start_date);
      if (bookingDate >= now) {
        upcoming.push(booking);
      } else {
        history.push(booking);
      }
    });

    return {upcoming, history};
  };

  const renderBookingSection = (sectionBookings, title) => {
    if (loading) {
      return (
        <View style={{marginVertical: 20, alignItems: 'center'}}>
          <ActivityIndicator size="large" color={colors.black} />
        </View>
      );
    }

    if (!sectionBookings || sectionBookings.length === 0) {
      return (
        <Text style={{textAlign: 'center', color: '#888', marginTop: 20}}>
          No {title.toLowerCase()} bookings found.
        </Text>
      );
    }

    return (
      <View style={{marginBottom: 10}}>
        {sectionBookings.map((booking, index) => {
          const dateText = moment(booking?.start_date)
            .locale('en')
            .format('ddd D MMM');
          const timeText = `${booking?.start_time?.slice(
            0,
            5,
          )} - ${booking?.end_time?.slice(0, 5)}`;

          return (
            <ClassesCard
              key={booking?.id || index}
              heading={booking?.class_name}
              dateText={dateText}
              timeText={timeText}
              location={booking?.venue_name}
              price={booking?.price === 0 ? 'Free' : `€${booking?.price}`}
              id={booking?.id}
              onPressTap={() =>
                navigation.navigate('ClassDetails', {id: booking?.id})
              }
            />
          );
        })}
      </View>
    );
  };

  const {upcoming, history} = filterBookings();

  return (
    <View style={{marginVertical: 10, marginHorizontal: 10}}>
      {/* Upcoming Bookings Section */}
      <View style={[styles.sectionContainer, {marginTop: 10}]}>
        <Text style={styles.sectionTitle}>Upcoming</Text>
      </View>
      {renderBookingSection(history, 'Upcoming')}

      {/* History Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>History</Text>
      </View>
      {renderBookingSection(history, 'History')}
    </View>
  );
};

const Favorites = ({favourites, loading, navigation, refreshFavourites}) => {
  if (loading) {
    return (
      <View style={{marginVertical: 20, alignItems: 'center'}}>
        <ActivityIndicator size="large" color={colors.black} />
      </View>
    );
  }

  const renderFavoritesContent = () => (
    <>
      <View style={[styles.sectionContainer, {marginTop: 20, marginLeft: 24}]}>
        <Text style={styles.sectionTitle}>Venues</Text>
      </View>
      {/* <HomeCarousel
        venues={favourites?.venues}
        isProfile={true}
        onFavouriteChanged={refreshFavourites}
      /> */}
      <Venues classVenues={favourites?.venues} />

      <Text style={[styles.venueText, {marginLeft: 10}]}>Classes</Text>
      <View style={{marginHorizontal: 10}}>
        {favourites?.classes.map((classItem, index) => {
          const dateText = moment(classItem?.start_date).format('ddd D MMM');
          const timeText = `${classItem?.start_time?.slice(
            0,
            5,
          )} - ${classItem?.end_time?.slice(0, 5)}`;
          return (
            <ClassesCard
              key={classItem?.id || index}
              heading={classItem?.class_name}
              dateText={dateText}
              timeText={timeText}
              location={classItem?.venue_name}
              price={classItem?.price}
              id={classItem?.id}
              onPressTap={() =>
                navigation.navigate('ClassDetails', {id: classItem?.id})
              }
            />
          );
        })}
      </View>
    </>
  );

  return (
    <View
      style={
        {
          // marginVertical: 10,
          // marginHorizontal: 10,
        }
      }>
      <ScrollView
        showsVerticalScrollIndicator={false}
        // contentContainerStyle={{paddingBottom: 20}}
      >
        {renderFavoritesContent()}
      </ScrollView>
    </View>
  );
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState('Bookings');
  const [selectedSpan, setSelectedSpan] = useState('Settings');
  const [userBookings, setUserBookings] = useState([]);
  const [userFavourite, setUserFavourite] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const user = useSelector(state => state?.reducer?.user);

  console.log('user', user);

  const fetchUserSchedule = async () => {
    setLoadingBookings(true);
    try {
      const response = await axiosInstance.post('/api/bookingslist');
      setUserBookings(response.data?.data?.records);
    } catch (e) {
      // Optionally handle error here
    } finally {
      setLoadingBookings(false);
    }
  };

  const fetchUserFavourite = async () => {
    setLoadingBookings(true);
    try {
      const response = await axiosInstance.get('/api/getFavourites');
      setUserFavourite(response.data?.data);
    } catch (e) {
      // Optionally handle error here
    } finally {
      setLoadingBookings(false);
    }
  };

  // Function to refresh favourites from backend
  const refreshFavourites = () => {
    fetchUserFavourite();
  };

  useEffect(() => {
    if (activeTab === 'Bookings') {
      fetchUserSchedule();
    } else {
      fetchUserFavourite();
    }
  }, [activeTab]);

  const navigation = useNavigation();
  return (
    <ScrollView style={{...styles.container}}>
      <SafeAreaView />

      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{}}>
            <View style={styles.span}>
              <Pressable onPress={() => setSelectedSpan('Settings')}>
                <Text
                  style={
                    selectedSpan == 'Settings'
                      ? [styles.selectedText, {marginRight: 10}]
                      : styles.text
                  }>
                  Settings
                </Text>
              </Pressable>

              <Pressable onPress={() => setSelectedSpan('Profile')}>
                <Text
                  style={
                    selectedSpan == 'Profile'
                      ? [styles.selectedText, {marginLeft: 10}]
                      : styles.text
                  }>
                  Profile
                </Text>
              </Pressable>
            </View>
            <View style={styles.profileInfo}>
              <View>
                <Text style={styles.name}>{user?.name}</Text>
                <Text style={styles.name}>#2528664</Text>
                <View style={styles.priceTag}>
                  <Text style={styles.price}>€8</Text>
                </View>
              </View>
            </View>
          </View>
          <Image
            source={
              user?.profile_image
                ? {uri: user.profile_image}
                : {uri: 'https://randomuser.me/api/portraits/women/44.jpg'}
            }
            style={styles.profileImage}
          />
        </View>

        {selectedSpan === 'Settings' ? (
          <Settings />
        ) : (
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: heightPercentageToDP(2),
              }}>
              <View
                style={[
                  styles.tabContainer,
                  {
                    borderBottomColor:
                      activeTab === 'Bookings'
                        ? colors.black
                        : colors.darkWhite,
                  },
                ]}>
                <TouchableOpacity onPress={() => setActiveTab('Bookings')}>
                  <Text
                    style={[
                      styles.tabLabel,
                      activeTab === 'Bookings'
                        ? styles.activeTab
                        : styles.inactiveTab,
                    ]}>
                    Bookings
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={[
                  styles.tabContainer,
                  {
                    borderBottomColor:
                      activeTab === 'Favorites'
                        ? colors.black
                        : colors.darkWhite,
                  },
                ]}>
                <TouchableOpacity onPress={() => setActiveTab('Favorites')}>
                  <Text
                    style={[
                      styles.tabLabel,
                      activeTab === 'Favorites'
                        ? styles.activeTab
                        : styles.inactiveTab,
                    ]}>
                    Favorites
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {activeTab === 'Bookings' ? (
              userBookings && userBookings.length > 0 ? (
                <Bookings
                  bookings={userBookings}
                  loading={loadingBookings}
                  navigation={navigation}
                />
              ) : (
                <Text style={{textAlign: 'center', marginTop: 20}}>
                  No bookings available.
                </Text>
              )
            ) : (
              userFavourite &&
              (userFavourite.venues?.length > 0 ||
              userFavourite.classes?.length > 0 ? (
                <Favorites
                  favourites={userFavourite}
                  loading={loadingBookings}
                  navigation={navigation}
                  refreshFavourites={refreshFavourites}
                />
              ) : (
                <Text style={{textAlign: 'center', marginTop: 20}}>
                  No favourites available.
                </Text>
              ))
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: heightPercentageToDP(1),
  },
  header: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    width: '95%',
    margin: 'auto',
  },
  headerText: {
    color: '#15161E',
    fontWeight: '700',
    fontSize: 18,
    width: '33%',
    textAlign: 'center',
  },
  headerButton: {
    backgroundColor: '#9898980D',
    width: 64,
    height: 25,
    borderRadius: 44,
    borderWidth: 1,

    borderColor: '#BCBCBC',
  },
  headerButtonText: {
    color: '#15161E',
    fontWeight: '400',
    fontSize: 13,
    margin: 'auto',
  },
  profilePicture: {
    width: 128,
    height: 128,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    backgroundColor: '#DADADA',
    borderRadius: 100,
    margin: 'auto',
    marginTop: 43,
  },
  name: {
    // marginTop: 15,
    // margin: 'auto',
    // fontWeight: '500',
    fontSize: 15,
    fontFamily: fontFamily.semiBold,
    color: '#8A8A8A',
  },
  text: {
    color: '#818C81',
    fontWeight: '700',
    fontSize: 20,
    textAlign: 'center',
  },

  secondaryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#373A36',
    textAlign: 'center',
  },

  settingsContainer: {
    position: 'absolute',
    left: 20,
    top: 20,
  },
  settingsText: {
    fontSize: 20,
    color: 'gray',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    // padding: 20,
  },
  profileText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 50,
  },
  profileInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
    fontFamily: fontFamily.regular,
    color: colors.darkWhite,
  },
  id: {
    fontSize: 14,
    color: 'gray',
  },
  priceTag: {
    width: '25%',
    // height: '22%',
    marginTop: heightPercentageToDP(2),
    // padding: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
  },
  price: {
    fontSize: 14,
    textAlign: 'left',
    fontWeight: '400',
    fontFamily: fontFamily.regular,
    color: colors.black,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    // backgroundColor: 'red',
  },
  scene: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    width: '45%',
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.darkWhite,
  },
  tabLabel: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
  },
  activeTab: {
    fontFamily: fontFamily.semiBold,
    fontWeight: '500',
    borderBottomColor: colors.black,
    color: colors.black,
  },
  inactiveTab: {
    color: colors.darkWhite,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    margin: 'auto',
    marginTop: 15,
  },
  span: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  selectedText: {
    color: colors.black,
    fontWeight: '500',
    fontFamily: fontFamily.semiBold,
    fontSize: 24,
  },

  text: {
    color: colors.darkWhite,
    fontFamily: fontFamily.medium,
    fontSize: 24,
    fontWeight: '500',
  },
  venueText: {
    fontFamily: fontFamily.regular,
    color: colors.darkWhite,
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  sectionContainer: {
    width: '95%',
    marginHorizontal: '2.5%',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#B6B6B6',
    fontFamily: fontFamily.regular,
    marginBottom: 15,
  },
});
