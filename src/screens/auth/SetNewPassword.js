import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react'; // Import useState
import HeaderIconText from '../../components/HeaderIconText';
import Input from '../../components/input';
// LockSvg import was commented out, assuming it's not needed for now
// import LockSvg from '../../assets/icons/LockSvg';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {colors, fontFamily} from '../../constants'; // Added colors for error text
import EyeOpenSvg from '../../assets/icons/EyeOpen';
import EyeSvg from '../../assets/icons/Password_Icon.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../helper/axiosInstance';

const SetNewPassword = ({route}) => {
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const token = route.params.token;
  const handleNewPasswordChange = text => {
    setNewPassword(text);
    if (passwordError) {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = text => {
    setConfirmPassword(text);
    if (confirmPasswordError) {
      setConfirmPasswordError('');
    }
  };

  const validateInputs = () => {
    let isValid = true;
    setPasswordError('');
    setConfirmPasswordError('');

    if (!newPassword.trim()) {
      setPasswordError('Password cannot be empty.');
      isValid = false;
    } else if (newPassword.length < 6) {
      // Example: Minimum 6 characters
      setPasswordError('Password must be at least 6 characters long.');
      isValid = false;
    }

    if (!confirmPassword.trim()) {
      setConfirmPasswordError('Confirm password cannot be empty.');
      isValid = false;
    } else if (newPassword !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      isValid = false;
    }
    return isValid;
  };

  const handleContinue = async () => {
    if (validateInputs()) {
      setLoading(true); // Set loading to true
      setPasswordError(''); // Clear previous errors
      setConfirmPasswordError(''); // Clear previous errors
      // navigation.navigate('ForgotPasswordSuccess');
      try {
        console.log('Passwords are valid:', {newPassword, confirmPassword});

        // Ensure token exists before proceeding
        // if (!token) {
        //   console.error('Token not found in AsyncStorage');
        //   setPasswordError('An error occurred. Please try again.'); // Or a more specific error
        //   return;
        // }
        const response = await axiosInstance.post('/api/resetPassword', {
          token,
          new_password: newPassword,
          confirm_password: confirmPassword,
        });
        console.log('Response:', response?.data);

        if (
          response.data &&
          response.data.meta &&
          response.data.meta.code === 200
        ) {
          navigation.navigate('ForgotPasswordSuccess');
        } else {
          // Handle API error response
          const errorMessage =
            response.data?.meta?.message ||
            response.data?.message ||
            'Failed to reset password. Please try again.';
          setPasswordError(errorMessage); // Display error message
          console.error(
            'Password reset failed (application-level):',
            response.data,
          );
        }
      } catch (error) {
        console.error('Error during password reset (network/HTTP):', error);
        let errorMessage = 'An error occurred. Please try again.';
        if (error.response) {
          const data = error.response.data;
          if (data && typeof data === 'object') {
            if (
              data.meta &&
              typeof data.meta.message === 'string' &&
              data.meta.message.trim() !== ''
            ) {
              errorMessage = data.meta.message;
            } else if (
              typeof data.message === 'string' &&
              data.message.trim() !== ''
            ) {
              errorMessage = data.message;
            }
          } else if (typeof data === 'string' && data.trim() !== '') {
            errorMessage = data;
          }
        } else if (error.request) {
          errorMessage =
            'No response from server. Please check your connection.';
        } else if (error.message) {
          errorMessage = error.message;
        }
        setPasswordError(errorMessage); // Display error message
      } finally {
        setLoading(false); // Set loading to false in finally block
      }
    }
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <HeaderIconText
          text="Set New Password"
          size={116}
          iconMTop={60}
          headingMTop={20}
          additionalText="Enter a new password to log in."
          fontFamily={fontFamily.medium}
        />
        <View style={{marginTop: 30}}>
          <Input
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Password"
            // leftSVGIcon={<LockSvg />}
            // showLeftIcon={true}
            showRighIcon={true} // Corrected typo: showRighIcon to showRightIcon
            rightSVGIcon={passwordVisible ? EyeOpenSvg : EyeSvg}
            rightIconPress={() => setPasswordVisible(!passwordVisible)}
            onChangeText={handleNewPasswordChange}
            onChange={handleNewPasswordChange} // Added onChange to mirror working example
            value={newPassword}
          />
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
        </View>
        <View style={{marginTop: 18}}>
          <Input
            type={confirmPasswordVisible ? 'text' : 'password'}
            placeholder="Repeat Password"
            // leftSVGIcon={<LockSvg />}
            // showLeftIcon={true}
            showRighIcon={true} // Corrected typo: showRighIcon to showRightIcon
            rightSVGIcon={confirmPasswordVisible ? EyeOpenSvg : EyeSvg}
            rightIconPress={() =>
              setConfirmPasswordVisible(!confirmPasswordVisible)
            }
            onChangeText={handleConfirmPasswordChange}
            onChange={handleConfirmPasswordChange} // Added onChange to mirror working example
            value={confirmPassword}
          />
          {confirmPasswordError ? (
            <Text style={styles.errorText}>{confirmPasswordError}</Text>
          ) : null}
        </View>
      </ScrollView>
      <View style={styles.btnContainer}>
        <Button
          text="Continue"
          textBold={false}
          handleClick={handleContinue}
          loading={loading} // Pass loading state to Button
          disabled={loading} // Disable button when loading
        />
      </View>
    </>
  );
};

export default SetNewPassword;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    margin: 'auto',
  },
  btnContainer: {
    width: '90%',
    marginHorizontal: '5%',
    marginBottom: 20,
  },
  errorText: {
    // Style for the error message
    color: colors.red, // Or your preferred error color
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5, // Adjust as needed
  },
});
