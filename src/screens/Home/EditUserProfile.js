import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  ScrollView,
  Text,
  SafeAreaView,
  Image,
} from 'react-native';
import Header from '../../components/header';
import UploadPhoto from '../../components/uploadPhoto';
import Input from '../../components/input';
import Button from '../../components/Button';
import {useSelector} from 'react-redux';
import axiosInstance from '../../helper/axiosInstance';
import {Dropdown} from 'react-native-element-dropdown';
import {colors, fontFamily} from '../../constants';
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

const EditProfile = ({navigation, route}) => {
  const user = useSelector(state => state.reducer?.user);
  const {comingFromSettings} = route?.params ? route?.params : {};
  console.log(user, comingFromSettings);

  // Local state for each field
  const [name, setName] = useState(user?.name);
  const [gender, setGender] = useState('');
  const [photo, setPhoto] = useState('');
  const [dob, setDob] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  // Error states for each field
  const [errors, setErrors] = useState({
    name: '',
    gender: '',
    dob: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      gender: '',
      dob: '',
    };

    // Name validation
    if (!name?.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
      isValid = false;
    }

    // Gender validation
    if (!gender?.trim()) {
      newErrors.gender = 'Gender is required';
      isValid = false;
    } else if (!['male', 'female', 'other'].includes(gender.toLowerCase())) {
      newErrors.gender = 'Please enter a valid gender (male, female, or other)';
      isValid = false;
    }

    // Date of Birth validation
    if (!dob?.trim()) {
      newErrors.dob = 'Date of birth is required';
      isValid = false;
    } else {
      const dobDate = new Date(dob);
      const today = new Date();
      if (isNaN(dobDate.getTime())) {
        newErrors.dob = 'Please enter a valid date';
        isValid = false;
      } else if (dobDate > today) {
        newErrors.dob = 'Date of birth cannot be in the future';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const fetchCurrentUser = async () => {
    try {
      const response = await axiosInstance.get('/api/userProfile');
      const userData = response.data.data;
      console.log('User Data:', userData);

      setGender(userData?.gender);
      setDob(userData?.dob);
      setPhoto(userData?.profile_image);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleNavigation = () => {
    if (!validateForm()) {
      return;
    }

    // If validation passes, proceed with navigation
    navigation.navigate('SelectPreferences');
  };

  // Handler for input changes
  const onChange = (value, field) => {
    // Clear error when user starts typing
    setErrors(prev => ({
      ...prev,
      [field.toLowerCase()]: '',
    }));

    if (field === 'Name') setName(value);
    else if (field === 'Gender') setGender(value);
    else if (field === 'Date of Birth') setDob(value);
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <>
      <SafeAreaView />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{...styles.container}}>
        <Header showArrow={true} label={'Edit Profile      '} />
        <UploadPhoto photo={photo} setPhoto={setPhoto} />
        <View style={styles.inputsView}>
          <View style={styles.inputContainer}>
            <Input
              placeholder="Name"
              value={name}
              onChangeText={val => onChange(val, 'Name')}
              style={errors.name ? styles.inputError : null}
            />
            {errors.name ? (
              <Text style={styles.errorText}>{errors.name}</Text>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <Dropdown
              style={[
                styles.dropdown,
                isFocus && {borderColor: colors.lightGray},
              ]}
              placeholderStyle={[styles?.label, {color: colors.darkWhite}]}
              selectedTextStyle={styles.selectedTextStyle}
              dropdownPosition="auto"
              containerStyle={styles.dropdownContainer}
              itemContainerStyle={styles.itemContainerStyle}
              activeColor={'#eee'}
              itemTextStyle={styles.itemTextStyle}
              data={genderOptions}
              labelField="label"
              valueField="value"
              placeholder={'Gender'}
              value={gender}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setGender(item.value);
                setIsFocus(false);
              }}
              renderRightIcon={() => (
                <Image
                  resizeMode="center"
                  style={styles.rightIcon}
                  source={require('../../assets/icons/arrow_down.png')}
                />
              )}
            />
            {errors.gender ? (
              <Text style={styles.errorText}>{errors.gender}</Text>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <Input
              placeholder="Date of Birth"
              value={dob}
              onChangeText={val => onChange(val, 'Date of Birth')}
              style={errors.dob ? styles.inputError : null}
            />
            {errors.dob ? (
              <Text style={styles.errorText}>{errors.dob}</Text>
            ) : null}
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonView}>
        <Button
          handleClick={handleNavigation}
          text={comingFromSettings ? 'Update' : 'Continue'}
        />
      </View>
    </>
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
    marginTop: 30,
  },
  buttonView: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    marginHorizontal: '5%',
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginLeft: 12,
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

export default EditProfile;