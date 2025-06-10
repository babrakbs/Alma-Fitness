import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios'; // Import axios
import HeaderIconText from '../../components/HeaderIconText';
import Input from '../../components/input';
import EmailSvg from '../../assets/icons/EmailSvg';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/header';
import {useSelector} from 'react-redux';
import axiosInstance from '../../helper/axiosInstance';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.reducer.user);

  const [email, setEmail] = useState(''); // State for email input
  const [emailError, setEmailError] = useState(''); // State for email error message
  const [loading, setLoading] = useState(false); // Add loading state

  const handleEmailChange = text => {
    setEmail(text);
    if (emailError) {
      // Clear error when user starts typing
      setEmailError('');
    }
  };

  const handleForgotPasswordPress = async () => {
    if (!email.trim()) {
      setEmailError('Email field cannot be empty.');
      return;
    }
    setEmailError(''); // Clear previous errors
    setLoading(true); // Set loading to true

    try {
      // navigation.navigate('ForgotPasswrodCode', {email: email});

      const response = await axiosInstance.post('/api/forgetPassword', {
        email: email,
      });

      console.log('here is hte repson ----<', response?.data);

      if (
        response.data &&
        response.data.meta &&
        response.data.meta.code !== 200 &&
        response.data.meta.message
      ) {
        console.error(
          'Forgot password request failed (application-level):',
          response.data,
        );
        setEmailError(response.data.meta.message);
        return;
      } else if (
        response.data &&
        response.data.message &&
        (response.status >= 400 ||
          (response.data.meta && response.data.meta.code >= 400))
      ) {
        // Fallback for other error structures
        console.error(
          'Forgot password request failed (application-level, other structure):',
          response.data,
        );
        setEmailError(response.data.message);
        return;
      }

      console.log('Forgot password request successful:', response.data);
      navigation.navigate('ForgotPasswrodCode');
    } catch (error) {
      // This block will catch network errors or if axiosInstance is configured to throw on HTTP errors
      console.error(
        'Error during forgot password request (network/HTTP):',
        error,
      );
      if (error.response && error.response.data) {
        // Attempt to get a nested message first, then a direct message
        const message =
          error.response.data.meta && error.response.data.meta.message
            ? error.response.data.meta.message
            : error.response.data.message;
        setEmailError(
          message || 'Failed to send reset instructions. Please try again.',
        );
      } else if (error.request) {
        setEmailError(
          'No response from server. Please check your connection and try again.',
        );
      } else {
        setEmailError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false); // Set loading to false in finally block
    }
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <Header
          // theme="dark"
          marginTop={20}
          showArrow={true}
        />
        <HeaderIconText
          text="Forgot Password"
          size={116}
          iconMTop={20}
          headingMTop={30}
          additionalText="Please enter your email address below to receive a one-time verification code."
        />
        <View style={{marginTop: 40}}>
          <Input
            placeholder="Email"
            // showLeftIcon={true}
            leftSVGIcon={<EmailSvg />}
            onChangeText={handleEmailChange} // Use onChangeText for text inputs
            value={email} // Control the input value
            keyboardType="email-address" // Set keyboard type for email
            autoCapitalize="none" // Prevent auto-capitalization
          />
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          text="Forgot Password"
          textBold={false}
          loading={loading} // Pass loading state
          handleClick={handleForgotPasswordPress} // Updated handleClick
          disabled={loading} // Disable button when loading
        />
      </View>
    </>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    margin: 'auto',
  },
  buttonContainer: {
    width: '90%',
    marginHorizontal: '5%',
    marginBottom: 20,
  },
  errorText: {
    // Style for the error message
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 10, // Adjust as needed for alignment with your Input component
  },
});
