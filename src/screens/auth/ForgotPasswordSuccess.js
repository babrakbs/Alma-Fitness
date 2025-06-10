import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MessageIconScreen from '../../components/MessageIconScreen';

const ForgotPasswordSuccess = () => {
  return (
    <MessageIconScreen
      headingText="Password Reset"
      headingSize={20}
      isIcon={false}
      iconMTop={32}
      secondaryText="You can log in with your new password."
      btnText="Continue"
      navigateTo="TabNav"
    />
  );
};

export default ForgotPasswordSuccess;

const styles = StyleSheet.create({});
