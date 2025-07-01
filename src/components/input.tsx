import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CalendarIcon from '../assets/icons/CalendarIcon.svg';
import { colors, fontFamily } from '../constants';
import RNPickerSelect from 'react-native-picker-select';
import { heightPercentageToDP } from 'react-native-responsive-screen';
// import DropdownIcon from '../assets/icons/DropDown_icon.svg';
import { Dropdown } from 'react-native-element-dropdown';

interface InputProps {
  placeholder: string;
  showLeftIcon?: boolean;
  showRighIcon?: boolean;
  leftSVGIcon?: any;
  rightSVGIcon?: any;
  type?: string;
  inputBG?: string;
  onChangeText?: (value: string) => void;
  numberoflines?: number;
  textalignvertical?: boolean;
  secureTextEntry: false;
  rightIconPress?: (value: string) => void;
  value?: any;
  error: string;
  errorColor: string;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  showLeftIcon,
  showRighIcon,
  leftSVGIcon: LeftSVGIcon,
  rightSVGIcon: RightSVGIcon,
  type = 'text',
  inputBG = '#FFFFFF',
  onChangeText,
  numberoflines,
  textalignvertical = false,
  customStyles,
  secureTextEntry,
  rightIconPress,
  value,
  error,
  errorColor,
}) => {
  const [selectedGender, setSelectedGender] = useState('');
  const [dob, setDob] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  console.log('value', value);

  // Sync selectedGender, dob, and nameValue with value prop
  useEffect(() => {
    if (placeholder === 'Gender' && value !== selectedGender) {
      setSelectedGender(value || '');
    }
    if (placeholder === 'Date of Birth') {
      let formatted = value || '';
      if (formatted && formatted.includes('T')) {
        formatted = formatted.split('T')[0]; // Extract YYYY-MM-DD
      }
      if (formatted !== dob) {
        setDob(formatted);
      }
    }
    if (placeholder === 'Name' && value !== nameValue) {
      setNameValue(value || '');
    }
  }, [value, placeholder]);

  const handleConfirm = (date: Date) => {
    const formattedDate = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    setDob(formattedDate);
    setDatePickerVisible(false);
    onChangeText?.(formattedDate);
  };

  return (
    <>
      <View
        style={[
          styles.container,
          { backgroundColor: inputBG, marginBottom: error ? 0 : 10 },
        ]}>
        {showLeftIcon && LeftSVGIcon}

        {placeholder === 'Gender' ? (
          <View style={styles.container2}>
            <RNPickerSelect
              onValueChange={value => setSelectedGender(value)}
              value={selectedGender}
              placeholder={{
                label: 'Gender',
                value: null,
                color: colors.darkWhite,
              }}
              items={[
                { label: 'Male', value: 'Male' },
                { label: 'Female', value: 'Female' },
              ]}
              useNativeAndroidPickerStyle={false} // Important for custom styles
              style={{
                inputIOS: styles.inputIOS,
                inputAndroid: styles.inputAndroid,
                iconContainer: styles.iconContainer,
              }}
              Icon={() => null} // Hide default icon if you want
            />
          </View>
        ) : placeholder === 'Date of Birth' ? (
          <TouchableOpacity
            style={[styles.inputField, { alignItems:'flex-start',justifyContent:'center' }]}
            onPress={() => setDatePickerVisible(true)}>
            <Text style={dob ? styles.inputText : styles.placeholderText}>
              {dob || 'Date of Birth'}
            </Text>
          </TouchableOpacity>
        ) : placeholder === 'Name' ? (
          <TextInput
            // placeholderTextColor={colors.darkWhite}
            placeholderTextColor={'#A3A3A3'}
            placeholder={placeholder}
            style={
              customStyles
                ? customStyles
                : [styles.inputField]
              // : [styles.inputField, {paddingTop: textalignvertical ? 20 : 10}]
            }
            secureTextEntry={secureTextEntry ? secureTextEntry : false}
            onChangeText={text => {
              setNameValue(text);
              onChangeText?.(text);
            }}
            numberOfLines={numberoflines || 1}
            textAlignVertical={textalignvertical ? 'top' : 'auto'}
            multiline={textalignvertical}
            value={nameValue}
          />
        ) : (
          <TextInput
            placeholderTextColor={'#A3A3A3'}
            placeholder={placeholder}
            style={
              customStyles
                ? customStyles
                : [styles.inputField]
            }
            secureTextEntry={secureTextEntry ? secureTextEntry : false}
            onChangeText={onChangeText}
            numberOfLines={numberoflines || 1}
            textAlignVertical={textalignvertical ? 'top' : 'auto'}
            multiline={textalignvertical}
            value={value}
          />
        )}

        {placeholder === 'Date of Birth' && (
          <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
            <CalendarIcon width={20} height={20} />
          </TouchableOpacity>
        )}

        {showRighIcon && RightSVGIcon && (
          <TouchableOpacity onPress={rightIconPress}>
            <RightSVGIcon />
          </TouchableOpacity>
        )}

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={() => setDatePickerVisible(false)}
        />
      </View>
      {error ? (
        <Text
          allowFontScaling={false}
          style={[styles.error, { color: errorColor || colors.error }]}>
          {error}
        </Text>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 26,
    // marginBottom: 10,
    backgroundColor: '#EFEFEB',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    // height: 50,
    justifyContent: 'space-between',
  },
  inputField: {
    flex: 1,
    color: colors.black,
    fontFamily: fontFamily.regular,
    fontSize: 15.44,
    height: heightPercentageToDP(5.6),
  },
  inputText: {
    color: colors.black,
    fontFamily: fontFamily.regular,
    fontSize: 16,
  },
  placeholderText: {
    color: colors.darkWhite,
    fontFamily: fontFamily.regular,
    fontSize: 16,
  },
  pickerContainer: {
    flex: 1,
    textAlign: 'center',
    // justifyContent: 'space-around',
    // alignItems:'flex-start',
    // height: '100%',
  },
  picker: {
    width: '105%',
    height: 50,
    // marginRight:10,
    color: colors.darkWhite,
  },
  error: {
    fontSize: 14,
    color: colors.error,
    textAlign: 'left',
    paddingHorizontal: 10,
    // marginTop: 4,
    marginVertical: 10,
  },
  container2: {
    width: '80%',
    alignSelf: 'center',
  },
  inputIOS: {
    height: 45,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    color: 'black',
    fontSize: 16,
    justifyContent: 'center',
  },
  inputAndroid: {
    height: 45,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    color: 'black',
    fontSize: 16,
    justifyContent: 'center',
  },
  iconContainer: {
    top: 12,
    right: 10,
  },
});

export default Input;