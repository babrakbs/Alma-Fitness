import {SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import HeaderIconText from '../../../components/HeaderIconText';
import Button from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {colors, fontFamily} from '../../../constants';
import {OtpInput} from 'react-native-otp-entry';
import Header from '../../../components/header';
import axiosInstance from '../../../helper/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const arrays = [1, 2, 3, 4];

const OTPVerificationPayment = ({route}) => {
  const {Screen} = route?.params;
  console.log('Screen', Screen);

  const navigation = useNavigation();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState(''); // Add error state

  const handleNavigation = async () => {
    if (!otp || otp.length < 4) {
      setError('Please enter a valid 6-digit OTP.');
      return;
    }
    setError(''); // Clear previous errors
    setLoading(true);
    console.log("here is the >",otp)
    try {
      const formData = new FormData();
      formData.append('otp',otp)
      const response = await axiosInstance.post('/api/confirm/delete',formData);
      console.log('Delete account response:', response.data);

      if (response.data && response.data.meta && response.data.meta.code === 200) {
        // Account deletion successful
        // Clear user data and navigate to login or a confirmation screen
        await AsyncStorage.clear(); // Example: Clear all stored data
        // You might want to dispatch an action to clear redux state as well if you use it for user session
        // dispatch(logoutUser()); 
        navigation.navigate('Login'); // Or a specific 'AccountDeletedScreen'
      } else {
        // Handle API error response
        const errorMessage = response.data?.meta?.message || response.data?.message || 'Failed to delete account. Please try again.';
        setError(errorMessage);
        console.error('Account deletion failed (application-level):', response.data);
      }
    } catch (err) {
      console.error('Error during account deletion (network/HTTP):', err);
      let errorMessage = 'An error occurred. Please try again.';
      if (err.response) {
        const data = err.response.data;
        if (data && typeof data === 'object') {
          if (data.meta && typeof data.meta.message === 'string' && data.meta.message.trim() !== '') {
            errorMessage = data.meta.message;
          } else if (typeof data.message === 'string' && data.message.trim() !== '') {
            errorMessage = data.message;
          }
        } else if (typeof data === 'string' && data.trim() !== '') {
          errorMessage = data;
        }
      } else if (err.request) {
        errorMessage = 'No response from server. Please check your connection.';
      } else if (err.message) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <ScrollView style={styles.container}>
        <SafeAreaView/>
        {Screen && <Header marginTop={20} showArrow={Screen ? true : false} label={Screen ? 'Delete Account       ' : ''}/>}
        <HeaderIconText
          text={Screen ? 'Delete Account' : 'OTP Verification'}
          size={106}
          additionalText={
            Screen
              ? "For added security, we'll send an OTP code to your registered email. Please enter the code in the field below to confirm your account deletion."
              : 'Enter the OTP code that we have just sent to your email.'
          }
          
        />
        <OtpInput
          numberOfDigits={6}
          focusColor={colors.black}
          autoFocus={false}
          hideStick={true}
          blurOnFilled={true}
          disabled={false}
          type="numeric"
          secureTextEntry={false}
          focusStickBlinkingDuration={500}
          onTextChange={setOtp}
          onFilled={text => console.log(`OTP is ${text}`)}
          theme={{
            containerStyle: styles.otpContainer,
            pinCodeContainerStyle: styles.otpBox,
            pinCodeTextStyle: styles.otpText,
            focusedPinCodeContainerStyle: styles.otpBoxActive,
          }}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null} 
        {/* <View style={styles.boxContainer}>
          {arrays.map(a => (
            <View key={a} style={styles.box}>
              <TextInput
                keyboardType="number-pad"
                style={styles.inputStyle}
                maxLength={1}
              />
            </View>
          ))}
        </View> */}
        <Text style={styles.text}>
          Didn’t receive code? <Text style={styles.innerText}>Send again</Text>
        </Text>
      </ScrollView>
      <View style={styles.btnContainer}>
        <Button
          text={"Delete Account"} // Change text based on loading state
          textBold={false}
          deleteBtn={true}
          loading={loading}
          handleClick={handleNavigation}
          disabled={loading} // Disable button when loading
        />
      </View>
    </>
  );
};

export default OTPVerificationPayment;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    margin: 'auto',
  },
  boxContainer: {
    marginTop: 35,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  box: {
    // borderWidth: 1,
    // borderColor: 'green',
    height: 60,
    width: 60,
    borderRadius: 16,
    backgroundColor: '#EFEFEB',
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  inputStyle: {
    color: '#15161E',
    margin: 'auto',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  text: {
    color: colors.darkWhite,
    alignSelf: 'center',
    fontSize: 14,
    fontFamily: fontFamily.regular,
    fontWeight: '400',
    marginTop: 20,
  },
  innerText: {
    color: colors.black,
    fontSize: 15,
    fontFamily: fontFamily.medium,
    fontWeight: '600',
  },
  btnContainer: {
    width: '90%',
    marginHorizontal: '5%',
    marginBottom: 20,
  },
  otpContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: '5%',
    // backgroundColor:'red'
  },
  otpBox: {
    width: '15%',
    // height: "30%",
    borderRadius: 10,
    // backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: colors.black,
  },
  otpBoxActive: {
    backgroundColor: colors.darkWhite,
  },
  otpText: {
    color: colors.black,
    fontSize: 24,
    fontFamily: fontFamily.regular,
    textAlign: 'center',
    fontWeight: '400',
  },
  errorText: { // Style for the error message
    color: 'red',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
  },
});
