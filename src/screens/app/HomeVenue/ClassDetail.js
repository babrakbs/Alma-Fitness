import {
  Dimensions,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from 'react-native';
import moment from 'moment';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Header from '../../../components/header';
import AlmaIconSm from '../../../assets/icons/AlmaIconSm';
import AlmaXSIcon from '../../../assets/icons/AlmaXSIcon';
import TiltRectangleIcon from '../../../assets/icons/PersonGray.svg';
import ProfileAvatarImage from '../../../assets/icons/ProfileCoverAvatar';

import Button from '../../../components/Button';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { DangerwarningIcon, TickSuccessIcon } from '../../../constants/svgs';
import { set } from 'date-fns';
import { colors, fontFamily } from '../../../constants';
import ArrowIcon from '../../../assets/icons/ArrowIcon';
import BottomSheet from '@gorhom/bottom-sheet';
import MessageIconScreen from '../../../components/MessageIconScreen';
import BookingComponent from '../../../components/BookingComponent';
import axiosInstance from '../../../helper/axiosInstance';
import {
  CardField,
  StripeProvider,
  useConfirmPayment,
  useStripe,
} from '@stripe/stripe-react-native';
import { useSelector } from 'react-redux';
import { ToastAndroid, Platform, Alert, ActivityIndicator } from 'react-native'; // Add this import for toast
import CustomBottomSheet from '../../../components/CustomBottomSheet';
import StripePaymentSheet from '../../../components/StripePaymentSheet';
import BlueBgComponent from '../../../components/BlueBgComponent';
import CrossCircleIcon from '../../../assets/icons/crossCircle';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import MapPinClass from '../../../assets/icons/MapPinClass.jsx';
import { BlurView } from '@react-native-community/blur';

import { Animated } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

/* ———————————————————————————————————————————
   1.  Constants that govern the collapse range
   ——————————————————————————————————————————— */
const HEADER_MAX_H = hp('30%'); // ≈ 30 % of screen height
const HEADER_MIN_H = hp('10%'); // ≈ 10 % of screen height
const SCROLL_DIST = HEADER_MAX_H - HEADER_MIN_H;

// const StipePayment = ({clientSecret, onSuccess}) =>{
//   console.log('clientSecret', clientSecret);

//   const {confirmPayment, loading} = useConfirmPayment();
//   const [cardDetails, setCardDetails] = useState();
//   const [errorMsg, setErrorMsg] = useState(""); // Add error state
//   const user = useSelector((state)=>state.reducer.user);
//   console.log('user', user?.email);
//   const handlePayPress = async () => {
//     console.log('cardDetails', cardDetails);

//     const {paymentIntent, error} = await confirmPayment(clientSecret, {
//       paymentMethodType: 'Card',
//       paymentMethodData: {
//         email: user?.email
//       },
//     });

//     if (error) {
//       console.log('Payment confirmation error', error);
//     } else if (paymentIntent) {
//       console.log('Success from promise', paymentIntent);
//       onSuccess();

//     }
//   };
//   return (
//     <View style={{ width:'100%', alignItems: 'center', justifyContent: 'center'}}>
//       <Text style={{fontSize:18, fontWeight:'bold', textAlign:'center', color: 'black', marginBottom: 10}}>Pay via card</Text>
//       <CardField
//                     postalCodeEnabled={false}
//                     cardStyle={{
//                       placeholderColor:  false ? '#EBF1F1': '#4D4D4D',
//                       textColor:  false ?  '#EBF1F1': '#4D4D4D',
//                       borderRadius: 30,
//                       // fontFamily: fonts.regular,
//                       backgroundColor: '#EBF1F1',
//                     }}
//                     style={{
//                       height: 50,
//                       width: '100%',
//                       backgroundColor: '#EBF1F1',
//                       marginBottom: 30,

//                       // alignSelf: 'center'
//                     }}

//                   />
//       {errorMsg ? (
//         <Text style={{color:'red', textAlign:'center', marginBottom:10}}>{errorMsg}</Text>
//       ) : null}
//       <Button
//         handleClick={handlePayPress}
//         text={loading ? "Processing..." : "Pay"}
//         disabled={loading}
//         loading={loading}
//         style={{
//           marginTop: 10,
//         }}
//       />
//     </View>
//   );
// }

const ClassDetail = ({ route }) => {
  //   const screenWidth = Dimensions.get('window').width;
  const { width: screenWidth, height } = useWindowDimensions();
  // Remove all modal state variables
  // const [cancelBookingModal, setCancelBookingModal] = useState(false);
  // const [successBookingModal, setSuccessBookingModal] = useState(false);
  // const [warningModal, setWarningModal] = useState(false);
  // const [successCancelModal, setSuccessCancelModal] = useState(false);
  // const [addedCalenderModal, setAddedCalenderModal] = useState(false);
  const user = useSelector(state => state.reducer.user);
  //   console.log('user', user?.email);
  // Add refs for custom sheets
  const successBookingSheetRef = useRef();
  const cancelBookingSheetRef = useRef();
  const warningSheetRef = useRef();
  const successCancelSheetRef = useRef();
  const addedCalendarSheetRef = useRef();
  const classDetailRef = useRef();
  const screenHeight = Dimensions.get('window').height;
  const snapPoint = screenHeight > 800 && Platform.OS === 'android' ? '60%' :Platform.OS === 'ios' ? '58' : '56%';
  const navigation = useNavigation();
  const classId = route?.params?.id;
  const [classDetails, setClassDetails] = useState([]);
  const [statusBooked, setStatusBooked] = useState(false);
  const [publishableKey, setPublishableKey] = useState(
    process.env.Publishable_key,
  );
  // console.log('publishableKey', publishableKey);
  // const fetchPublishableKey = async () => {
  //   const key = await fetchKey(); // fetch key from your server here
  //   setPublishableKey(key);
  // };

  // useEffect(() => {
  //   fetchPublishableKey();
  // }, []);
  const [componentLoading, setComponentLoading] = useState(true);
  const [sheetLoading, setSheetLoading] = useState(false);
  const fetchClassDetails = async classId => {
    try {
      setComponentLoading(true);
      const response = await axiosInstance.get(
        `/api/venueClassDetail?class_schedule_id=${classId}`,
      );
      console.log('response class detaiks', response?.data?.data[0]);
      setClassDetails(response?.data?.data[0]);
      setComponentLoading(false);
    } catch (error) {
      setComponentLoading(false);
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    if (classId) {
      fetchClassDetails(classId);
    }
    // Add a small delay to ensure the component is mounted
    const timer = setTimeout(() => {
      classDetailRef.current?.open();
    }, 100);
    return () => clearTimeout(timer);
  }, [classId]);

  const [clientSecret, setClientSecret] = useState('');
  const [showResult, setShowResult] = useState(null); // "success" | "fail" | null
  const [loading, setLoading] = useState(false);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [showStripeOverlay, setShowStripeOverlay] = useState(false);

  const bookSubscription = async () => {
    if (classDetails?.price === 0) {
      // Show toast for free item
      if (Platform.OS === 'android') {
        ToastAndroid.show('This class is free!', ToastAndroid.SHORT);
      } else {
        Alert.alert('Free Class', 'This class is free!');
      }
      return;
    }
    try {
      setSheetLoading(true);
      const response = await axiosInstance.post(`/api/bookSchedule`, {
        product_name: classDetails?.class_title,
        class_schedule_id: classDetails?.schedule_id,
        class_id: classDetails?.class_id,
        venue_id: classDetails?.venue_id,
        class_venue_id: classDetails?.class_venue_id,
        amount: classDetails?.price,
      });
      const secret = response?.data?.data?.clientSecret;
      console.log('clientSecret', secret);

      if (!secret) {
        throw new Error('No client secret received');
      }

      setClientSecret(secret);
      console.log('about to open ==========>');

      // Initialize payment sheet with minimal configuration first
      const { error: initError } = await initPaymentSheet({
        paymentIntentClientSecret: secret,
        merchantDisplayName: 'Alma Fitness',
        billingDetailsCollectionConfiguration: {
          address: 'never',
          name: 'never',
          email: 'never',
          phone: 'never',
        },
        defaultBillingDetails: {
          email: user?.email,
        },
        appearance: {
          colors: {
            primary: '#000000',
            primaryText: '#000000',
          },
          shapes: {
            borderRadius: 32,
          },
        },
        // Remove returnURL temporarily to test if it's causing the issue
        returnURL: 'almafitness://stripe-redirect',

        allowsDelayedPaymentMethods: true,
      });

      if (initError) {
        console.log('Init Error:', initError);
        Alert.alert('Error', 'Failed to initialize payment. Please try again.');
        setShowResult('fail');
        return;
      }

      // Clear loading state before presenting sheet
      setSheetLoading(false);

      try {
        const { error: presentError } = await presentPaymentSheet();

        if (presentError) {
          console.log('Present Error:', presentError);
          if (presentError.code === 'Canceled') {
            // User dismissed the sheet, just return to normal state
            setShowResult(null);
          } else {
            Alert.alert(
              'Payment Error',
              presentError.message || 'Payment failed. Please try again.',
            );
            setShowResult('fail');
          }
          setClientSecret('');
        } else {
          console.log('Payment Success');
          setShowResult('success');
          setStatusBooked(true);
        }
      } catch (presentError) {
        console.error('Present Sheet Error:', presentError);
        Alert.alert(
          'Error',
          'Failed to present payment sheet. Please try again.',
        );
        setShowResult('fail');
      }
    } catch (error) {
      console.error('Booking error:', error);
      Alert.alert('Error', 'Failed to process payment. Please try again.');
      setShowResult('fail');
      setClientSecret('');
    } finally {
      // Ensure loading state is cleared in all cases
      setSheetLoading(false);
    }
  };
  const [showBlur, setShowBlur] = useState(false);
  const handlePaymentSuccess = () => {
    setClientSecret('');
    setShowStripeOverlay(false);
    setStatusBooked(true);
  };

  useEffect(() => {
    setShowBlur(false);
  }, [cancelBookingSheetRef]);

  const scrollY = useRef(new Animated.Value(0)).current;

  //   /* Height shrinks from 30 % ➜ 10 % */
  const headerHeight = scrollY.interpolate({
    inputRange: [0, SCROLL_DIST],
    outputRange: [HEADER_MAX_H, HEADER_MIN_H],
    extrapolate: 'clamp',
  });

  /* Optional fade as the header gets smaller */
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, SCROLL_DIST / 2, SCROLL_DIST],
    outputRange: [1, 0.8, 0.6],
    extrapolate: 'clamp',
  });

  return (
    <>
      {sheetLoading && (
        <View style={styles.sheetLoadingContainer}>
          <View style={styles.sheetLoadingContent}>
            <ActivityIndicator size="large" color={colors.black} />
          </View>
        </View>
      )}
      {/* Stripe Payment Sheet Modal */}
      {/* <Modal
      isVisible={showStripeOverlay}
      onBackdropPress={() => setShowStripeOverlay(false)}
      style={{margin: 0, justifyContent: 'center', alignItems: 'center'}}
      useNativeDriver
    >
      <View style={{backgroundColor: 'white', borderRadius: 16, padding: 20, width: '90%'}}>
        <StripePaymentSheet
          publishableKey={publishableKey}
          clientSecret={clientSecret}
          loading={loading}
          setLoading={setLoading}
          onSuccess={() => {
            setShowStripeOverlay(false);
            successBookingSheetRef.current?.open();
            setStatusBooked(true);
          }}
          onCancel={() => setShowStripeOverlay(false)}
        />
      </View>
    </Modal> */}
      {/* Bottom Sheet for Stripe Payment */}
      {componentLoading ? (
        <ActivityIndicator
          style={{ height: '100%', justifyContent: 'center' }}
          size="large"
          color="#000"
        />
      ) : showResult ? (
        showResult === 'success' ? (
          <BlueBgComponent
            heading="Booking Confirmed"
            description={` ${classDetails?.class_title}`}
            btnText="Continue"
            onPressBtn={() => {
              setShowResult(null);
            }}
            isIcon={true}
            theme="blackWhite"
            bottomText={
              <Text
                style={{
                  fontSize: 12,
                  color: colors.white,
                  textAlign: 'center',
                  fontFamily: fontFamily.regular,
                  fontWeight: '400',
                }}>
                Cancel at least 6 hours before the class to avoid fees. Scan the
                QR code upon arrival to confirm attendance. Late cancellations
                or no-shows will incur charges as per our policy.
              </Text>
            }
            bottomButton={
              <TouchableOpacity
                style={{
                  borderColor: colors.white,
                  borderWidth: 1,
                  borderRadius: 65,
                  padding: 10,
                  width: '100%',
                  paddingHorizontal: '33%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => addedCalendarSheetRef.current?.open()}>
                <Text
                  style={{
                    color: colors.white,
                     
                    fontSize: 16,
                    fontFamily: fontFamily.medium,
                  }}>
                  Add to Calendar
                </Text>
              </TouchableOpacity>
            }
          />
        ) : (
          <BlueBgComponent
            heading="Booking Failed"
            description="Review your payment method and try again."
            btnText="Change Payment Method"
            isIcon={true}
            onPressBtn={() => {
              setShowResult(null);
            }}
            icon={<CrossCircleIcon />}
            theme="blackWhite"
            bottomButton={
              <TouchableOpacity
                style={{
                  borderColor: colors.white,
                  borderWidth: 1,
                  borderRadius: 65,
                  padding: 10,
                  width: '100%',
                  paddingHorizontal: '33%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => setShowResult(null)}>
                <Text
                  style={{
                    color: colors.white,
                     
                    fontSize: 16,
                    fontFamily: fontFamily.medium,
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            }
          />
        )
      ) : (
        <>
          {Platform.OS === 'ios' ? null : <SafeAreaView />}

          {/* <View> */}
          {/* Background image, absolutely positioned */}
          <Animated.View
            style={[
              styles.header,
              {
                height: headerHeight,
                zIndex: 1,
              },
            ]}>
            <Animated.Image
              source={{ uri: classDetails?.image }}
              style={[styles.headerImg]}
              resizeMode="cover"
            />
            {/* Mask overlay */}
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: 'rgba(0,0,0,0.3)',
              }}
            />
            {showBlur && (
              <BlurView
                style={[StyleSheet.absoluteFill, { zIndex: 1 }]}
                // blurType="light"
                // blurAmount={5}
                // reducedTransparencyFallbackColor="white"

                tint="light"
                intensity={10}
              // style={[style, { borderRadius: 20, overflow: "hidden" }]}
              />
            )}
            {/* Header content */}
            <View
              style={{
                width: '100%',
                margin: 'auto',
                position: 'absolute',

                top: Platform.OS === 'ios' ? heightPercentageToDP(5) : 0,
                paddingHorizontal: '2%',
              }}>
              <Header
                label={classDetails?.class_title}
                showArrow
                theme="black"
                venueId={classDetails?.venue_id}
                classId={classDetails?.class_id}
                isClass={true}
                initialIsFavourite={classDetails?.is_favourite}
                onFavouriteChanged={() => {
                  fetchClassDetails(classId);
                }}
                showFavourite={true}
              />
            </View>
          </Animated.View>

          {/* Foreground scrollable white sheet */}
          <Animated.ScrollView
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.scrollContent,
              {
                // paddingTop: HEADER_MAX_H - 40,
                // marginTop: -40,
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                backgroundColor: 'black',
                zIndex: 999,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.12,
                shadowRadius: 8,
                elevation: 32,
              },
            ]}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false },
            )}>
            <View
              id="details"
              style={{
                borderTopRightRadius: 24,
                borderTopLeftRadius: 24,
                backgroundColor: '#fff',
                paddingTop: 20,
              }}>
              <View
                style={{
                  width: '90%',
                  margin: 'auto',
                }}>
                <View style={{ flexDirection: 'row', gap: 10, marginLeft:widthPercentageToDP(0.2),marginTop: heightPercentageToDP(0.4) }}>
                  <Text
                    style={{
                      color: colors.black,
                      fontFamily: fontFamily.medium,
                       
                      fontSize: 17,
                    }}>
                    {classDetails?.start_date
                      ? `${moment(classDetails.start_date)
                        .locale('en')
                        .format('ddd D MMM')}     ${moment(
                          classDetails.start_time,
                          'HH:mm:ss',
                        ).format('HH:mm')} - ${moment(
                          classDetails.end_time,
                          'HH:mm:ss',
                        ).format('HH:mm')}`
                      : ''}
                  </Text>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: heightPercentageToDP(1.4),
                  }}>
                  <Text
                    style={{
                      fontSize: 28,
                      // fontWeight: '600',
                      fontFamily: fontFamily.semiBold,
                      color: colors.black,
                    }}>
                    {classDetails?.class_title?.trim()}
                  </Text>


                </View>
                <View style={[styles.locationContainer, { marginTop: 20 }]}>
                  {/* <MapPinClass /> */}
                  <MapPinClass />
                  <Text
                    style={[
                      styles.locationText,
                      { marginLeft: 11, fontSize: 15.88 },
                    ]}>
                    AREA Athens, 500m
                  </Text>
                </View>

                <View
                  style={{
                    marginTop: '4%',

                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      // alignItems: 'flex-start',
                    }}>
                    <View style={{ marginTop: 5 }}>
                      <TiltRectangleIcon />
                    </View>
                    <View style={{ marginHorizontal: 7 }}>
                      <Text
                        style={{
                          color: '#8A8A8A',
                           
                          fontSize: 15.88,
                          fontFamily: fontFamily.medium,
                        }}>
                        Available Spots
                      </Text>
                      <Text
                        style={{
                           
                          fontSize: 15.88,
                          color: colors.black,
                          fontFamily: fontFamily.medium,
                        }}>
                        7/10
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: '#F3F3F3',
                  padding: 5,
                  marginTop: 32,
                }}
              />
              <View
                style={{
                  marginTop: 10,
                  paddingHorizontal: 15,
                  paddingVertical: 20,
                  backgroundColor: '#FFFFFF',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={[styles.locationText, { fontSize: 16 }]}>
                  {classDetails?.description}
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: '#F3F3F3',
                  padding: 5,
                  marginTop: 10,
                }}
              />
              <Pressable
                onPress={() => {
                  navigation.navigate('VenueProfile');
                }}
                style={{
                  marginTop: 10,
                  width: '100%',
                  margin: 'auto',
                  paddingHorizontal: 15,
                  paddingVertical: 15,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  backgroundColor: '#FFFFFF',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <ProfileAvatarImage />
                  <Text
                    style={{
                      color: '#15161E',
                       
                      fontSize: 18,
                      fontFamily: fontFamily.semiBold,
                      marginHorizontal: 10,
                    }}>
                    Fitness First
                  </Text>
                </View>

                <Pressable
                  onPress={() => {
                    navigation.navigate('VenueProfile');
                  }}
                  style={{
                    width: 30,
                    height: 37,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 22,
                  }}>
                   <Image source={require('../../../assets/images/arrowRightDark.png')}/>
                </Pressable>
              </Pressable>
              <View
                style={{
                  backgroundColor: '#F3F3F3',
                  padding: 5,
                  marginTop: 10,
                }}
              />
              <View
                style={{
                  marginTop: 10,
                  width: '100%',
                  margin: 'auto',
                  backgroundColor: '#FFFFFF',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  display: 'flex',
                }}>
                <View style={{ width: '100%' }}>
                  <View
                    style={[
                      styles.locationContainer,
                      { justifyContent: 'space-between' },
                    ]}>
                    <Text
                      style={[
                        styles.locationText,
                        { textDecorationLine: 'underline', marginLeft: 10 },
                      ]}>
                      Ieros Kazika 6, 10331 Athens, Greece
                    </Text>
                    <Text
                      style={[
                        styles.locationText,
                        {
                          // textDecorationLine: 'underline',
                          marginRight: 10,
                        },
                      ]}>
                      2km away
                    </Text>
                  </View>
                  <Image
                    borderRadius={widthPercentageToDP(4)}
                    style={[styles.image, { height: heightPercentageToDP(30), width: '95%', alignSelf: 'center', marginTop: heightPercentageToDP(1) }]}
                    resizeMode="center"
                    source={require('../../../assets/icons/Map.png')}
                  />
                </View>
              </View>
              <View
                style={{
                  backgroundColor: '#F3F3F3',
                  padding: 5,
                  marginTop: 10,
                }}
              />
              <View
                style={{
                  width: '100%',
                  margin: 'auto',
                  marginTop: 10,
                  backgroundColor: 'white',
                  paddingHorizontal: 20,
                  paddingTop: 20,
                }}>
                <Text
                  style={[
                    styles.modalTextTitle,
                    { textAlign: 'left', fontSize: 18, fontWeight: 500, fontFamily: fontFamily.medium },
                  ]}>
                  Cancellation Policy
                </Text>

                <View style={styles.sectionClass}>
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: 16,
                      color: '#202226',
                      lineHeight: 24, textAlign: 'left',
                      fontFamily: fontFamily.semiBold,
                    }}>
                    Late Cancellation
                  </Text>
                  <Text
                    style={{
                      fontWeight: '400',
                      fontSize: 14,
                      color: colors.gray,
                      lineHeight: 24,
                      fontFamily: fontFamily.regular,
                      marginTop: 10,
                    }}>
                    Canceling your spot less than 6 hours before the booking
                    starts will incur a €5 late cancellation fee. The
                    remaining cost of the booking will be automatically
                    refunded to your account for future use.
                  </Text>
                </View>
                <View
                  style={[
                    styles.sectionClass,
                    { marginBottom: heightPercentageToDP(4) },
                  ]}>
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: 16,
                      color: '#202226',
                      lineHeight: 24,
                      fontFamily: fontFamily.semiBold,
                    }}>
                    No-Show
                  </Text>
                  <Text
                    style={{
                      fontWeight: '400',
                      fontSize: 14,
                      color: colors.gray,
                      lineHeight: 24,
                      fontFamily: fontFamily.regular,
                      marginTop: 10,
                    }}>
                    Canceling your booking less than 1 hour before it starts,
                    or failing to attend, will result in no refunds being
                    issued.
                  </Text>
                </View>
              </View>
            </View>
          </Animated.ScrollView>
          {/* </View> */}
          {/* <View
                style={{
                  backgroundColor: '#F3F3F3',
                  padding: 5,
                  // marginTop: 32,
                }}
              /> */}
          <View
            style={{
              position: 'fixed',
              left: 0,
              right: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
              height: heightPercentageToDP(20),
              paddingHorizontal: widthPercentageToDP(6),
              // elevation:10,
              backgroundColor: '#fff', // Optional: for visibility
              elevation: 5,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: heightPercentageToDP(-0.3) },
              shadowOpacity: 0.15,
              shadowRadius: 4,
            }}>

            <View
              style={{
                width: '100%',
                paddingHorizontal: widthPercentageToDP(2),
                // paddingBottom: 10,
                flexDirection: 'row',
                // justifyContent: 'space-between',
                alignItems: 'center',
                // backgroundColor: 'red',
                justifyContent: 'space-between',

              }}>
              <Text
                style={{
                  fontWeight: 600,
                  fontSize: 18,
                  color: '#B6B6B6',
                  fontFamily: fontFamily.medium,
                }}>
                Total
                {'\n'}
                <Text
                  style={{
                    fontWeight: 600,
                    fontSize: 11,
                    color: '#B6B6B6',
                  }}>
                  excl VAT
                </Text>
              </Text>
              <Text
                style={{ fontWeight: 600, fontSize: 18, color: colors?.black }}>
                {classDetails?.price === 0
                  ? 'Free'
                  : '$' + classDetails?.price + '.00'}
              </Text>
            </View>

            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                // marginTop: heightPercentageToDP(1),
              }}>
              <Button
                widthSize="xmedium"
                handleClick={() => {
                  addedCalendarSheetRef.current?.open();
                }}
                elevation={false}
                text={'Add to Calendar'}
                textBold={false}
                borderLess={false}
                theme="transparentWhite"
              />
              <Button
                elevation={false}
                widthSize="xmedium"
                handleClick={() => {
                  if (statusBooked) {
                    warningSheetRef.current?.open();
                  } else {
                    cancelBookingSheetRef.current?.open();
                    setShowBlur(true);
                  }
                }}
                text={statusBooked ? 'Cancel Booking' : 'Book'}
                textBold={false}
                borderLess={false}
                theme={statusBooked ? 'grayWhite' : 'blackWhite'}
              />
            </View>
          </View>

          {/* Bottom sheets are now outside the ScrollView */}
          <CustomBottomSheet
            ref={successBookingSheetRef}
            snapPoints={[snapPoint]}>
            <View style={[styles.modalContent]}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TickSuccessIcon />
              </View>
              <Text style={styles.modalTextTitle}>Booking Successfull</Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '400',
                  color: '#202226',
                  textAlign: 'center',
                  lineHeight: 24,
                  marginVertical: 10,
                }}>
                Your booking for {classDetails?.workout_type} Techniques on{' '}
                {classDetails?.start_date
                  ? `${moment(classDetails.start_date).format('D MMM')}`
                  : ''}
                {classDetails?.start_time && classDetails?.end_time
                  ? ` from ${moment(classDetails.start_time, 'HH:mm:ss').format(
                    'h:mm A',
                  )} to ${moment(classDetails.end_time, 'HH:mm:ss').format(
                    'h:mm A',
                  )}`
                  : ''}
                {classDetails?.start_date !== classDetails?.end_date
                  ? classDetails?.end_date
                    ? ` to ${moment(classDetails.end_date).format('D MMM')} `
                    : ''
                  : ''}
                has been confirmed.
              </Text>
              <View
                style={{
                  alignSelf: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  width: '20%',
                }}>
                <AlmaXSIcon />
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: '#202226',
                    textAlign: 'center',
                    lineHeight: 24,
                  }}>
                  10
                </Text>
              </View>
              <View style={{ marginLeft: 80 }}>
                <Button
                  handleClick={() => {
                    successBookingSheetRef.current?.close();
                    setStatusBooked(true);
                  }}
                  text="Done"
                  textBold={true}
                  marginTop={15}
                  borderLess={false}
                  widthSize={'medium'}
                />
              </View>
            </View>
          </CustomBottomSheet>

          {showBlur && (
            <BlurView
              style={[StyleSheet.absoluteFill]}
              // blurType="light"
              // blurAmount={5}
              // reducedTransparencyFallbackColor="white"
              tint="light"
              intensity={10}
            // style={[style, { borderRadius: 20, overflow: "hidden" }]}
            />
          )}
          <CustomBottomSheet
            ref={cancelBookingSheetRef}
            snapPoints={[snapPoint]}
            onOpenChange={setShowBlur}>
            <View
              style={{
                width: '95%',
                alignSelf:'center',
                margin: 'auto',
                marginTop: 10,
                backgroundColor: 'white',
              }}>
              <Text
                style={[
                  styles.modalTextTitle,
                  {
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: 500,
                    fontFamily: fontFamily.medium,
                  },
                ]}>
                Cancellation Policy
              </Text>

              <View style={styles.sectionClass}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 16,
                    color: '#202226',
                    marginTop: heightPercentageToDP(1.2),
                    lineHeight: 24,
                    fontFamily: fontFamily.semiBold,
                  }}>
                  Late Cancellation
                </Text>
                <Text
                  style={{
                    // fontWeight: '400',
                    fontSize: 14,
                    color: colors.gray,
                    lineHeight: 24,
                    fontFamily: fontFamily.regular,
                    marginTop: 10,
                  }}>
                  {`Canceling your spot less than 6 hours before the booking\nstarts will incur a €5 late cancellation fee. The remaining cost\nof the booking will be automatically refunded to your account\nfor future use.`}
                </Text>
              </View>
              <View style={styles.sectionClass}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 16,
                    color: '#202226',
                    lineHeight: 24,
                    fontFamily: fontFamily.semiBold,
                  }}>
                  No-Show
                </Text>
                <Text
                  style={{
                    fontWeight: '400',
                    fontSize: 14,
                    color: colors.gray,
                    lineHeight: 24,
                    fontFamily: fontFamily.regular,

                    marginTop: 10,
                    marginBottom:heightPercentageToDP(3)
                  }}>
            {`Canceling your booking less than 1 hour before it starts, or\nfailing to attend, will result in no refunds being issued.`}
                </Text>
              </View>
            </View>
            <View style={{ marginBottom: heightPercentageToDP(4) }}>
              <View style={{ marginTop: heightPercentageToDP(2) }}>
                <Button
                  handleClick={async () => {
                    cancelBookingSheetRef.current?.close();
                    await bookSubscription();
                  }}
                  text="Book"
                  elevation={false}
                  textBold={true}
                  marginTop={15}
                  borderLess={false}
                  widthSize={'large'}
                />
              </View>
              <View style={{ marginBottom: 20 }}>
                <Button
                  handleClick={async () => {
                    cancelBookingSheetRef.current?.close();
                  }}
                  elevation={false}
                  text="Cancel"
                  marginTop={10}
                  textBold={false}
                  theme="transparentBlack"
                  widthSize={'large'}
                />
              </View>
            </View>
          </CustomBottomSheet>

          {/* Warning Bottom Sheet */}
          <CustomBottomSheet ref={warningSheetRef} snapPoints={['40']}>
            <View style={[styles.modalContent]}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <DangerwarningIcon />
              </View>
              <Text style={styles.modalTextTitle}>Warning</Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '400',
                  color: colors.darkWhite,
                  textAlign: 'center',
                  lineHeight: 24,
                  fontFamily: fontFamily.regular,
                  marginVertical: 10,
                }}>
                Are you sure you want to cancel this booking?
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  width: '100%',
                }}>
                <Button
                  handleClick={() => warningSheetRef.current?.close()}
                  text="Yes"
                  textBold={true}
                  marginTop={15}
                  borderLess={false}
                  widthSize={'small'}
                />
                <Button
                  handleClick={() => warningSheetRef.current?.close()}
                  text="No"
                  textBold={true}
                  marginTop={15}
                  borderLess={false}
                  theme="outline"
                  widthSize={'small'}
                />
              </View>
            </View>
          </CustomBottomSheet>

          {/* Success Cancel Bottom Sheet */}
          <CustomBottomSheet
            ref={successCancelSheetRef}
            snapPoints={[snapPoint]}>
            <View style={[styles.modalContent]}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TickSuccessIcon />
              </View>
              <Text style={styles.modalTextTitle}>Booking Cancelled</Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '400',
                  color: '#202226',
                  textAlign: 'center',
                  lineHeight: 24,
                  marginVertical: 10,
                }}>
                Your booking has been cancelled successfully.
              </Text>
              <View style={{ marginLeft: 80 }}>
                <Button
                  handleClick={() => successCancelSheetRef.current?.close()}
                  text="Done"
                  textBold={true}
                  marginTop={15}
                  borderLess={false}
                  widthSize={'medium'}
                />
              </View>
            </View>
          </CustomBottomSheet>

          {/* Added Calendar Bottom Sheet */}
          <CustomBottomSheet ref={addedCalendarSheetRef} snapPoints={['30']}>
            <View style={[styles.modalContent]}>
              <Text style={styles.modalTextTitle}>Added to Calendar</Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '400',
                  color: '#202226',
                  textAlign: 'center',
                  lineHeight: 24,
                  fontFamily: fontFamily.regular,
                  marginVertical: 10,
                }}>
                This class has been added to your calendar.
              </Text>
              {/* <View style={{ marginLeft: 80 }}>
                <Button
                  handleClick={() => addedCalendarSheetRef.current?.close()}
                  text="Done"
                  textBold={true}
                  marginTop={15}
                  borderLess={false}
                  widthSize={'medium'}
                />

              </View> */}
              <View
                style={{
                  // flexDirection: 'row',
                  justifyContent: 'center',
                  width: '100%',
                  alignItems: 'center'
                }}>
                <Button
                  handleClick={() => addedCalendarSheetRef.current?.close()}
                  text="Yes"
                  textBold={true}
                  marginTop={15}
                  borderLess={false}
                  widthSize={'medium'}
                />
                <Button
                  handleClick={() => addedCalendarSheetRef.current?.close()}
                  text="No"
                  textBold={true}
                  marginTop={15}
                  borderLess={false}
                  theme="whiteBlack"
                  widthSize={'medium'}
                />
              </View>
            </View>
          </CustomBottomSheet>
        </>
      )}
    </>
  );
};

