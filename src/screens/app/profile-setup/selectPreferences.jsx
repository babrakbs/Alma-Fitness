import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../../components/header';
import PreferenceListItem from '../../../components/preferenceListItem';
import {PreeferenceListItemsData} from '../../../constants/staticData';
import Button from '../../../components/Button';
import {colors, fontFamily} from '../../../constants';
import axiosInstance from '../../../helper/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SelectPreferences = ({navigation, route}) => {
  const [preferenceList, setPreferenceList] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const fetchPreferenceList = async () => {
    try {
      setCategoriesLoading(true);
      const response = await axiosInstance.get('/api/categoriesList');
      // Add checked property to each item for selection state
      const records = (response?.data?.data?.records || []).map(item => ({
        ...item,
        checked: false,
      }));
      setPreferenceList(records);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setCategoriesLoading(false);
    }
  };

  useEffect(() => {
    fetchPreferenceList();
  }, []);

  const profileData = route?.params?.profileData;

  console.log('profileData======', profileData);

  const handleClick = index => {
    const updatedOptions = preferenceList.map((option, i) => {
      if (i === index) {
        return {...option, checked: !option.checked};
      }
      return option;
    });
    setPreferenceList(updatedOptions);
  };

  const handleNavigation = () => {
    const selectedPreferenceIds = preferenceList
      .filter(item => item.checked)
      .map(item => item.id);

    // Always create a new FormData to avoid duplicates
    if (profileData instanceof FormData) {
      const newFormData = new FormData();

      // Copy all existing fields except preferences[]
      if (profileData._parts) {
        profileData._parts.forEach(([key, value]) => {
          if (!key.startsWith('preferences')) {
            newFormData.append(key, value);
          }
        });
      }
      // Append current preferences
      selectedPreferenceIds.forEach(id => {
        newFormData.append('preferences[]', id);
      });

      // Add this console log to see what is being sent
      console.log('FormData being sent:');
      if (newFormData._parts) {
        newFormData._parts.forEach(([key, value]) => {
          console.log(key, value);
        });
      }

      setButtonLoading(true);
      axiosInstance
        .post('/api/setupProfile', newFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          console.log('response in setupProfile', response?.data);
          setButtonLoading(false);
          navigation.navigate('AccountCreated', {payload: newFormData});
        })
        .catch(error => {
          setButtonLoading(false);
          console.log('Error in setupProfile', error);
        });
    } else {
      // fallback if profileData is not FormData
      const payload = {
        preferences: selectedPreferenceIds,
        profile_image: profileData?.photo,
        gender: profileData?.gender,
        dob: profileData?.dateOfBirth,
      };

      // Add this console log to see what is being sent
      console.log('Payload being sent:', payload);

      axiosInstance
        .post('/api/setupProfile', payload)
        .then(response => {
          console.log('response in setupProfile', response);
          navigation.navigate('AccountCreated', {payload});
        })
        .catch(error => {
          console.log('Error in setupProfile', error);
        });
    }
  };

  return (
    <LinearGradient
      colors={['#ffffff', '#ffffff']}
      style={styles.linearGradientContainer}>
      <StatusBar barStyle={'light-content'} />
      <View style={{...styles.innerContainer}}>
        <Header showArrow={true} label={'Preferences     '} />
        <Text style={styles.workoutInterestText}>
          Tell us about your workout interests to personalize your fitness
          experience.
        </Text>
        <View style={styles.preferenceListContainer}>
          <View className={styles.listHeader}></View>
          {categoriesLoading ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                height: 100,
              }}>
              <ActivityIndicator
                size="large"
                color={colors.primary || '#000'}
              />
            </View>
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.listItemContainer}>
              {preferenceList?.map((item, index) => {
                return (
                  <PreferenceListItem
                    key={item.id || index}
                    title={item.title || item.name}
                    checked={item.checked}
                    handleClick={() => handleClick(index)}
                    image={item.image}
                  />
                );
              })}
            </ScrollView>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            text="Continue"
            handleClick={handleNavigation}
            loading={buttonLoading}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradientContainer: {
    flex: 1,
  },
  innerContainer: {
    width: '90%',
    // borderWidth: 2,
    // borderColor: 'red',
    // flex: 1,
    marginHorizontal: '5%',
  },
  workoutInterestText: {
    color: colors.darkWhite,
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: fontFamily.regular,
    lineHeight: 22,
    width: '70%',
    // flex: 0.09
  },
  preferenceListContainer: {
    width: '100%',
    height: '72%',
    // backgroundColor: '#373A3680',
    borderRadius: 30,
    // flex: 0.80,
    marginTop: '5%',
    maxHeight: 550,
    // paddingTop: 10,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginHorizontal: '5%',
    // flex: 0.08,
    alignItems: 'flex-end',
  },
  workoutText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#EFEFEB',
  },
  totalCount: {
    color: '#818C81',
    fontSize: 14,
    fontWeight: '400',
  },
  listItemContainer: {
    width: '86%',
    marginHorizontal: '2%',
    marginTop: '2%',
    // flex: 0.92,
    overflow: 'scroll',
  },
  buttonContainer: {
    // flex: 0.13,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default SelectPreferences;
