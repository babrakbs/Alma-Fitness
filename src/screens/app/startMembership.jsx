import React, {useState} from 'react';
import {SafeAreaView, View, Text, StyleSheet, StatusBar} from 'react-native';
import Header from '../../components/header';
import MembershipType from '../../components/membershipType';
import {MembershipTypeData} from '../../constants/staticData';
import Button from '../../components/Button';
import CalendarComponet from '../../components/calendar';
import {useNavigation} from '@react-navigation/native';

const StartMembership = () => {
  const navigation = useNavigation();
  let [membershipOptions, setMembershipOptions] = useState(MembershipTypeData);
  let [selectedIndex, setSelectedIndex] = useState();
  const handleClick = index => {
    setSelectedIndex(index);
    const updatedOptions = membershipOptions.map((option, i) => {
      if (i === index) {
        return {...option, checked: true};
      } else {
        return {...option, checked: false};
      }
    });
    setMembershipOptions(updatedOptions);
  };

  const handleNavigation = () => {
    navigation.navigate('SelectPaymentMethod');
  };

  return (
    <SafeAreaView
      style={[styles.container]}>
      <StatusBar animated={true} barStyle={'dark-content'} />
      <Header label={'Pro Plan      '} showArrow={true} />
      <View style={styles.midView}>
        <Text style={styles.startDateText}>Start Date</Text>
        <Text style={styles.lowerText}>
          Choose when you want your membership to begin.
        </Text>
        {membershipOptions.map((option, index) => (
          <MembershipType
            key={index}
            index={index}
            title={option.title}
            checked={option.checked}
            handleClick={() => handleClick(index)}
          />
        ))}
        {selectedIndex == 1 && <CalendarComponet />}
      </View>
      <View style={{flex: 0.1}}>
        <Button
          textBold={false}
          text="Start Membership"
          handleClick={handleNavigation}
        />
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
  startDateText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },
  lowerText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#808080',
    marginTop: '2%',
  },
  midView: {
    flex: 0.9,
  },
});

export default StartMembership;
