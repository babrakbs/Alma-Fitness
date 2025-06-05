import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  StatusBar,
  View,
  Pressable,
  ScrollView,
} from 'react-native';
import {
  AlmaLogoImage,
  ArrowDownIcon,
  GoogleTranslateIcon,
} from '../../../constants/svgs';
import {Dropdown} from 'react-native-element-dropdown';
import Button from '../../../components/Button';
import {LanguageData} from '../../../constants/staticData';

const LanguageSelector = ({navigation}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [dropdownVisibility, setDropdownVisibility] = useState(false);

  const handleClick = () => {
    navigation.navigate('OnBoarding');
  };

  const handleDropdownVisibility = () => {
    setDropdownVisibility(!dropdownVisibility);
  };

  const handleLangSelection = value => {
    setSelectedLanguage(value);
    setDropdownVisibility(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.innerContainer}>
          <StatusBar animated={true} backgroundColor="#15161E" />
          <AlmaLogoImage height={82} width={82} style={styles.almaLogo} />
          <Text style={styles.almaText}>Alma</Text>
          <Text style={styles.langPref}>Language Preferences</Text>
        </View>
        <Pressable onPress={handleDropdownVisibility} style={styles.langInput}>
          <View style={styles.innerMain}>
            <View style={styles.inputInner}>
              <GoogleTranslateIcon />
              <Text style={styles.lngText}>
                {selectedLanguage ? selectedLanguage : 'Select Language'}
              </Text>
            </View>
            <ArrowDownIcon />
          </View>
        </Pressable>
        {dropdownVisibility && (
          <View style={styles.dropdownModal}>
            {LanguageData?.map(item => {
              return (
                <Pressable
                  onPress={() => {
                    handleLangSelection(item.label);
                  }}
                  style={styles.langOptions}>
                  <View style={styles.dot} />
                  <Text style={styles.langText}>{item.label}</Text>
                </Pressable>
              );
            })}
          </View>
        )}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          text="Save & Continue"
          theme="whiteBlack"
          widthSize="large"
          handleClick={handleClick}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#15161E',
    height: '100%',
  },
  buttonContainer: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30%',
  },
  almaLogo: {
    alignSelf: 'center',
    height: 82,
    width: 82,
  },
  almaText: {
    color: '#EFEFEB',
    fontSize: 45,
    fontWeight: '500',
  },
  langPref: {
    color: '#EFEFEB',
    marginTop: 50,
    fontWeight: '400',
    fontSize: 16,
  },
  inputContainer: {
    width: '90%',
    backgroundColor: '#373A36',
    paddingVertical: 15,
    borderRadius: 30,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  gTransLangCont: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  langText: {
    color: '#F5F5F5',
    fontWeight: '400',
    fontSize: 16,
    marginLeft: '3%',
  },
  dropdownModal: {
    width: '88.5%',
    backgroundColor: '#373A3680',
    borderColor: '#373A36',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: 20,
    marginTop: -20,
    borderTopColor: 'transparent',
    elevation: 100,
    height: 130,
    alignSelf: 'center',
  },
  dropdown: {
    paddingVertical: 16,
    backgroundColor: 'red',
    backgroundColor: '#373A36',
    borderWidth: 0.5,
    borderRadius: 30,
    paddingHorizontal: '5%',
    width: '90%',
    marginTop: 30,
    zIndex: 1,
  },
  placeholderStyle: {
    marginLeft: 20,
    color: '#F5F5F5',
  },
  langValue: {
    color: '#F5F5F5',
  },
  dropdownView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '5%',
    marginTop: '5%',
  },
  dot: {
    height: 5,
    width: 5,
    backgroundColor: '#F5F5F5',
    borderRadius: 100,
  },
  lngText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#F5F5F5',
    marginLeft: 10,
  },
  langInput: {
    width: '90%',
    backgroundColor: '#373A36',
    paddingVertical: 13,
    borderColor: 'red',
    marginHorizontal: '5%',
    borderRadius: 100,
    marginTop: 30,
  },
  inputInner: {
    flexDirection: 'row',
  },
  innerMain: {
    width: '86%',
    height: 30,
    marginHorizontal: '7%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  langOptions: {
    flexDirection: 'row',
    height: 30,
    marginTop: 10,
    marginLeft: '5%',
    alignItems: 'center',
  },
});

export default LanguageSelector;
