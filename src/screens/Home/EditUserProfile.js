import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, View, ScrollView, Text } from 'react-native';
import Header from '../../components/header';
import UploadPhoto from '../../components/uploadPhoto';
import Input from '../../components/input';
import Button from '../../components/Button';
import { useSelector } from 'react-redux';
import axiosInstance from '../../helper/axiosInstance';

const EditProfile = ({ navigation }) => {
  const user = useSelector(state => state.reducer?.user);
// Local state for each field
console.log(user);


const [name, setName] = useState( user?.name);
const [gender, setGender] = useState('');
const [photo, setPhoto] = useState(''); 
const [dob, setDob] = useState('');
const [error, setError] = useState('');
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
  }

  

  const handleNavigation = () => {
    if (!name.trim() || !gender.trim() || !dob.trim()) {
      setError('All fields are required.');
      return;
    }
    setError('');
    navigation.navigate('SelectPreferences');
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);


  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ ...styles.container }}>
        <Header showArrow={true} label={'Edit Profile'} />
        <UploadPhoto photo={photo} setPhoto={setPhoto} error={error} setError={setError} />
        <View style={styles.inputsView}>
          <Input
            placeholder="Name"
            value={name}
            onChange={setName}
            error={error}
            setError={setError}
          />
          <Input
            placeholder="Gender"
            value={gender}
            onChange={setGender}
            error={error}
            setError={setError}
          />
          <Input
            placeholder="Date of Birth"
            value={dob}
            onChange={setDob}
            error={error}
            setError={setError}
          />
        </View>
        {error ? (
          <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>{error}</Text>
        ) : null}
      </ScrollView>
      <View style={styles.buttonView}>
        <Button handleClick={handleNavigation} text="Save & Continue" />
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
    marginTop: 30
  },
  buttonView: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    marginHorizontal: '5%'
  },
});

export default EditProfile;
