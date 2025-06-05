import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import HeaderIconText from '../../components/HeaderIconText';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/header';
import {colors, fontFamily} from '../../constants';
import {OtpInput} from 'react-native-otp-entry';
import axiosInstance from '../../helper/axiosInstance';

const arrays = [1, 2, 3, 4];

const ForgotPasswrodCode = () => {
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState(''); // State for OTP error message
  const [loading, setLoading] = useState(false); // Add loading state

  const navigation = useNavigation();

  const handleOtpChange = (text) => {
    setOtp(text);
    if (otpError) { // Clear error when user starts typing
      setOtpError('');
    }
  };

  const handleContinuePress = async () => {
    if (!otp || otp.length < 4) {
      setOtpError('Please enter a valid 4-digit OTP.');
      return;
    }
    setOtpError(''); // Clear previous errors
    setLoading(true); // Set loading to true
   
    try {
      const response = await axiosInstance.post('/api/verifyOTP', { otp }); 

      if (response.data && response.data.meta && response.data.meta.code !== 200) {
        console.error('OTP verification failed (application-level):', response.data);
        setOtpError(response.data.meta.message || 'Invalid OTP. Please try again.');
        return; 
      }

      console.log('OTP verification successful:', response?.data);
      navigation.navigate('SetNewPassword',{token:response?.data?.data?.token}); 

    } catch (error) {
      console.error('Error during OTP verification (network/HTTP):', error);
      if (error.response && error.response.data && error.response.data.meta && error.response.data.meta.message) {
        setOtpError(error.response.data.meta.message);
      } else if (error.response && error.response.data && error.response.data.message) {
        setOtpError(error.response.data.message);
      } else if (error.request) {
        setOtpError('No response from server. Please check your connection.');
      } else {
        setOtpError('An error occurred. Please try again.');
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
          text="Verification Code"
          size={116}
          iconMTop={20}
          headingMTop={30}
          additionalText="Enter the one-time verification code we just sent to your email."
        />

        <OtpInput
          numberOfDigits={4}
          focusColor={colors.black}
          autoFocus={false}
          hideStick={true}
          blurOnFilled={true}
          disabled={false}
          // type="numeric" // 'type' prop might not be supported by all versions or libraries, check documentation
          secureTextEntry={false}
          focusStickBlinkingDuration={500}
          onTextChange={handleOtpChange} // Updated to use handleOtpChange
          onFilled={text => {
            console.log(`OTP is ${text}`);
            // Optionally, you could trigger handleContinuePress here if desired
            // setOtp(text); // Ensure OTP state is set if onFilled is used primarily
          }}
          theme={{
            containerStyle: styles.otpContainer,
            pinCodeContainerStyle: styles.otpBox,
            pinCodeTextStyle: styles.otpText,
            focusedPinCodeContainerStyle: styles.otpBoxActive,
          }}
        />
        {otpError ? <Text style={styles.errorText}>{otpError}</Text> : null}
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
          text="Continue"
          loading={loading} // Pass loading state t
          textBold={false}
          handleClick={handleContinuePress} // Updated handleClick
          disabled={loading} // Disable button when loading
        />
      </View>
    </>
  );
};

export default ForgotPasswrodCode;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    margin: 'auto',
  },
  boxContainer: {
    // borderWidth: 1,
    // borderColor: 'red',
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
    borderRadius: 56,
    backgroundColor: colors.white,
    elevation: 2,
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
    marginTop: 20,
    color: colors.darkWhite,
    fontFamily: fontFamily.regular,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
  },
  innerText: {
    color: colors.black,
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
    backgroundColor: colors.darkWhite, // Ensure this color is defined in your constants
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
