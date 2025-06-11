import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import HeaderIconText from '../../components/HeaderIconText';
import Input from '../../components/input';
import LockSvg from '../../assets/icons/LockSvg';
import EyeSvg from '../../assets/icons/Password_Icon.svg';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { colors, fontFamily } from '../../constants';
import axiosInstance from '../../helper/axiosInstance';
import Header from '../../components/header';

const ChangePassword = () => {
  const navigation = useNavigation();

  // State for each field
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [hide, setVisible] = useState(true);
  const [hide2, setVisible2] = useState(true);
  const [hide3, setVisible3] = useState(true);

  // Error state for each field
  const [oldPasswordError, setOldPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [apiError, setApiError] = useState('');

  const handleSubmit = async () => {
    let hasError = false;
    setOldPasswordError('');
    setNewPasswordError('');
    setConfirmPasswordError('');
    setApiError('');

    if (!oldPassword) {
      setOldPasswordError('Old password is required.');
      hasError = true;
    }
    if (!newPassword) {
      setNewPasswordError('New password is required.');
      hasError = true;
    }
    if (!confirmPassword) {
      setConfirmPasswordError('Confirm password is required.');
      hasError = true;
    }
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      hasError = true;
    }
    if (hasError) return;

    setLoading(true);
    try {
      const response = await axiosInstance.post('/api/changePassword', {
        current_password: oldPassword,
        new_password: newPassword,
        confirm_new_password: confirmPassword,
      });
      console.log('Change Password Response:', response?.data);
      navigation.navigate('ForgotPasswordSuccess');
    } catch (error) {
      setApiError(
        error?.response?.data?.message ||
        'Failed to change password. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <SafeAreaView />
        {/* <HeaderIconText
          text="Set New Password"
          size={116}
          iconMTop={60}
          headingMTop={20}
          additionalText="Enter a new password to log in."
          fontFamily={fontFamily.medium}
        /> */}
        <Header label={'Change Password      '} showArrow={true} />
        <Text
          style={{
            fontSize: 16,
            fontFamily: fontFamily.regular,
            color: colors.black,
            textAlign: 'center',
            marginTop: 4,
            width: '70%',
            alignSelf: 'center',
          }}>
          Enter your current password and create a new one below.
        </Text>
        <View style={{ marginTop: 20 }}>
          <Input
            type={'password'}
            placeholder="Old Password"
            showRighIcon={true}
            rightSVGIcon={hide3 ? EyeSvg : EyeOpenSvg}
            rightIconPress={() => setVisible3(!hide3)}
            onChangeText={text => setOldPassword(text)}
            value={oldPassword}
            onChange={setOldPassword}
          />
          {oldPasswordError ? (
            <Text style={styles.errorText}>{oldPasswordError}</Text>
          ) : null}
        </View>
        <View style={{ marginTop: 10 }}>
          <Input
            type={'password'}
            placeholder="New Password"
            showRighIcon={true}
            rightSVGIcon={hide2 ? EyeSvg : EyeOpenSvg}
            rightIconPress={() => setVisible2(!hide2)}
            onChangeText={text => setNewPassword(text)}
            value={newPassword}
            onChange={setNewPassword}
          />
          {newPasswordError ? (
            <Text style={styles.errorText}>{newPasswordError}</Text>
          ) : null}
        </View>
        <View style={{ marginTop: 10 }}>
          <Input
            type={'password'}
            placeholder="Confirm Password"
            showRighIcon={true}
            rightSVGIcon={hide ? EyeSvg : EyeOpenSvg}
            rightIconPress={() => setVisible(!hide)}
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            onChange={setConfirmPassword}
          />
          {confirmPasswordError ? (
            <Text style={styles.errorText}>{confirmPasswordError}</Text>
          ) : null}
        </View>
        {apiError ? (
          <Text
            style={[styles.errorText, { textAlign: 'center', marginTop: 16 }]}>
            {apiError}
          </Text>
        ) : null}
      </ScrollView>
      <View style={styles.btnContainer}>
        <Button
          text={loading ? 'Submitting...' : 'Submit'}
          textBold={false}
          handleClick={handleSubmit}
          disabled={loading}
        />
      </View>
    </>
  );
};

export default ChangePassword;

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
    color: 'red',
    fontSize: 13,
    marginTop: 6,
    marginLeft: 4,
  },
});
