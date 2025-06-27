import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  View,
  StatusBar,
} from 'react-native';
import Header from '../../../components/header';
import SettingsButton from '../../../components/settingsButton';
import {SettingsData} from '../../../constants/staticData';
import Button from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../../constants';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const Settings = () => {
  const navigation = useNavigation();
  return (
    <>
    {/* // <SafeAreaView style={[styles.container]}> */}
      {/* <View style={styles.headerCont}> */}
      {/* <Header label={'Settings          '} showArrow /> */}
      {/* </View> */}
      {/* Use ScrollView to enable scrolling if there are many settings */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}>
        {Object.keys(SettingsData).map((section, index) => (
          <React.Fragment key={index}>
            {/* <Text style={{...styles.heading, marginTop: index !== 0 ? 20 : 0}}>{section}</Text> */}
            {SettingsData[section].map((item, idx) => (
              <SettingsButton
                key={idx}
                title={item.title}
                showRadioButton={item.showRadioButton}
                navString={item?.navigationString && item?.navigationString}
              />
            ))}
          </React.Fragment>
        ))}
      </ScrollView>
      <View style={styles.buttonCont}>
        {/* <Button handleClick={() => navigation.navigate('Login')} text='Logout' theme='blackWhite' /> */}
      </View>
    {/* // </SafeAreaView> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: heightPercentageToDP(5),
    // backgroundColor:colors.white
  },
  scrollViewContent: {
    // paddingBottom: 40,
    marginTop:heightPercentageToDP(4),
    // backgroundColor:'red'
  },
  sectionHeader: {
    fontSize: 18,
    // fontWeight: 'bold',
    marginTop: 20,
  },
  heading: {
    color: '#15161E',
    fontSize: 16,
    // fontWeight: '700',
    marginLeft: '5%',
  },
  buttonCont: {
    width: '90%',
    marginHorizontal: '5%',
    marginBottom: 20,
  },
  headerCont: {
    width: '90%',
    marginHorizontal: '5%',
  },
});

export default Settings;
