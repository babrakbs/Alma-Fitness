import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  StatusBar,
} from 'react-native';
import Header from '../../../components/header';
import Input from '../../../components/input';
import Button from '../../../components/Button';
import {supportDataObj} from '../../../constants/staticData';
import {colors, fontFamily} from '../../../constants';

const Support = () => {
  const [supportData, setSupportData] = useState(supportDataObj);
  const [disabledValue, setDisabledValue] = useState(true);
  const [headerText, setHeaderText] = useState(
    'Please enter your name, email address, and describe your issue. Our support team will get back to you shortly.',
  );
  const getInputTypedValues = (field, text) => {
    setSupportData(prevData => ({
      ...prevData, // Keep previous data
      [field]: text, // Update only the field being typed into
    }));
  };
  const checkIfAllFieldsFilled = () => {
    const {name, email, issue} = supportData;
    if (name.trim() && email.trim() && issue.trim()) {
      setDisabledValue(false);
      setHeaderText(
        'Please enter your email address. You will receive a link to create a new password via email.',
      );
    } else {
      setDisabledValue(true);
      setHeaderText(
        'Please enter your name, email address, and describe your issue. Our support team will get back to you shortly.',
      );
    }
  };
  useEffect(() => {
    checkIfAllFieldsFilled();
  }, [supportData]);
  return (
    <>
      <ScrollView style={[styles.scrollViewContainer]}>
        <SafeAreaView style={styles.container}>
          <Header label={'Support           '} showArrow={true} />
          <Text style={styles.heading}>{headerText}</Text>
          <View style={styles.inputsCont}>
            <Input
              onChange={text => getInputTypedValues('name', text)}
              inputBG="#FFFFFF"
              placeholder="Name"
            />
            <Input
              onChange={text => getInputTypedValues('email', text)}
              inputBG="#FFFFFF"
              placeholder="Email"
              customStyles={{
                paddingVertical: 10,
              }}
            />

            <Input
              onChange={text => getInputTypedValues('issue', text)}
              inputBG="#FFFFFF"
              placeholder="Your Message"
              multiline={true}
              numberOfLines={5}
              textalignvertical={true}
              customStyles={{
                height: 170,
                textAlignVertical: 'top',
                textAlign: 'top',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                paddingVertical: 10,
              }}
            />
          </View>
        </SafeAreaView>
      </ScrollView>
      <View style={styles.buttonCont}>
        <Button text="Submit" theme="blackWhite" disabled={disabledValue} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    height: '100%',
    width: '100%',
  },
  container: {
    width: '90%',
    marginHorizontal: '5%',
  },
  heading: {
    width: '100%',
    color: colors.black,
    fontFamily: fontFamily.regular,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
  },
  inputsCont: {
    paddingVertical: 10,
    marginTop: 20,
  },
  buttonCont: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    marginHorizontal: '5%',
    marginBottom: 40,
  },
});

export default Support;
