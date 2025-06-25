// screens/Home/QRScannerScreen.js
import React, {useState} from 'react';
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
import Header from '../../components/header';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import MasterCard from '../../assets/icons/masterCard';
import ArrowIcon from '../../assets/icons/ArrowIcon';
import Button from '../../components/Button';
import {colors, fontFamily} from '../../constants';
import BlueBgComponent from '../../components/BlueBgComponent';

// import QRCodeScanner from 'react-native-qrcode-scanner';
// import {RNCamera} from 'react-native-camera';

const PaymentDetails = ({navigation}) => {
  const [selectedCard, setSelectedCard] = useState(0); // 0 for first, 1 for second
  const [showSuccess, setShowSuccess] = useState(false);

  const onSuccess = e => {
    console.log('QR Code scanned: ', e.data);
    // Handle scanned data
    navigation.goBack(); // or navigate somewhere else
  };

  if (showSuccess) {
    return (
      <BlueBgComponent
        heading="Successful Payment Done!"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.."
        btnText="Explore"
        onPressBtn={() =>
          navigation.reset({
            index: 0,
            routes: [{name: 'TabNav'}],
          })
        }
        theme="blackWhite"
      />
    );
  }

  return (
    // <>
    <ScrollView contentContainerStyle={styles.container} style={{flex: 1}}>
      <SafeAreaView />
      <View style={styles.headerContainer}>
        <Header
          label={'Payment Details     '}
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
        <Pressable
          style={styles.paymentCard}
          onPress={() => setSelectedCard(0)}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
              paddingHorizontal: widthPercentageToDP(4),
              paddingVertical: heightPercentageToDP(0.2),
            }}>
            {/* Radio Button */}
            <Pressable
              onPress={() => setSelectedCard(0)}
              style={{marginRight: 12}}>
              <View style={styles.radioButton}>
                {selectedCard === 0 && (
                  <View style={styles.selectedRadioButton} />
                )}
              </View>
            </Pressable>
            {/* <MasterCard /> */}
            <View>
              <Text style={styles.cardText}>Wallet Payment</Text>
              <Text style={styles.cardDots}>•••••••••••••••••••••</Text>
            </View>
          </View>

          <ArrowIcon />
        </Pressable>
        <Pressable
          style={styles.paymentCard}
          onPress={() => setSelectedCard(1)}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
              paddingHorizontal: widthPercentageToDP(4),
            }}>
            {/* Radio Button */}
            <Pressable
              onPress={() => setSelectedCard(1)}
              style={{marginRight: 12}}>
              <View style={styles.radioButton}>
                {selectedCard === 1 && (
                  <View style={styles.selectedRadioButton} />
                )}
              </View>
            </Pressable>
            <MasterCard />
            <View>
              <Text style={styles.cardText}>Card</Text>
              <Text style={styles.cardDots}>••••••••••3549</Text>
            </View>
          </View>

          <ArrowIcon />
        </Pressable>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginBottom: heightPercentageToDP(2),
          width: '90%',
          alignSelf: 'center',
        }}>
        <Button
          handleClick={async () => {
            setShowSuccess(true);
          }}
          text="Continue"
          elevation={false}
          textBold={true}
          marginTop={15}
          borderLess={false}
          widthSize={'large'}
        />
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
    flex: 1,
  },
  headerContainer: {
    paddingVertical: 4,

    backgroundColor: '#fff', // To show shadow on iOS

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
    // fontWeight: 'bold',
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
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
  },
  cardDots: {
    marginLeft: 'auto',
    fontSize: 18,
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
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedRadioButton: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#000',
  },
});

export default PaymentDetails;
