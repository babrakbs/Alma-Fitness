import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MessageIconScreen from '../../components/MessageIconScreen';

const RegistrationSuccess = () => {
  return <MessageIconScreen accountCreated={true} navigateTo='ProfileSetup' />;
};

export default RegistrationSuccess;

const styles = StyleSheet.create({});
