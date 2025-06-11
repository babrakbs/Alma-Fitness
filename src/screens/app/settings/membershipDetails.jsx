import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Header from '../../../components/header';
import MembershipDetailsHeading from '../../../components/membershipDetailHeading';
import MembershipSpecificButton from '../../../components/membershipSpecificBtn';
import Button from '../../../components/Button';
import CustomBottomSheet from '../../../components/CustomBottomSheet';
// Remove: import ReactNativeModal from 'react-native-modal';
import {DangerwarningIcon, WhiteLogoIcon} from '../../../constants/svgs';
import RadioGroup from 'react-native-radio-buttons-group';
import MembershipCard from '../../plans/MembershipCard';
import {colors, fontFamily} from '../../../constants';
import axiosInstance from '../../../helper/axiosInstance';
import {ActivityIndicator} from 'react-native';
const MembershipDetails = ({navigation}) => {
  const [warningModal, setWarningModal] = useState(false);
  const [PausemembershipModal, setPausemembershipModal] = useState(false);
  const [pauseMembership, setPauseMembership] = useState(false);
  const [selectedOption, setSelectedOption] = useState('1_month');
  const [userPlan, setUserPlan] = useState(null);
  const [loading, setLoading] = useState(false); // <-- Add loading state

  // Options for the radio buttons
  const options = [
    {id: '1_month', label: '1 Month'},
    {id: '2_months', label: '2 Months'},
    {id: '3_month', label: '3 Month'},
    {id: '4_months', label: '4 Months'},
    {id: '5_month', label: '5 Month'},
    {id: '6_months', label: '6 Months'},
    {id: 'until_manual', label: 'Until I turn it back on'},
  ];

  const fetchUserPlan = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/api/getUserPlan');
      const {plan} = response.data?.data;
      setUserPlan(plan);

      console.log(formatRenewalDate(userPlan[0]?.current_period_end));
      console.log('User Plan:', plan);
    } catch (error) {
      console.error('Error fetching user plan:', error);
    } finally {
      setLoading(false);
    }
  }, [userPlan]);

  useEffect(() => {
    fetchUserPlan();
  }, []);
  const warningSheetRef = useRef();
  const pauseMembershipSheetRef = useRef();
  const pauseConfirmSheetRef = useRef();
  const formatRenewalDate = isoString => {
    if (!isoString) return '';
    const date = new Date(isoString);
    const options = {day: 'numeric', month: 'long', year: 'numeric'};
    return date.toLocaleDateString('en-GB', options);
  };

  const [credits, setCredits] = useState({
    2: {
      price: '€6.00',
      description: '2 Credits',
      subdec: '€3.00/Credits',
      discount: false,
    },
    10: {
      price: '€25.00 (20% off)',
      subdec: '€3.00/Credits',
      description: '10 Credits',
      discount: true,
    },
    25: {
      price: '€60.00 (20% off)',
      subdec: '€3.00/Credits',
      description: '25 Credits',
      discount: true,
    },
    50: {
      price: '€67.00 (20% off)',
      subdec: '€3.00/Credits',
      description: '50 Credits',
      discount: true,
    },
  });

  const handlePress = key => {
    console.log(`Buy Now button pressed for ${credits[key].description}`);
  };

  const handleSelectOption = id => {
    setSelectedOption(id);
  };

  const pauseMembershipApi = async () => {
    console.log('Selected Option:', selectedOption);
    console.log('User Plan:', userPlan);

    if (!userPlan?.stripe_subscription_id) {
      console.error('No subscription ID found.');
      return;
    }

    // Map selectedOption to correct API value
    let duration;
    if (selectedOption === '1_month') duration = 1;
    else if (selectedOption === '2_months') duration = 2;
    else if (selectedOption === '3_months') duration = 3;
    else if (selectedOption === '4_months') duration = 4;
    else if (selectedOption === '5_months') duration = 5;
    else if (selectedOption === '6_months') duration = 6;
    else if (selectedOption === 'until_manual') duration = 'until_manual';
    else duration = selectedOption; // fallback

    try {
      const payload = {
        subscription_id: userPlan.stripe_subscription_id,
        duration_months: duration, // 1, 2, or 'until_manual'
      };
      console.log('Payload:', payload);
      const response = await axiosInstance.post(
        '/api/pauseMembership',
        payload,
      );
      console.log('Pause Membership Response:', response?.data);
      // Optionally, show a success message or update UI here
    } catch (error) {
      console.error('Error pausing membership:', error);
    }
  };

  const handleCancelMembership = () => {
    console.log('Cancelling membership...');
    warningSheetRef.current?.close();
  };

  const handlePauseFromWarning = () => {
    warningSheetRef.current?.close();
    setTimeout(() => {
      pauseMembershipSheetRef.current?.open();
    }, 200);
  };

  return (
    <>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={colors.black} />
        </View>
      ) : (
        <View style={styles.mainContainer}>   
        
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContent}>
        <SafeAreaView />
            {/* 0.1 */}
            <Header showArrow={true} label={'Membership       '} />
            {/* 0.2 */}
            <View style={styles.proMemDetailsContainer}>
              <MembershipCard plan={userPlan} />
            </View>
            {/* 0.15 */}
            <View style={styles.renewalDateCont}>
              <MembershipDetailsHeading text={'Renewal Date'} />
              {userPlan?.length > 0 ? (
                <MembershipSpecificButton
                  marginTop={'5%'}
                  label={formatRenewalDate(userPlan[0]?.current_period_end)}
                />
              ) : (
                ''
              )}

              <MembershipSpecificButton
                marginTop={'5%'}
                label={'Change Payment Method'}
              />
            </View>
          </ScrollView>
          <View style={styles.bottomBtnCont}>
            <Button
              text="Pause Membership"
              theme="grayWhite"
              textBold={false}
              handleClick={() => pauseMembershipSheetRef.current?.open()}
            />
            <Button
              marginTop={10}
              text="Cancel Membership"
              theme="whiteBlack"
              borderLess={false}
              textBold={false}
              handleClick={() => warningSheetRef.current?.open()}
            />
          </View>
        </View>
      )}
      {/* Warning Bottom Sheet */}
      <CustomBottomSheet ref={warningSheetRef} snapPoints={['70']}>
        <View style={[styles.modalContent]}>
          <Text style={styles.modalTextTitle}>Cancel Membership</Text>
          <Text
            style={[
              styles.modalTextTitle,
              {
                fontSize: 18,
                fontWeight: 600,
                textAlign: 'left',
                marginBottom: 10,
                marginTop: 20,
              },
            ]}>
            Are you sure you want to cancel your monthly membership? You will
            continue to have access until the end of your current billing cycle.
          </Text>
          <Text
            style={[
              styles.modalTextTitle,
              {
                fontSize: 18,
                fontWeight: 600,
                textAlign: 'left',
                marginBottom: 10,
                marginTop: 10,
              },
            ]}>
            What about a pause instead?
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '400',
              color: colors.darkWhite,
              textAlign: 'left',
              lineHeight: 24,
              fontFamily: fontFamily.regular,
              marginBottom: 5,
            }}>
            Cancelling your membership deletes all user data meaning your
            profile, bookings, history, favorites will be lost. If you want to
            join again you will have to create a new account.
          </Text>
          <View
            style={{
              justifyContent: 'space-around',
              width: '100%',
            }}>
            <Button
              handleClick={handlePauseFromWarning}
              text="Pause Membership"
              textBold={true}
              marginTop={15}
              borderLess={false}
              widthSize={'large'}
            />
            <Button
              handleClick={handleCancelMembership}
              text="Cancel Membership"
              textBold={true}
              marginTop={15}
              borderLess={false}
              theme="whiteBlack"
              widthSize={'large'}
            />
          </View>
        </View>
      </CustomBottomSheet>

      {/* Pause Membership Options Bottom Sheet */}
      <CustomBottomSheet ref={pauseMembershipSheetRef} snapPoints={['95']}>
        {/* <View style={[styles.modalContent]}> */}
        <Text style={styles.modalTextTitle}>Pause Membership</Text>
        <Text
          style={[
            styles.modalTextTitle,
            {
              fontSize: 18,
              fontWeight: 600,
              textAlign: 'left',
              marginBottom: 10,
              marginTop: 20,
            },
          ]}>
          Are you sure you want to pause your monthly membership? You will
          continue to have access until the end of your current billing cycle.{' '}
        </Text>
        <Text
          style={[
            styles.modalTextTitle,
            {
              fontSize: 18,
              fontWeight: 600,
              textAlign: 'left',
              marginBottom: 10,
              marginTop: 10,
            },
          ]}>
          Pause Duration
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '400',
            color: colors.darkWhite,
            textAlign: 'left',
            lineHeight: 24,
            fontFamily: fontFamily.regular,
            marginBottom: 5,
          }}>
          Choose the duration you want you membership to be paused for. You can
          resume your membership at any time.
        </Text>
        <View style={{alignSelf: 'left'}}>
          {options.map(option => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionContainer}
              onPress={() => handleSelectOption(option.id)}>
              <View style={styles.radioButtonOuter}>
                {selectedOption === option.id && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
              <Text style={styles.optionLabel}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View
          style={{
            justifyContent: 'space-around',
            width: '100%',
          }}>
          <Button
            handleClick={() => {
              pauseMembershipSheetRef.current?.close();
              pauseMembershipApi();
              setTimeout(() => {
                pauseConfirmSheetRef.current?.open();
              }, 200);
            }}
            text="Pause Membership"
            textBold={true}
            marginTop={15}
            borderLess={false}
            widthSize={'large'}
          />
          <Button
            handleClick={() => pauseMembershipSheetRef.current?.close()}
            text="Cancel"
            textBold={true}
            marginTop={15}
            borderLess={false}
            theme="whiteBlack"
            widthSize={'large'}
          />
        </View>
        {/* </View> */}
      </CustomBottomSheet>

      {/* Pause Confirmation Bottom Sheet */}
      <CustomBottomSheet ref={pauseConfirmSheetRef} snapPoints={['70']}>
        <View style={[styles.modalContent]}>
          <Text style={styles.modalTextTitle}>Cancel Membership</Text>
          <Text
            style={[
              styles.modalTextTitle,
              {
                fontSize: 18,
                fontWeight: 600,
                textAlign: 'left',
                marginBottom: 10,
                marginTop: 20,
              },
            ]}>
            Are you sure you want to cancel your monthly membership? You will
            continue to have access until the end of your current billing cycle.
          </Text>
          <Text
            style={[
              styles.modalTextTitle,
              {
                fontSize: 18,
                fontWeight: 600,
                textAlign: 'left',
                marginBottom: 10,
                marginTop: 10,
              },
            ]}>
            What about a pause instead?
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '400',
              color: colors.darkWhite,
              textAlign: 'left',
              lineHeight: 24,
              fontFamily: fontFamily.regular,
              marginBottom: 5,
            }}>
            Cancelling your membership deletes all user data meaning your
            profile, bookings, history, favorites will be lost. If you want to
            join again you will have to create a new account.
          </Text>
          <View
            style={{
              justifyContent: 'space-around',
              width: '100%',
            }}>
            <Button
              handleClick={() => pauseConfirmSheetRef.current?.close()}
              text="Yes"
              textBold={true}
              marginTop={15}
              borderLess={false}
              widthSize={'large'}
            />
            <Button
              handleClick={() => pauseConfirmSheetRef.current?.close()}
              text="No"
              textBold={true}
              marginTop={15}
              borderLess={false}
              theme="whiteBlack"
              widthSize={'large'}
            />
          </View>
        </View>
      </CustomBottomSheet>

      {/* Initial Pause Membership Bottom Sheet - Commented out
      <CustomBottomSheet ref={initialPauseSheetRef} snapPoints={['80']}>
        <View style={[styles.modalContent]}>
          <View style={{justifyContent: 'flex-start', marginBottom: 20}}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                color: colors.black,
                fontFamily: fontFamily.semiBold,
              }}>
              Better Deals for you
            </Text>
          </View>
          {Object.keys(credits).map(key => (
            <View key={key} style={styles.creditContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '80%',
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 70,
                    height: 70,
                    backgroundColor: '#818C81',
                    borderRadius: 15,
                    marginRight: 10,
                  }}>
                  <WhiteLogoIcon />
                </View>
                <View>
                  <Text
                    style={[
                      styles.creditDescription,
                      {
                        fontSize: 16,
                        fontWeight: '600',
                        color: colors.black,
                        fontFamily: fontFamily.semiBold,
                      },
                    ]}>
                    {credits[key].description}
                  </Text>
                  <Text style={styles.creditPrice}>{credits[key].subdec}</Text>
                  <Text
                    style={[
                      styles.creditPrice,
                      credits[key].discount && {
                        color: colors.darkWhite,
                        fontWeight: '500',
                        fontFamily: fontFamily.regular,
                      },
                    ]}>
                    {credits[key].price + ' '}
                    {credits[key].discount && (
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '400',
                          color: colors.black,
                          textDecorationLine: 'line-through',
                        }}>
                        €25.00
                      </Text>
                    )}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.buyNowButton}
                onPress={() => handlePress(key)}>
                <Text style={styles.buyNowText}>Buy Now</Text>
              </TouchableOpacity>
            </View>
          ))}
          <Button
            marginTop={10}
            text="Skip"
            textBold={true}
            handleClick={() => {
              initialPauseSheetRef.current?.close();
              setTimeout(() => {
                pauseMembershipSheetRef.current?.open();
              }, 200);
            }}
          />
        </View>
      </CustomBottomSheet>
      */}
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    paddingHorizontal: '5%',
    paddingBottom: 20,
  },
  proMemDetailsContainer: {
    marginTop: 20,
  },
  renewalDateCont: {
    marginTop: 20,
  },
  bottomBtnCont: {
    width: '100%',
    paddingHorizontal: '5%',
    paddingVertical: 20,
    backgroundColor: '#F7F7F7',
    // borderTopWidth: 1,
    // // borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '100%',
    height: 'auto',
    alignSelf: 'center',
    // justifyContent: 'center',
    // alignItems: 'center',
    borderRadius: 20,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  modalTextTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.black,
    fontFamily: fontFamily.semiBold,
    textAlign: 'center',
  },
  radioGroup: {
    alignItems: 'center', // Align radio buttons and text to the left
  },
  radioButton: {
    marginVertical: 5, // Add some space between the radio buttons
    fontSize: 7, // Decrease text size
    scale: 0.8, // Decrease radio button size (this may need to be configured in the library)
  },

  optionContainer: {
    flexDirection: 'row', // Align radio button and text in a row
    alignItems: 'center', // Vertically center the text and radio button
    marginVertical: 10,
    // Add spacing between each option
  },
  radioButtonOuter: {
    height: 19,
    width: 19,
    borderRadius: 10, // Make the outer circle rounded
    borderWidth: 2,
    borderColor: colors.black, // Border color for the radio button
    justifyContent: 'center', // Center the inner circle
    alignItems: 'center',
    marginRight: 10, // Space between radio button and text
  },
  radioButtonInner: {
    height: 10,
    width: 10,
    alignSelf: 'center',
    borderRadius: 5, // Make the inner circle rounded
    backgroundColor: colors.black, // Inner circle color
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.black,
    fontFamily: fontFamily.medium,
  },

  creditContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  creditDescription: {
    fontSize: 18,
  },
  creditPrice: {
    fontSize: 14,
    color: colors.darkWhite,
    fontFamily: fontFamily.regular,
  },
  buyNowButton: {
    backgroundColor: colors.lightGray,
    padding: 10,
    borderRadius: 8,
  },
  buyNowText: {
    color: colors.black,
    fontSize: 14,
    fontFamily: fontFamily.semiBold,
    fontWeight: '300',
  },
});

export default MembershipDetails;
