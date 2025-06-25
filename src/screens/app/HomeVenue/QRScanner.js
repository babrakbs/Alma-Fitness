// screens/Home/QRScannerScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  Pressable,
  ImageBackground,
} from 'react-native';
import Header from '../../../components/header';
import {colors, fontFamily} from '../../../constants';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import ClassesCard from '../../../components/Home/ClassesCardAttached';
import ArrowRightIcon from '../../../assets/icons/rightIcon';
import MasterCard from '../../../assets/icons/masterCard';
import ArrowIcon from '../../../assets/icons/ArrowIcon';
import Button from '../../../components/Button';

// import QRCodeScanner from 'react-native-qrcode-scanner';
// import {RNCamera} from 'react-native-camera';

const Checkout = ({navigation}) => {
  const onSuccess = e => {
    console.log('QR Code scanned: ', e.data);
    // Handle scanned data
    navigation.goBack(); // or navigate somewhere else
  };

  return (
    // <>
    <ScrollView contentContainerStyle={styles.container} style={{flex: 1}}>
      <SafeAreaView />
      <View style={styles.headerContainer}>
        <Header
          label={'Full Body + Bands     '}
          showArrow
          theme="light"
          showFavourite={false}
        />
      </View>
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop: heightPercentageToDP(2),
        }}>
        <Text style={styles.sectionTitle}>Booking Details</Text>
        <ClassesCard isCheckout={true} />
        {/* Price Breakdown */}
        <View style={styles.divider} />
        <Text style={styles.sectionTitle}>Price Breakdown</Text>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Subtotal</Text>
          <Text style={styles.priceValue}>€7,59</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>VAT %</Text>
          <Text style={styles.priceValue}>€2,40</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Service Fee</Text>
          <Text style={styles.priceValue}>€2,40</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>€9,99</Text>
        </View>

        {/* Monthly Membership Ad */}
        <Pressable style={styles.membershipCard}>
          <ImageBackground
            source={require('../../../assets/images/bg_calender.png')}
            style={styles.membershipBg}
            imageStyle={{borderRadius: 12}}>
            <Text style={styles.membershipText}>
              Activate your monthly membership{'\n'}and save on workouts.
            </Text>
            <ArrowRightIcon />
          </ImageBackground>
        </Pressable>
        <View style={styles.divider} />
        {/* Payment Method */}
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.paymentCard}>
          <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
            <MasterCard />
            <View>
              <Text style={styles.cardText}>Card</Text>
              <Text style={styles.cardDots}>••••••••••3549</Text>
            </View>
          </View>
          <View>
            <ArrowIcon />
          </View>
        </View>

        {/* Terms and Conditions */}
        <View style={styles.divider} />
        <Text style={styles.sectionTitle}>Terms</Text>
        <Text style={styles.terms}>
          By proceeding, you agree to our{' '}
          <Text style={styles.link}>Terms of Service</Text> and{' '}
          <Text style={styles.link}>Privacy Policy</Text>.
        </Text>

        {/* Book Button */}
        <View style={{marginVertical: heightPercentageToDP(3)}}>
          <Button
            handleClick={async () => {
              console.log('workings');
            }}
            text="Book"
            elevation={false}
            textBold={true}
            marginTop={15}
            borderLess={false}
            widthSize={'large'}
          />
        </View>
      </View>
    </ScrollView>
    // </>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 20,
    // paddingBottom: 40,

    backgroundColor: '#fff',
    // flex: 1,
  },
  headerContainer: {
    elevation: 5, // Android
    paddingVertical: 4,
    shadowColor: '#000', // iOS
    shadowOffset: {width: 0, height: 2}, // iOS
    shadowOpacity: 0.2, // iOS
    shadowRadius: 3, // iOS
    backgroundColor: '#fff', // To show shadow on iOS
    zIndex: 1,
    width: '100%',
    paddingHorizontal: widthPercentageToDP(4),
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: fontFamily.semiBold,
    // fontWeight: '600',
    marginVertical: 8,

    color: 'black',
  },
  bookingCard: {
    backgroundColor: '#f9f9f9',
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
  },
  bookingDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  bookingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 13,
    color: '#888',
  },
  divider: {
    // height: 1,
    backgroundColor: '#eee',
    marginVertical: 16,
    borderWidth: 0.3,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: heightPercentageToDP(1.8),
  },
  priceLabel: {
    color: '#949494',
    // fontWeight: '600',
    fontSize: 18,
    fontFamily: fontFamily.semiBold,
  },
  priceValue: {
    color: '#949494',
    // fontWeight: '600',
    fontSize: 18,
    fontFamily: fontFamily.semiBold,
  },
  totalLabel: {
    // fontWeight: 'bold',
    fontSize: 18,
    // fontWeight: '600',
    fontFamily: fontFamily.semiBold,
    color: colors.black,
  },
  totalValue: {
    // fontWeight: '600', // fontWeight: 'bold',
    fontSize: 18,
    fontFamily: fontFamily.semiBold,
    color: 'black',
  },
  membershipCard: {
    marginVertical: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  membershipBg: {
    borderRadius: 12,
    // padding: 16,
    height: heightPercentageToDP(8),
    paddingHorizontal: widthPercentageToDP(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
  },
  membershipText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
    fontFamily: fontFamily.semiBold,
    flex: 1,
  },
  arrow: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 10,
  },
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: widthPercentageToDP(3),
    borderRadius: 12,
    paddingRight: widthPercentageToDP(4),
    borderColor: 'black',
    borderWidth: 0.5,
    marginVertical: 20,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  cardDots: {
    marginLeft: 'auto',
    fontSize: 16,
    color: 'black',
  },
  terms: {
    fontSize: 13,
    fontWeight: ' 400',
    fontFamily: fontFamily.regular,
    color: 'black',
  },
  link: {
    color: '#0809AC',
    textDecorationLine: 'underline',
  },
  bookButton: {
    backgroundColor: '#111',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  bookText: {
    color: '#fff',
    fontSize: 16,
    // fontWeight: 'bold',
  },
});

export default Checkout;
