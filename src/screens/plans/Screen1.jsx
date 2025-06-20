import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import Button from '../../components/Button';
import Plan1IconPlanIcon1 from '../../assets/icons/PlanIcon1';
import { PlanIconOne, TickIcon } from '../../constants/svgs';
import PlanIcon1 from '../../assets/icons/PlanIcon1';
import PlanIcon2 from '../../assets/icons/PlanIcon2';
import PlanIcon3 from '../../assets/icons/PlanIcon3';
import PlanIcon4 from '../../assets/icons/PlanIcon4';
import { useNavigation } from '@react-navigation/native';
import { colors, fontFamily } from '../../constants';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const plansData = {
  Monthly: {
    0: {
      bgColor: '#DBDCDB',
      primaryColor: '#15161E',
      planName: 'Basic Plan',
      memberShipColor: '#46515A',
      credits: '25 credits',
      price: '€29',
      perSpan: '/month',
      heading: 'Get Started',
      descreption:
        'Perfect for those who want flexibility without overcommitting. Start small, explore your options.',
      workouts: 'Approximately 2-4 workouts.',
      stepperIcon: <PlanIcon1 />,
      button: 'Continue',
    },
    // 1: {
    //   bgColor: '#818C81',
    //   primaryColor: '#F5F5F5',
    //   planName: 'Active Plan',
    //   memberShipColor: '#AEAEAE',
    //   credits: '45 credits',
    //   price: '€59',
    //   perSpan: '/month',
    //   heading: 'Stay Consistent',
    //   descreption:
    //     'Balance your routine with a plan that supports regular workouts. Reliable and straightforward.',
    //   workouts: 'Approximately 5-10 workouts.',
    //   stepperIcon: <PlanIcon2 />,
    //   button: 'Choose Active',
    // },
    // 2: {
    //   bgColor: '#46515A',
    //   primaryColor: '#F5F5F5',
    //   planName: 'Pro Plan',
    //   memberShipColor: '#AEAEAE',
    //   credits: '65 credits',
    //   price: '€89',
    //   perSpan: '/month',
    //   heading: 'Level Up',
    //   descreption:
    //     'Designed for users who are serious about their fitness journey and want more access to different workouts.',
    //   workouts: 'Approximately 8-15 workouts.',
    //   stepperIcon: <PlanIcon3 />,
    //   button: 'Choose Pro',
    // },
    // 3: {
    //   bgColor: '#373A36',
    //   primaryColor: '#F5F5F5',
    //   planName: 'Plus Plan',
    //   memberShipColor: '#AEAEAE',
    //   credits: '85 credits',
    //   price: '€129',
    //   perSpan: '/month',
    //   heading: 'All-in Access',
    //   descreption:
    //     'For those who need complete freedom to workout as often as they like. Full access, full flexibility.',
    //   workouts: 'Approximately 15-20+ workouts.',
    //   stepperIcon: <PlanIcon4 />,
    //   button: 'Choose Plus',
    // },
  },
  // Yearly: {
  //   0: {
  //     bgColor: '#DBDCDB',
  //     primaryColor: '#15161E',
  //     planName: 'Basic Plan',
  //     memberShipColor: '#46515A',
  //     credits: '90 credits',
  //     price: '€290',
  //     perSpan: '/year',
  //     heading: 'Get Started',
  //     descreption:
  //       'Perfect for those who want flexibility without overcommitting. Start small, explore your options.',
  //     workouts: 'Approximately 2-4 workouts.',
  //     stepperIcon: <PlanIcon1 />,
  //     button: 'Choose Basic',
  //   },
  //   1: {
  //     bgColor: '#818C81',
  //     primaryColor: '#F5F5F5',
  //     planName: 'Active Plan',
  //     memberShipColor: '#AEAEAE',
  //     credits: '145 credits',
  //     price: '€590',
  //     perSpan: '/year',
  //     heading: 'Stay Consistent',
  //     descreption:
  //       'Balance your routine with a plan that supports regular workouts. Reliable and straightforward.',
  //     workouts: 'Approximately 5-10 workouts.',
  //     stepperIcon: <PlanIcon2 />,
  //     button: 'Choose Active',
  //   },
  //   2: {
  //     bgColor: '#46515A',
  //     primaryColor: '#F5F5F5',
  //     planName: 'Plus Plan',
  //     memberShipColor: '#AEAEAE',
  //     credits: '65 credits',
  //     price: '€890',
  //     perSpan: '/year',
  //     heading: 'Level Up',
  //     descreption:
  //       'Designed for users who are serious about their fitness journey and want more access to different workouts.',
  //     workouts: 'Approximately 8-15 workouts.',
  //     stepperIcon: <PlanIcon3 />,
  //     button: 'Choose Pro',
  //   },
  //   3: {
  //     bgColor: '#373A36',
  //     primaryColor: '#F5F5F5',
  //     planName: 'Pro Plan',
  //     memberShipColor: '#AEAEAE',
  //     credits: '85 credits',
  //     price: '€1290',
  //     perSpan: '/year',
  //     heading: 'All-in Access',
  //     descreption:
  //       'For those who need complete freedom to workout as often as they like. Full access, full flexibility.',
  //     workouts: 'Approximately 15-20+ workouts.',
  //     stepperIcon: <PlanIcon4 />,
  //     button: 'Choose Plus',
  //   },
  // },
};

