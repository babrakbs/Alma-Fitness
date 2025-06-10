import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {colors, fontFamily} from '../../constants';
import {AppleIcon, AppleIconWhite, TickIcon} from '../../constants/svgs';
import Header from '../../components/header';
import Button from '../../components/Button';
import MembershipCard from './MembershipCard';
import axiosInstance from '../../helper/axiosInstance';
import {useSelector} from 'react-redux';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import {useStripe} from '@stripe/stripe-react-native';
import BlueBgComponent from '../../components/BlueBgComponent';
import {useNavigation} from '@react-navigation/native';
import CrossCircleIcon from '../../assets/icons/crossCircle';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const MembershipDetail = ({route}) => {
  const planId = route?.params?.planId;
  const user = useSelector(state => state?.reducer?.user);
  const navigation = useNavigation();
  const [planDetails, setPlanDetails] = React.useState(null);
  const [clientSecret, setClientSecret] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [sheetLoading, setSheetLoading] = React.useState(false);
  const [showResult, setShowResult] = React.useState(null); // "success" | "fail" | null
  const [renewDate, setRenewDate] = React.useState(null);
  const fetchPlanDetails = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/api/getPlan?plan_id=${planId}`,
      );
      // Handle the response data here
      console.log('Plan details:', response.data?.data);
      const {plan} = response.data?.data;
      console.log('Plan details:', plan?.price_id);
      setPlanDetails(plan);
    } catch (error) {
      console.error('Error fetching plan details:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrencySymbol = currency => {
    if (currency === 'USD') return '$';
    if (currency === 'GBP') return '£';
    if (currency === 'EUR') return '€';
    return currency || '';
  };

  // Calculate price in major units (e.g., cents to dollars)
  const formatAmount = amount => {
    if (!amount) return {whole: '0', decimal: '00'};
    const total = Number(amount);
    const whole = Math.floor(total / 100);
    const decimal = (total % 100).toString().padStart(2, '0');
    return {whole, decimal};
  };

  const formattedAmount = planDetails
    ? formatAmount(planDetails.amount)
    : {whole: '0', decimal: '00'};
  const formattedVat = planDetails
    ? formatAmount(planDetails.amount * 0.1)
    : {whole: '0', decimal: '00'};
  const formattedTotal = planDetails
    ? formatAmount(
        Number(planDetails.amount) + Number(planDetails.amount * 0.1),
      )
    : {whole: '0', decimal: '00'};

  useEffect(() => {
    fetchPlanDetails();
  }, []);

  const {initPaymentSheet, presentPaymentSheet} = useStripe();

  const handleNavigation = async priceId => {
    console.log('handleNavigation called with priceId:', priceId);
    try {
      setSheetLoading(true);
      const payload = {
        price_id: priceId,
        name: user?.name,
        email: user?.email,
      };

      const response = await axiosInstance.post('/api/purchasePlan', payload);
      console.log('Response:', response?.data);

      const clientSecret = response?.data?.data?.client_secret;
      const subscriptionId = response?.data?.data?.subscription_id;
      setClientSecret(clientSecret);

      if (clientSecret) {
        const {error: initError} = await initPaymentSheet({
          paymentIntentClientSecret: clientSecret,
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
        });

        if (initError) {
          console.log('Init Error:', initError);
          setShowResult('fail');
          setSheetLoading(false);
          return;
        }

        const {error: presentError} = await presentPaymentSheet();

        if (presentError) {
          console.log('Present Error:', presentError);
          if (presentError.code !== 'Canceled') {
            setShowResult('fail');
          }
          setClientSecret('');
        } else {
          console.log('Payment Success');
          setRenewDate(response?.data?.data?.renew_date || null);
          setShowResult('success');
        }
      }
    } catch (error) {
      console.log('Catch Error:', error);
      if (error?.code !== 'Canceled') {
        setShowResult('fail');
      }
      setClientSecret('');
    } finally {
      setSheetLoading(false);
    }
  };

  // You can now use planId as needed in your component

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f8f8f8',
        }}>
        <ActivityIndicator size="large" color={colors.black} />
      </View>
    );
  }

  if (showResult === 'success') {
    console.log('Showing Success Screen');
    return (
      <BlueBgComponent
        heading="Membership Activated"
        description={
          renewDate
            ? `Renews on ${renewDate}`
            : 'Your membership is now active.'
        }
        bottomText={
          'Automatically renews every month,  you can cancel your membership at any time.'
        }
        isbottomTextColor={true}
        bottomTextColor="#D3D3D3"
        btnText="Continue"
        onPressBtn={() => {
          setShowResult(null);
          navigation.navigate('TabNav');
        }}
        isIcon={false}
        theme="blackWhite"
      />
    );
  }

  if (showResult === 'fail') {
    console.log('Showing Failure Screen');
    return (
      <BlueBgComponent
        heading="Payment Failed"
        description="Review your payment method and try again."
        btnText="Change Payment Method"
        isIcon={true}
        icon={<CrossCircleIcon />}
        onPressBtn={() => {
          setShowResult(null);
          setClientSecret('');
        }}
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
            onPress={() => {
              setShowResult(null);
              setClientSecret('');
            }}>
            <Text
              style={{
                color: colors.white,
                fontWeight: '500',
                fontSize: 16,
                fontFamily: fontFamily.medium,
              }}>
              Cancel
            </Text>
          </TouchableOpacity>
        }
      />
    );
  }

  return (
    <>
      {sheetLoading && (
        <View style={styles.sheetLoadingContainer}>
          <View style={styles.sheetLoadingContent}>
            <ActivityIndicator size="large" color={colors.black} />
            {/* <Text style={styles.sheetLoadingText}>
              Opening payment sheet...
            </Text> */}
          </View>
        </View>
      )}
      <ScrollView style={styles.container}>
        <Header label="Membership       " showArrow={true} />
        {/* <View style={styles.card}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>Membership</Text>
          </View>
          <Text style={styles.price}>
            €9<Text style={{fontSize: 38}}>,99</Text>{' '}
            <Text style={styles.perMonth}>/ month</Text>
          </Text>
          <View style={styles.divider} />
          <View style={styles.benefits}>
            <Text style={styles.benefit}>
              <TickIcon /> Activate your membership and save on workouts.
            </Text>
            <Text style={styles.benefit}>
              <TickIcon /> Book any workout and pay as you go.
            </Text>
            <Text style={styles.benefit}>
              <TickIcon /> You can cancel your membership anytime.
            </Text>
            <Text style={styles.benefit}>
              <TickIcon /> Price includes VAT.
            </Text>
          </View>
        </View> */}
        <MembershipCard plan={planDetails} />

        <View style={styles.billing}>
          <Text style={styles.billingTitle}>Billing</Text>
          <View style={styles.billingRow}>
            <Text style={styles.billingText}>Membership</Text>
            <Text style={styles.billingText}>
              {/* {getCurrencySymbol(planDetails?.currency)} */}€
              <Text style={styles.wholeAmount}>{formattedAmount.whole}</Text>
              <Text style={styles.decimalAmount}>
                ,{formattedAmount.decimal}
              </Text>
            </Text>
          </View>
          <View style={styles.billingRow}>
            <Text style={styles.billingText}>VAT %</Text>
            <Text style={styles.billingText}>
              {/* {getCurrencySymbol(planDetails?.currency)}' */}€
              <Text style={styles.wholeAmount}>{formattedVat.whole}</Text>
              <Text style={styles.decimalAmount}>,{formattedVat.decimal}</Text>
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalText}>
              €
              <Text style={[styles.wholeAmount, {color: colors.black}]}>
                {formattedTotal.whole}
              </Text>
              <Text style={[styles.decimalAmount, {color: colors.black}]}>
                ,{formattedTotal.decimal}
              </Text>
            </Text>
          </View>
          <View style={[styles.divider, {marginTop: '5%'}]} />
        </View>
        <View style={styles.terms}>
          <Text
            style={[
              styles.billingTitle,
              {
                fontSize: 18,
                fontFamily: fontFamily.medium,
                paddingHorizontal: widthPercentageToDP(2),
              },
            ]}>
            Terms
          </Text>
          <Text style={styles.termsText}>
            By proceeding, you agree to our{' '}
            <Text style={styles.link}>Terms of Service</Text> and{' '}
            <Text style={styles.link}>Privacy Policy</Text>. Your card will be
            charged €{formattedAmount.whole},{formattedAmount.decimal} today,
            and your membership will automatically renew every month until
            canceled. You can cancel anytime in the app settings before your
            next billing date to avoid further charges.
          </Text>
        </View>

        <TouchableOpacity style={styles.applePayButton}>
          <AppleIconWhite height={24} width={24} />
          <Text style={styles.applePayText}> Pay</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleNavigation(planDetails?.price_id)}
          style={[styles.applePayButton, {marginBottom: '10%'}]}>
          {/* <AppleIconWhite height={24} width={24}/>  */}
          <Text style={styles.applePayText}> Buy Now</Text>
        </TouchableOpacity>
        {/* <View style={{marginTop:'2%'}}/> */}
        {/* <Button label="Buy Now" /> */}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,

    backgroundColor: '#f8f8f8',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  tag: {
    backgroundColor: colors.lightWhite,
    alignSelf: 'flex-start',
    paddingVertical: '2%',
    paddingHorizontal: '10%',
    borderRadius: 10,
    marginBottom: 10,
  },
  divider: {
    width: '100%',
    alignSelf: 'center',
    // marginTop: '3%',
    height: 0.5,
    backgroundColor: colors.lightGray,
    borderWidth: 0.2,
  },
  tagText: {
    fontSize: 14,
    color: colors.black,
    fontFamily: fontFamily.semiBold,
    fontWeight: '500',
  },
  price: {
    fontSize: 64.5,
    fontWeight: '600',
    fontFamily: fontFamily.bold,
    color: colors.black,
  },
  perMonth: {
    fontSize: 18,
    fontFamily: fontFamily.semiBold,
    color: colors.black,
    fontWeight: '400',
  },
  benefits: {
    marginTop: '5%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  benefit: {
    fontSize: 13,
    marginBottom: 5,
    fontFamily: fontFamily.medium,
    textAlign: 'left',
    color: colors.black,
  },
  billing: {
    marginTop: '10%',
    marginHorizontal: 10,
  },
  billingTitle: {
    fontSize: 18,
    fontWeight: '500',
    fontFamily: fontFamily.semiBold,
    color: colors.black,
    marginBottom: 10,
  },
  billingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  billingText: {
    fontSize: 14,
    fontFamily: fontFamily.semiBold,
    color: colors.darkWhite,
    fontWeight: '500',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  totalText: {
    fontSize: 14,
    fontFamily: fontFamily.bold,
    color: colors.black,
    fontWeight: '600',
  },
  terms: {
    marginTop: 20,
  },
  termsText: {
    fontSize: 13,
    color: colors.black,
    fontFamily: fontFamily.regular,
    paddingHorizontal: '3%',
  },
  link: {
    fontFamily: fontFamily.regular,
    color: colors.purple,
    textDecorationLine: 'underline',
  },
  applePayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: colors.black,
    paddingVertical: 15,
    borderRadius: 30,
  },
  applePayText: {
    color: colors.white,
    fontSize: 19,
    fontFamily: fontFamily.semiBold,
    fontWeight: '500',
  },
  wholeAmount: {
    fontSize: 14,
    fontFamily: fontFamily.bold,
    color: colors.darkWhite,
    fontWeight: '600',
  },
  decimalAmount: {
    fontSize: 14,
    fontFamily: fontFamily.semiBold,
    color: colors.darkWhite,
    fontWeight: '600',
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
  sheetLoadingText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: fontFamily.medium,
    color: colors.black,
  },
});

export default MembershipDetail;
