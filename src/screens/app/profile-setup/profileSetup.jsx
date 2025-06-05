import React, {useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import Header from '../../../components/header';
import UploadPhoto from '../../../components/uploadPhoto';
import Input from '../../../components/input';
import {ProfileSetupInputs} from '../../../constants/staticData';
import Button from '../../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileSetup = ({navigation, route}) => {
  const data = route?.params?.token;
  console.log('data======', data);
  AsyncStorage.setItem('Token', data);

  // State for photo and inputs
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');

  const handleNavigation = () => {
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
      <Header
        label={
          data === 'Registration' ? 'Your Profile' : 'Your Profile        '
        }
        showArrow={data === 'Registration' ? false : true}
      />
      <UploadPhoto photo={photo} setPhoto={setPhoto} />
      <View style={styles.inputsView}>
        <Input
          showLeftIcon={false}
          showRighIcon={false}
          placeholder="Name"
          value={name}
          onChangeText={val => onChange(val, 'Name')}
        />
        <Input
          showLeftIcon={false}
          showRighIcon={false}
          placeholder="Gender"
          value={gender}
          onChangeText={val => onChange(val, 'Gender')}
        />
        <Input
          showLeftIcon={false}
          showRighIcon={false}
          placeholder="Date of Birth"
          value={dob}
          onChangeText={val => onChange(val, 'Date of Birth')}
        />
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
});

export default ProfileSetup;
