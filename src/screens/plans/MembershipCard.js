import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { TickIcon } from '../../constants/svgs';
import { colors, fontFamily } from '../../constants';
import { DollarIcon, PoundIcon, EuroIcon } from '../../constants/svgs'; // <-- Add your icons here

const MembershipCard = ({ plan }) => {
  if (!plan) {
    return null;
  }

  const formatAmount = amount => {
    if (!amount) return { whole: '0', decimal: '00' };
    const total = Number(amount);
    const whole = Math.floor(total / 100);
    const decimal = (total % 100).toString().padStart(2, '0');
    return { whole, decimal };
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
    <View style={styles.card}>
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
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
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
    borderWidth: 0.5,
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
  wholeAmount: {
    fontSize: 64.5,
    fontFamily: fontFamily.bold,
    color: colors.black,
    fontWeight: '600',
  },
  decimalAmount: {
    fontSize: 38,
    fontFamily: fontFamily.semiBold,
    color: colors.black,
    fontWeight: '600',
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
    marginLeft: 8,
  },
});

export default MembershipCard;
