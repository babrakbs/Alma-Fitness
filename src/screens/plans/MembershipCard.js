/** @format */

import {View, Text, StyleSheet, Platform} from 'react-native';
import React from 'react';
import {TickIcon} from '../../constants/svgs';
import {colors, fontFamily} from '../../constants';
import {DollarIcon, PoundIcon, EuroIcon} from '../../constants/svgs'; // <-- Add your icons here
import {heightPercentageToDP} from 'react-native-responsive-screen';

const MembershipCard = ({plan, width = '90%'}) => {
  if (!plan) {
    return null;
  }

  const formatAmount = amount => {
    if (!amount) return {whole: '0', decimal: '00'};
    const total = Number(amount);
    const whole = Math.floor(total / 100);
    const decimal = (total % 100).toString().padStart(2, '0');
    return {whole, decimal};
  };

  const formattedPrice = formatAmount(plan.amount);

  // Choose symbol based on currency
  let currencySymbol = '';
  if (plan.currency === 'USD') {
    currencySymbol = '$';
  } else if (plan.currency === 'GBP') {
    currencySymbol = '£';
  } else if (plan.currency === 'EUR') {
    currencySymbol = '€';
  } else {
    currencySymbol = plan.currency; // fallback to code if unknown
  }

  return (
    <View style={[styles.card, {width: width}]}>
      <View style={styles.tag}>
        <Text style={styles.tagText}>{'Membership'}</Text>
      </View>
      <Text style={styles.price}>
        {/* {currencySymbol} */}€
        <Text style={styles.wholeAmount}>{formattedPrice.whole}</Text>
        <Text style={styles.decimalAmount}>,{formattedPrice.decimal}</Text>
        <Text style={styles.perMonth}> / {plan.recurring || 'month'}</Text>
      </Text>
      <View style={styles.divider} />
      <View style={styles.benefits}>
        <View style={styles.benefitRow}>
          <TickIcon />
          <Text style={styles.benefitText}>
            {'Activate your membership and save on workouts.'}
          </Text>
        </View>
        <View style={styles.benefitRow}>
          <TickIcon />
          <Text style={styles.benefitText}>
            Book any workout and pay as you go.
          </Text>
        </View>
        <View style={styles.benefitRow}>
          <TickIcon />
          <Text style={styles.benefitText}>
            You can cancel your membership anytime.
          </Text>
        </View>
        <View style={styles.benefitRow}>
          <TickIcon />
          <Text style={styles.benefitText}>Price includes VAT.</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  card: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: heightPercentageToDP(3.5),
    paddingHorizontal: heightPercentageToDP(2.7),
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowRadius: 8,
    elevation: 20,
  },
  tag: {
    backgroundColor: '#F5F4F4',
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
    // height: heightPercentageToDP(0.1),
    backgroundColor: '#15161E',
    borderWidth: Platform.OS === 'ios' ? 0.03 : 0.17,
    marginBottom: heightPercentageToDP(1),
    marginTop: heightPercentageToDP(2),
  },
  tagText: {
    fontSize: 11.45,
    lineHeight:16.5,
    color: colors.black,
    fontFamily: fontFamily.medium,
     
  },
  price: {
    fontSize: 64.5,
    // fontWeight: '600',
    fontFamily: fontFamily.bold,
    color: colors.black,
  },
  wholeAmount: {
    fontSize: 64.5,
    fontFamily: fontFamily.bold,
    color: colors.black,
    // fontWeight: '600',
  },
  decimalAmount: {
    fontSize: 38,
    fontFamily: fontFamily.semiBold,
    color: colors.black,
    // fontWeight: '600',
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
    gap: heightPercentageToDP(0.9)
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
    // fontWeight: '600',
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
     
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  benefitText: {
    fontSize: 13,
    fontFamily: fontFamily.medium,
    textAlign: 'left',
    color: colors.black,
    marginLeft: 15,
  },
});

export default MembershipCard;
