import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  ToastAndroid,
  Platform,
  Alert,
} from 'react-native';
import Header from '../../../components/header';
import UploadPhoto from '../../../components/uploadPhoto';
import Input from '../../../components/input';
import {ProfileSetupInputs} from '../../../constants/staticData';
import Button from '../../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fontFamily} from '../../../constants';
import {Dropdown} from 'react-native-element-dropdown';

import {colors} from '../../../constants';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

// Gender options for dropdown
const genderOptions = [
  {label: 'Male', value: 'Male'},
  {label: 'Female', value: 'Female'},
  {label: 'Other', value: 'Other'},
];

const ProfileSetup = ({navigation, route}) => {
  const data = route?.params?.token;
  console.log('data======', data);
  AsyncStorage.setItem('Token', data);

  // State for photo and inputs
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [errors, setErrors] = useState({name: '', gender: '', dob: ''});

  const validate = () => {
    let valid = true;
    let newErrors = {name: '', gender: '', dob: ''};
    if (!name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    } else if (name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
      valid = false;
    }
    if (!gender) {
      newErrors.gender = 'Gender is required';
      valid = false;
    }
    if (!photo) {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Add photo to continue', ToastAndroid.SHORT);
      } else {
      }
      valid = false;
    }
    if (!dob.trim()) {
      newErrors.dob = 'Date of Birth is required';
      valid = false;
    } else {
      // Optionally check date format (YYYY-MM-DD)
      const dobDate = new Date(dob);
      if (isNaN(dobDate.getTime())) {
        newErrors.dob = 'Please enter a valid date';
        valid = false;
      } else if (dobDate > new Date()) {
        newErrors.dob = 'Date of Birth cannot be in the future';
        valid = false;
      }
    }
    setErrors(newErrors);
    return valid;
  };

  const handleNavigation = () => {
    if (!validate()) return;
    // Build FormData
    const formData = new FormData();
    formData.append('name', name);
    formData.append('gender', gender);
    formData.append('dob', dob);
    if (photo) {
      formData.append('profile_image', photo);
    }
    // If you have email, append it as well
    if (route?.params?.email) {
      formData.append('email', route.params.email);
    }
    // Hermes does not support formData.entries(), so don't use it here
    // Pass FormData and token to the next screen
    navigation.navigate('SelectPreferences', {profileData: formData});
  };

  // Handler for input changes
  const onChange = (value, field) => {
    if (field === 'Name') setName(value);
    else if (field === 'Gender') setGender(value);
    else if (field === 'Date of Birth') setDob(value);
  };

  return (
    <SafeAreaView style={{...styles.container}}>
      {/* <Header
        label={data === 'Registration' ? 'Your Profile' : 'Your Profile'}
        showArrow={data === 'Registration' || !data?.showArrow ? false : true}
      /> */}
      {!data?.showArrow && (
        <Text
          style={{
            textAlign: 'center',
            marginTop: 60,
            marginBottom: 20,
            fontSize: 20,
            fontFamily: fontFamily.medium,
            color: 'black',
          }}>
          Your Profile
        </Text>
      )}
      <UploadPhoto photo={photo} setPhoto={setPhoto} />
      <View style={styles.inputsView}>
        <Input
          showLeftIcon={false}
          showRighIcon={false}
          placeholder="Name"
          value={name}
          onChangeText={val => onChange(val, 'Name')}
        />
        {errors.name ? (
          <Text
            style={{
              color: 'red',
              marginBottom: heightPercentageToDP(1),
              marginLeft: 10,
            }}>
            {errors.name}
          </Text>
        ) : null}
        <Dropdown
          style={[styles?.dropdown, isFocus && {borderColor: colors.lightGray}]}
          placeholderStyle={[styles?.label, {color: colors.darkWhite}]}
          selectedTextStyle={styles?.selectedTextStyle}
          dropdownPosition="auto"
          // dropdownStyle={styles.dropdownStyle}
          containerStyle={styles?.dropdownContainer}
          itemContainerStyle={styles?.itemContainerStyle}
          activeColor={colors?.theme}
          itemTextStyle={styles?.itemTextStyle}
          data={genderOptions}
          labelField="label"
          valueField="value"
          placeholder={'Gender'}
          value={gender}
          onFocus={() => {
            setIsFocus(true);
          }}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setGender(item?.value);
            setIsFocus(false);
          }}
          renderRightIcon={() => (
            <Image
              resizeMode="center"
              style={[
                styles.rightIcon,
                isFocus && {
                  transform: [{rotate: '180deg'}],
                },
              ]}
              source={require('../../../assets/icons/arrow_down.png')}
            />
          )}
        />
        {errors.gender ? (
          <Text
            style={{
              color: 'red',
              marginBottom: heightPercentageToDP(1),
              marginLeft: 10,
            }}>
            {errors.gender}
          </Text>
        ) : null}
        <Input
          showLeftIcon={false}
          showRighIcon={false}
          placeholder="Date of Birth"
          value={dob}
          onChangeText={val => onChange(val, 'Date of Birth')}
        />
        {errors.dob ? (
          <Text
            style={{
              color: 'red',
              marginBottom: heightPercentageToDP(1),
              marginLeft: 10,
            }}>
            {errors.dob}
          </Text>
        ) : null}
      </View>
      <View style={styles.buttonView}>
        <Button handleClick={handleNavigation} text={'Continue'} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    marginHorizontal: '5%',
  },
  inputsView: {
    flex: 0.48,
    justifyContent: 'center',
  },
  buttonView: {
    flex: 0.25,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  dropdown: {
    flexDirection: 'row',
    width: widthPercentageToDP(90),
    borderRadius: 32,
    alignItems: 'center',
    alignSelf: 'center',
    height: heightPercentageToDP(5.5),
    justifyContent: 'space-evenly',
    marginBottom: heightPercentageToDP(1),
    backgroundColor: '#fff',
  },
  label: {
    color: colors.black,
    textAlign: 'left',
    textAlignVertical: 'center',
    paddingHorizontal: widthPercentageToDP(4),
    fontWeight: '400',
    fontSize: 16,
    // paddingVertical: heightPercentageToDP(0.3),
    fontFamily: fontFamily.regular,
  },
  selectedTextStyle: {
    color: colors.black,
    textAlign: 'left',
    textAlignVertical: 'center',
    paddingHorizontal: widthPercentageToDP(4),
    // paddingVertical: heightPercentageToDP(0.3),
    fontSize: 16,
    fontFamily: fontFamily.regular,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
    borderRadius: 8,
  },
  dropdownContainer: {
    marginTop: heightPercentageToDP(-3.7),
    backgroundColor: 'white',
    borderBottomEndRadius: widthPercentageToDP(2),
    borderBottomStartRadius: widthPercentageToDP(2),
    // borderWidth: 0.4,

    borderTopWidth: 0,
    borderColor: colors.lightGray,
    // elevation: 5,
    // paddingVertical: 10,
  },
  selectedItemContainerStyle: {
    backgroundColor: colors.black,
    // borderRadius: 8,
    // padding: 10,
  },
  selectedItemTextStyle: {
    color: colors.black,
    fontSize: 16,
    fontWeight: '400',
  },
  itemContainerStyle: {
    backgroundColor: 'transparent',
    // padding: 10,
  },
  itemTextStyle: {
    color: colors.black,
    fontSize: 16,
    fontFamily: fontFamily.regular,
    // fontWeight: '400',
  },
  rightIcon: {
    width: widthPercentageToDP(3),
    height: heightPercentageToDP(1),
    marginRight: widthPercentageToDP(5),
  },
});

export default ProfileSetup;