export default ClassDetail;

const styles = StyleSheet.create({
  locationContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 5,
  },
  locationText: {
    color: '#8A8A8A',
     
    fontFamily: fontFamily.medium,
    fontSize: 12,
    textAlign: 'left',
    marginLeft: 5,
  },
  detailText: {
    fontFamily: fontFamily.regular,
    color: colors.darkWhite,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 24,
    marginTop: 12,
  },
  modalContent: {
    backgroundColor: 'white',
    width: '100%',
    height: 'auto',
    alignSelf: 'center',
    borderRadius: 20,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  handleIndicatorS: {
    width: '20%',
    color: colors.lightGray,
  },
  modalTextTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#202226',
    textAlign: 'center',
    fontFamily: fontFamily.medium,
  },
  section: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionClass: {
    marginTop: 10,
    marginBottom: 10,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#202226',
    fontSize: 12,
  },
  text: {
    fontSize: 12,
    color: colors.gray,
  },
  image: {
    width: '100%',
    height: heightPercentageToDP(28),
    marginTop: heightPercentageToDP(2),
  },
  sheetLoadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  sheetLoadingContent: {
    backgroundColor: 'transparent',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },

  root: {
    flex: 1,
    backgroundColor: '#000', // seen while header shrinks
  },

  /* Header */
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    overflow: 'hidden',
    // backgroundColor: 'green',
  },
  headerImg: {
    height: '100%',
    width: '100%',
    // zIndex: -9,
    // backgroundColor: 'green',
  },

  /* Scroll area */
  scrollContent: {
    paddingTop: HEADER_MAX_H, // so content starts *below* hero
    // backgroundColor: 'red',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    minHeight: hp('100%') + HEADER_MAX_H, // enough height for short screens
    zIndex: 2,
  },
  card: {
    paddingHorizontal: wp('6%'),
    paddingVertical: hp('3%'),
  },
  separator: {
    height: 1,
    backgroundColor: '#e8e8e8',
    marginHorizontal: wp('6%'),
    marginVertical: hp('3%'),
  },

  /* Bottom CTA bar */
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('6%'),
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
  },
});