const conditions = [
  'Activate your membership and save on workouts.',
  'Book any workout and pay as you go.',
  'You can cancel your membership anytime.',
  'Price includes VAT.',
]

const Screen1 = ({ selectedSpan, carouselIndex, isScrolling, item }) => {
  const navigation = useNavigation();
  console.log('her is the selected plans ===>', selectedSpan, item);
  const { height } = useWindowDimensions();
  console.log(
    'ISSCROLLING',
    isScrolling,
    carouselIndex,
    selectedSpan,
    item?.id,
  );
  // console.log('HEIGHT', height);

  const getCurrencySymbol = currency => {
    switch (currency?.toUpperCase()) {
      case 'USD':
        return '$';
      case 'EUR':
        return '€';
      case 'GBP':
        return '£';
      default:
        return '$'; // Default to dollar sign if currency is not recognized
    }
  };

  return (
    <>
      <Text
        style={{
          ...styles.getStarted,

          // color: plansData[selectedSpan][`${carouselIndex}`]['primaryColor'],
        }}>
        Get Started
      </Text>
      <Text
        style={{
          ...styles.getStarted,
          fontSize: 14,
          width: '60%',
          marginBottom: 40,
          marginTop: 20,
          // color: plansData[selectedSpan][`${carouselIndex}`]['primaryColor'],
        }}>
        Activate your monthly membership and save on workouts.
      </Text>
      <ScrollView
        style={{
          ...styles.planContainer,
          // backgroundColor: plansData[selectedSpan][`${carouselIndex}`]['bgColor'],
          flexGrow: Platform.OS === 'ios' ? 0.90 : 0.95,
        }}>
        {/* <Text>{props.data}</Text> */}
        <View
          style={{
            ...styles.heading,
            // borderBottomColor:
            //   plansData[selectedSpan][`${carouselIndex}`]['primaryColor'],
          }}>
          {/* <Text
          style={{
            ...styles.planName,
            color: plansData[selectedSpan][`${carouselIndex}`]['primaryColor'],
          }}>
          {plansData[selectedSpan][`${carouselIndex}`]['planName']}
        </Text> */}
          <View style={styles.memberShipView}>
            <Text
              style={{
                ...styles.memberShip,
                // color:
                //   plansData[selectedSpan][`${carouselIndex}`]['memberShipColor'],
              }}>
              Membership
            </Text>
          </View>

          {/* <Text
          style={{
            ...styles.credit,
            color: plansData[selectedSpan][`${carouselIndex}`]['primaryColor'],
          }}>
          {plansData[selectedSpan][`${carouselIndex}`]['credits']}
        </Text> */}
          <Text
            style={{
              ...styles.price,
              // color: plansData[selectedSpan][`${carouselIndex}`]['primaryColor'],
            }}>
            {/* {plansData[selectedSpan][`${carouselIndex}`]['price']} */}
            {/* {getCurrencySymbol(item?.currency)} */}€
            <Text style={styles.price}>
              {item?.amount ? Math.floor(item.amount / 100) : '0'}
            </Text>
            <Text style={[styles.price, styles.decimalPart]}>
              {item?.amount
                ? ',' + (item.amount % 100).toString().padStart(2, '0')
                : ',00'}
            </Text>
            <Text
              style={{
                ...styles.time,
                // color:
                //   plansData[selectedSpan][`${carouselIndex}`]['primaryColor'],
              }}>
              {' '}
              / {item?.recurring}
            </Text>
          </Text>
          <View style={styles.divider} />
          {/* <Text
          style={{
            ...styles.credit,

            color: plansData[selectedSpan][`${carouselIndex}`]['primaryColor'],
          }}>
          Save $30
        </Text> */}
        </View>
        <View style={styles.planHeading}>
          {/* <Text
          style={{
            ...styles.planType,
            color: plansData[selectedSpan][`${carouselIndex}`]['primaryColor'],
          }}>
          {plansData[selectedSpan][`${carouselIndex}`]['heading']}
          </Text> */}
          {conditions.map((feature, idx) => (
            <Text
              key={idx}
              style={{
                ...styles.planPara,
                // color: plansData[selectedSpan][`${carouselIndex}`]['primaryColor'],
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TickIcon />
                <Text style={{ ...styles.planPara, marginLeft: 8 }}>
                  {feature}
                </Text>
              </View>
            </Text>
          ))}
        </View>
        <View style={{ ...styles.footer, marginTop: '2%' }}>
          <Button
            fontSize={15}
            text="Continue"
            widthSize="large2"
            textBold={false}
            // theme="whiteBlack"
            handleClick={() => {
              // navigation.navigate('StartMembership');
              navigation.navigate('MembershipDetail', { planId: item?.id });
            }}
          />
          {/* <Text
          style={{
            color: plansData[selectedSpan][`${carouselIndex}`]['primaryColor'],
            fontSize: 10,
            fontStyle: 'italic',
            paddingTop: 1,
            marginBottom: 15,
          }}>
          *All prices include VAT.
        </Text> */}
          {/* <PlanIconOne />  */}
          {/* <Plan1IconPlanIcon1 /> */}
          {/* {!isScrolling &&
          plansData[selectedSpan][`${carouselIndex}`]['stepperIcon']} */}
        </View>

      </ScrollView>
      <View style={styles.skipButtonContainer}>
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => navigation.navigate('TabNav')}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Screen1;

const styles = StyleSheet.create({
  planContainer: {
    // flex:1,
    // borderWidth: 1,
    // borderColor: 'green',
    width: '95%',
    alignSelf: "center",
    backgroundColor: colors.white,
    borderRadius: 34,
    marginTop: heightPercentageToDP(10),
    // height: 600,
    // height: 600,
  },
  heading: {
    marginTop: '10%',
    // borderWidth: 1,
    height: '30%',
    width: '80%',
    // paddingBottom: '15%',
    // backgroundColor:'red',
    margin: 'auto',
    // borderBottomWidth: 1.24,
  },
  divider: {
    width: '100%',
    alignSelf: 'center',
    // marginTop: '10%',
    marginVertical: heightPercentageToDP(2),
    height: 0.5,
    backgroundColor: colors.lightGray,
    borderWidth: 0.5,
  },
  planName: {
    fontSize: 22.28,
    // color: '#15161E', //Can be a prop
    fontWeight: '600',
  },
  memberShipView: {
    width: '55%',
    height: '30%',
    backgroundColor: colors.lightWhite,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center"
  },
  memberShip: {
    fontSize: 14.86,
    textAlign: 'center',

    fontFamily: fontFamily.medium,

    color: colors.black,
    fontWeight: '400',
  },
  credit: {
    color: colors.black,
    fontSize: 22,
    fontWeight: '600',
    marginTop: 8,
    lineHeight: 26,
  },
  getStarted: {
    color: colors.white,
    fontSize: 26,
    fontFamily: fontFamily.medium,
    fontWeight: '600',
    textAlign: 'center',
    alignSelf: 'center',
    // marginTop: 8,
    // lineHeight: 26,
  },
  price: {
    fontSize: 58,
    fontWeight: '600',
    color: colors.black,
    fontFamily: fontFamily.bold,
    marginTop: 8,
    textAlign: 'left',
  },
  decimalPart: {
    fontSize: 32,
    fontFamily: fontFamily.semiBold,
    color: colors.black,
    fontWeight: '600',
  },
  time: {
    fontSize: 22,
    fontWeight: '400',
    color: colors.black,
    fontFamily: fontFamily.medium,
  },
  planHeading: {
    alignSelf: 'center',
    marginTop: heightPercentageToDP(2),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  planType: {
    fontWeight: '700',
    fontSize: 24,
    color: colors.black,
  },
  planPara: {
    fontWeight: '400',
    color: colors.black, //can be a prop,
    fontSize: 13,
    // marginTop: '5%',
    paddingVertical: '1%'
  },
  footer: {
    // position: 'absolute',
    // marginTop: '20%',

    // paddingBottom: 40,
    // borderWidth: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: '90%',
    // margin: 'auto',
  },
  skipButtonContainer: {
    marginTop: heightPercentageToDP(10),
    width: '100%',
    paddingBottom: 20,
    alignItems: 'center',
  },
  skipButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.white,
    paddingHorizontal: 18,
    paddingVertical: 4,
    textAlign: 'center',
    borderRadius: 100,
  },
  skipButtonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
  },
});
