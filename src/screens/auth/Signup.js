import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderIconText from '../../components/HeaderIconText';
import Input from '../../components/input';
import CheckBox from '@react-native-community/checkbox';
import Button from '../../components/Button';
import SocialAuthButtons from '../../components/SocialAuthButtons';
import AuthNavigationText from '../../components/AuthNavigationText';
import OrLine from '../../components/OrLine';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import EyeSvg from '../../assets/icons/Password_Icon.svg';
import {colors, fontFamily} from '../../constants';
import {useDispatch} from 'react-redux';
import EyeOpenSvg from '../../assets/icons/EyeOpen';
import axiosInstance from '../../helper/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {toast} from '../../helper/toast';
import {isEmailValid} from '../../helper/utils';

const Signup = ({navigation}) => {
  const onChange = () => {};
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [hide, setVisible] = useState(true);
  const [hide2, setVisible2] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState({});
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirm_password: '',
  });

  const handleValidation = () => {
    let errors = {};
    let isError = false;

    if (!form.email || form.email.length === 0) {
      errors.email = 'The email field is required.';
      isError = true;
    } else if (!isEmailValid(form.email)) {
      errors.email = 'The email is not valid.';
      isError = true;
    }

    if (!form.password || form.password.length === 0) {
      errors.password = 'The password field is required.';
      isError = true;
    }

    if (!form.confirm_password || form.confirm_password.length === 0) {
      errors.confirm_password = 'The confirm password field is required.';
      isError = true;
    } else if (form.password !== form.confirm_password) {
      errors.confirm_password = 'The passwords do not match.';
      isError = true;
    }

    setError(errors);
    return isError;
  };
  const isFocused = useIsFocused();

  useEffect(() => {
    setError('');
    setForm({
      email: '',
      password: '',
    });
  }, [isFocused]);

  const handleSignUp = async () => {
    setError({});
    if (handleValidation()) return;

    try {
      setLoading(true);

      const formdata = new FormData();
      formdata.append('email', form.email);
      formdata.append('password', form.password);
      formdata.append('confirm_password', form.confirm_password);

      const res = await axiosInstance.post(`/api/register`, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('REGISTER data', res?.data);

      // Check if the response has an error status code
      if (res?.data?.meta?.code === 409) {
        toast(res?.data?.meta?.message || 'Email already exists');
        return;
      }

      if (res?.status === 200) {
        setData(res?.data);
        navigation.navigate('ProfileSetup', {
          token: res?.data?.data.ACCESS_TOKEN,
        });
        setForm({email: '', password: ''});
      }
    } catch (err) {
      console.log('Registration Error:', err?.response?.data || err?.message);
      // Display the backend error message if available, otherwise show a generic error
      const errorMessage =
        err?.response?.data?.meta?.message ||
        err?.message ||
        'An error occurred during registration';
      toast(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (index, value) => {
    setForm({
      ...form,
      [index]: value,
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* <HeaderIconText
        text="Registration"
        headingMTop={20}
        size={66}
        iconMTop={50}
      /> */}
      <Text style={styles.headingText}>Sign Up</Text>
      <Text style={styles.bodyText}>Create an account</Text>
      <View style={styles.contentContainer}>
        <View style={styles.fieldsContainer}>
          {/* <Input
            placeholder="Full Name"
            rightSVGIcon={true}
            type={'Full Name'}
            onChange={onChange}
          /> */}
          <Input
            // onChange={onChange}
            placeholder="Email"
            rightSVGIcon={true}
            type={'Email'}
            onChangeText={text => handleInput('email', text)}
            error={error.email}
            value={form.email}
          />

          <Input
            // onChange={onChange}
            placeholder="Password"
            type={'password'}
            showRighIcon
            rightSVGIcon={hide ? EyeSvg : EyeOpenSvg}
            rightIconPress={() => setVisible(!hide)}
            onChangeText={text => handleInput('password', text)}
            secureTextEntry={hide}
            value={form.password}
            error={error.password}
          />
          <Input
            // onChange={onChange}
            placeholder="Confirm Password"
            type={'password'}
            showRighIcon
            rightSVGIcon={hide2 ? EyeSvg : EyeOpenSvg}
            rightIconPress={() => setVisible2(!hide2)}
            onChangeText={text => handleInput('confirm_password', text)}
            secureTextEntry={hide2}
            value={form.confirm_password}
            error={error.confirm_password}
          />
          {/* <Input
            placeholder="Confirm Password"
            rightSVGIcon={<EyeSvg />}
            showRighIcon
            type={'password'}
            onChange={onChange}
          /> */}
        </View>
        <View style={{marginTop: 30}}>
          <Button
            // handleClick={() => navigation.navigate('RegistrationSuccess')}
            handleClick={() => handleSignUp()}
            text="Register"
            textBold={false}
            loading={loading}
          />
          {/* <Text
            style={{
              color: '#818C81',
              fontStyle: 'italic',
              fontSize: 10,
              textAlign: 'center',
              marginTop: 11,
            }}>
            By signing up, you agree to receive updates and marketing emails
            from Alma. You can unsubscribe anytime.
          </Text> */}
        </View>
        <OrLine />
      </View>
      <SocialAuthButtons />
      <AuthNavigationText
        primaryText="Already have an account?"
        navText="Log In"
        navTo="Login"
        marginTop={150}
      />
    </ScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    width: '100%',
    // margin: 'auto',
    marginHorizontal: 'auto',
  },
  fieldsContainer: {
    marginTop: 35,
  },
  remember: {
    color: '#46515A',
    fontSize: 14,
    fontWeight: '400',
  },
  contentContainer: {width: '90%', margin: 'auto'},
  optContainer: {display: 'flex', flexDirection: 'row', alignItems: 'center'},
  headingText: {
    color: colors.black,
    fontSize: 26,
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontWeight: '400',
    fontFamily: fontFamily.regular,
    marginTop: 60,
    paddingHorizontal: 20,
  },
  bodyText: {
    color: colors.darkWhite,
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontFamily: fontFamily.regular,
    fontSize: 18,
    fontWeight: '400',
    paddingHorizontal: 20,
    marginTop: 10,
  },
});
