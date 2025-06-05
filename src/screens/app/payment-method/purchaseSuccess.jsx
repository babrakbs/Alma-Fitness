import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MessageIconScreen from '../../../components/MessageIconScreen';

const PurchaseSuccess = () => {
  const secondaryText = "Valid till 29th November 2024.\n \n Automatically renews every month, you can cancel your membership at any time.";
  const [firstSentence, ...rest] = secondaryText.split('. '); 
  const remainingText = rest.join('. ');
  return (
    <MessageIconScreen
      headingText="Basic Plan Activated"
      headingSize={20}
      secondaryText={secondaryText}
      btnText="Continue"
      navigateTo="TabNav"
      purchaseSuccess={true}
      theme='whiteBlack'
    />
  );
};

export default PurchaseSuccess;

const styles = StyleSheet.create({});
