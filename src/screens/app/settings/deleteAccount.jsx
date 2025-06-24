import {View, Text, StyleSheet, SafeAreaView, Platform} from 'react-native';
import React, {useState} from 'react';
import {colors, fontFamily} from '../../../constants';
import {WarningRed} from '../../../constants/svgs';
import Header from '../../../components/header';
import Input from '../../../components/input';
import EyeSvg from '../../../assets/icons/Password_Icon.svg';
import Button from '../../../components/Button';
import EyeOpenSvg from '../../../assets/icons/EyeOpen';
import axiosInstance from '../../../helper/axiosInstance'; // Import axiosInstance
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const DeleteAccount = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hide, setVisible] = useState(true);
  const [loading, setLoading] = useState(false); // Add loading state

  const handlePasswordChange = text => {
    setPassword(text);
    if (passwordError) {
      setPasswordError('');
    }
  };

  const handleDeleteAccountPress = async () => {
    if (!password.trim()) {
      setPasswordError('Password field cannot be empty.');
      return;
    }
    setPasswordError(''); // Clear previous errors
    setLoading(true); // Set loading to true

    try {
      const response = await axiosInstance.post('/api/request/delete', {
        password,
      });

      // Check for application-level errors in the response body
      if (
        response.data &&
        response.data.meta &&
        response.data.meta.code !== 200 &&
        response.data.meta.message
      ) {
        console.error(
          'Delete account request failed (application-level):',
          response.data,
        );
        setPasswordError(response.data.meta.message);
        return;
      } else if (
        response.data &&
        response.data.message &&
        (response.status >= 400 ||
          (response.data.meta && response.data.meta.code >= 400))
      ) {
        console.error(
          'Delete account request failed (application-level, other structure):',
          response.data,
        );
        setPasswordError(response.data.message);
        return;
      }

      console.log('Delete account request successful:', response.data);
      // Assuming success means proceeding to OTP verification
      navigation.navigate('OTPVerificationPayment', {
        Screen: 'DeleteAccount',
      });
    } catch (error) {
      console.error('Error during delete account request:', error);
      if (error.response && error.response.data) {
        const message =
          error.response.data.meta && error.response.data.meta.message
            ? error.response.data.meta.message
            : error.response.data.message;
        setPasswordError(
          message || 'Failed to initiate account deletion. Please try again.',
        );
      } else if (error.request) {
        setPasswordError(
          'No response from server. Please check your connection.',
        );
      } else {
        setPasswordError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false); // Set loading to false in finally block
    }
  };

  return (
    <View style={styles.mainConatiner}>
      <SafeAreaView />
      <View style={{paddingHorizontal: widthPercentageToDP(4)}}>
        <Header label={'Delete Account        '} showArrow={true} />
      </View>
      <View style={styles.container}>
        <WarningRed height={18} width={18} />
        <Text style={styles.headText}>Deleting your account:</Text>
      </View>
      <Text style={styles.description}>
        We’re sorry to see you go! Deleting your account is permanent and cannot
        be undone. This will remove all your personal information, memberships,
        and settings.
      </Text>
      <Text style={[styles.description, {marginTop: 10}]}>
        If you’re experiencing any issues or need assistance, please contact us
        at <Text style={{color: colors.blue}}>support@almaxcollective.com</Text>{' '}
        or visit our help center. We’d love to help resolve any concerns and
        keep you as a valued Almax user.
      </Text>
      <View style={{width: '90%', alignSelf: 'center', marginVertical: 20}}>
        <Input
          onChangeText={handlePasswordChange}
          value={password}
          placeholder="Password"
          secureTextEntry={hide} // Use secureTextEntry for passwords
          rightSVGIcon={hide ? EyeSvg : EyeOpenSvg}
          rightIconPress={() => setVisible(!hide)}
          showRighIcon
        />
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}
      </View>

      <Text style={[styles.description, {marginTop: 0}]}>
        To delete your account, please enter your password above and click the{' '}
        <Text
          style={{
            fontFamily: fontFamily.bold,
            fontWeight: Platform.OS === 'ios' ? '700' : '100',
          }}>
          Delete Account
        </Text>{' '}
        button to confirm.
      </Text>
      <View style={styles.footer}>
        <Button
          handleClick={handleDeleteAccountPress} // Updated handleClick
          text={'Delete Account'} // Change text based on loading state
          widthSize="large2"
          textBold={false}
          loading={loading} // Pass loading state to Button
          disabled={loading} // Disable button when loading
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainConatiner: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flexDirection: 'row',
    paddingHorizontal: widthPercentageToDP(5),
    marginBottom: 10,
    alignItems: 'center',
    // width:'90%',
    // backgroundColor:'red'
  },
  headText: {
    color: colors.red,
    textAlign: 'center',
    alignSelf: 'center',
    marginLeft: 5,
    fontSize: 16,
    // color:colors.black,
    fontWeight: '400',
    fontFamily: fontFamily.regular,
  },
  description: {
    color: colors.black,
    fontSize: 14,
    color: colors.black,
    fontWeight: '400',
    fontFamily: fontFamily.regular,
    marginHorizontal: 20,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical:
      Platform.OS === 'ios' ? heightPercentageToDP(6) : heightPercentageToDP(4),
  },
  errorText: {
    // Style for the error message
    color: colors.red, // Assuming you have a red color in your constants
    fontSize: 12,
    marginTop: 5,
    marginLeft: 10, // Adjust as needed
  },
});

export default DeleteAccount;