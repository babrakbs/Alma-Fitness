import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import CardInput from '../../../components/cardInput';
import Header from '../../../components/header';
import Button from '../../../components/Button';
import MessageIconScreen from '../../../components/MessageIconScreen';
import BlueBgComponent from '../../../components/BlueBgComponent';
import {AppleIcon} from '../../../constants/svgs';

const CardDetails = ({navigation}) => {
  const [submitted, setSubmitted] = useState(false);

  const handleClick = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <BlueBgComponent
        heading="Membership Activated"
        description="Renews on 29 Mar 2025"
        bottomText="Automatically renews every month, you can cancel your membership at any time."
        headingSize={20}
        secondaryText="Renews on 29 Mar 2025"
        btnText="Continue"
        navigateTo="TabNav"
        purchaseSuccess={true}
        theme="whiteBlack"
        // icon={<AppleIcon />}
      />
    );
  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Header label={'Card Details         '} showArrow />
        <CardInput label="Cardholder Name" placeholder="Cardholder Name" />
        <CardInput
          keyboardType="numeric"
          label="Card Number"
          placeholder="Card Number"
        />
        <View style={styles.cardDetailsRow}>
          <CardInput
            keyboardType="numeric"
            label="CVC"
            placeholder="CVC"
            containerStyle={styles.cvvInput}
          />
          <CardInput
            keyboardType="numeric"
            label="Expiry Date"
            placeholder="mm/yy"
            containerStyle={styles.expiryInput}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonCont}>
        <Button handleClick={handleClick} text="Continue" theme="blackWhite" />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 26,
    backgroundColor: '#F5F5F5',
    padding: 16,
    alignItems: 'stretch',
  },
  cardDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  cvvInput: {
    flex: 1,
    marginRight: 10,
  },
  expiryInput: {
    flex: 1,
    marginLeft: 10,
  },
  buttonCont: {
    marginBottom: 30,
    width: '90%',
    marginHorizontal: '5%',
  },
});

export default CardDetails;
