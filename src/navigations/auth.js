// navigation/AuthStack.js
import React, {useEffect, useState, useLayoutEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LanguageSelector from '../screens/auth/onboarding/languageSelect';
import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';
import ForgotPassword from '../screens/auth/ForgotPassword';
import ForgotPasswrodCode from '../screens/auth/ForgotPasswrodCode';
import SetNewPassword from '../screens/auth/SetNewPassword';
import ForgotPasswordSuccess from '../screens/auth/ForgotPasswordSuccess';
import RegistrationSuccess from '../screens/auth/RegistrationSuccess';
import MainScreen from '../screens/plans/MainScreen';
import Plans from '../screens/plans/Plans';
import OnBoarding from '../screens/auth/onboarding/onboarding';
import StartMembership from '../screens/app/startMembership';
import HomeScreen from '../screens/Home/HomeScreen';
import Explore from '../screens/Home/Explore';
import TabNavigation from './TabNavigation';
import ProfileSetup from '../screens/app/profile-setup/profileSetup';
import SelectPreferences from '../screens/app/profile-setup/selectPreferences';
import MembershipDetails from '../screens/app/settings/membershipDetails';
import Support from '../screens/app/settings/support';
import TermsCondition from '../screens/app/settings/termsNConditions';
import PrivacyPolicy from '../screens/app/settings/privacyPolicy';
import FAQ from '../screens/app/settings/faq';
import Settings from '../screens/app/settings/settings';
import SelectPaymentMethod from '../screens/app/payment-method/selectPaymentMethod';
import CardDetails from '../screens/app/payment-method/cardDetails';
import SavedCards from '../screens/app/payment-method/savedCards';
import OTPVerificationPayment from '../screens/app/payment-method/otpVerificationPayment';
import PurchaseSuccess from '../screens/app/payment-method/purchaseSuccess';
import ActionSheetTest from '../screens/Home/ActionSheetTest';
import HomeVenueNav from './HomeVenueNav';
import EditProfile from '../screens/Home/EditUserProfile';
import ClassDetail from '../screens/app/HomeVenue/ClassDetail';
import VenueProfile from '../screens/app/HomeVenue/VenueProfile';
import Favorites from '../screens/Home/Favorites';
import FilterScreen from '../screens/Home/FilterScreen';
import AboutUs from '../screens/app/settings/aboutUs';
import CustomerSupport from '../screens/app/settings/CustomerSupport';
import DeleteAccount from '../screens/app/settings/deleteAccount';
import MembershipDetail from '../screens/plans/MembershipDetail';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChangePassword from '../screens/auth/ChangePassword';
import axiosInstance from '../helper/axiosInstance';
import BlueBgComponent from '../components/BlueBgComponent';
import VenueSchedule from '../screens/app/HomeVenue/VenueSchedule';
import QRScanner from '../screens/app/HomeVenue/QRScanner';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const [initialRoute, setInitialRoute] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('Token');
        console.log('Token:', token);
        if (token) {
          // Check user plan
          try {
            console.log('about to call the api ');
            const response = await axiosInstance.get('/api/getUserPlan');
            // Adjust this check based on your API's response structure
            console.log(
              'herei s teh respons user plan ssss ----<',
              response?.data,
            );
            const {plan} = response?.data?.data;
            console.log('here is the plan of the logineddd user ====>', plan);
            // Check for paused or incomplete status
            if (
              // !plan ||
              // (Array.isArray(plan) && plan.length === 0) ||
              // (plan?.status === 'paused' || plan?.status === 'incomplete' )
              // false
              true
            ) {
              setInitialRoute('Plans');
            } else {
              setInitialRoute('TabNav');
            }
          } catch (planErr) {
            // If API fails, fallback to membership screen
            setInitialRoute('Plans');
          }
        } else {
          // setInitialRoute('LanguageSelector');
          setInitialRoute('OnBoarding');
        }
      } catch (e) {
        // setInitialRoute('LanguageSelector');
        setInitialRoute('OnBoarding');
      } finally {
        setLoading(false);
      }
    };
    checkToken();
  }, []);

  if (loading) return null; // or a loading spinner

  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      {/* // <Stack.Navigator initialRouteName={'Plans'}> */}
      <Stack.Screen
        options={{headerShown: false}}
        name="LanguageSelector"
        component={LanguageSelector}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Login"
        component={Login}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name="ClassDetail"
        component={ClassDetail}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="VenueProfile"
        component={VenueProfile}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ClassDetails"
        component={ClassDetail}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Signup"
        component={Signup}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name="RegistrationSuccess"
        component={RegistrationSuccess}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name="ForgotPassword"
        component={ForgotPassword}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ChangePassword"
        component={ChangePassword}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name="ForgotPasswrodCode"
        component={ForgotPasswrodCode}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="QRScannerScreen"
        component={QRScanner}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="SetNewPassword"
        component={SetNewPassword}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ForgotPasswordSuccess"
        component={ForgotPasswordSuccess}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="MainScreenPlans"
        component={MainScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Plans"
        component={Plans}
      />
      {/* <Stack.Screen
        options={{headerShown: false}}
        name="OnBoarding"
        component={OnBoarding}
      /> */}
      <Stack.Screen
        options={{headerShown: false}}
        name="StartMemberships" //This needs to be fixed , i added an S
        component={StartMembership}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="TabNav"
        component={TabNavigation}
      />

      <Stack.Screen
        name="HomeVenuNav"
        options={{headerShown: false}}
        component={HomeVenueNav}
      />

      {/* <Stack.Screen
        options={{headerShown: false}}
        name="ActionSheetTest"
        component={ActionSheetTest}
      /> */}
      {/* <Stack.Screen
        options={{headerShown: false}}
        name="HomeScreen"
        component={HomeScreen}
      /> */}
      <Stack.Screen
        options={{headerShown: false}}
        name="Explore"
        component={Explore}
      />
      {/* <Stack.Screen options={{ headerShown: false }} name="OnBoarding" component={OnBoarding} />
      <Stack.Screen options={{ headerShown: false }} name="StartMembership" component={StartMembership} /> */}

      <Stack.Screen
        options={{headerShown: false}}
        name="OnBoarding"
        component={OnBoarding}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="MembershipDetail"
        component={MembershipDetail}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="StartMembership"
        component={StartMembership}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ProfileSetup"
        component={ProfileSetup}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="SelectPreferences"
        component={SelectPreferences}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="MembershipDetails"
        component={MembershipDetails}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Support"
        component={Support}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="VenueSchedule"
        component={VenueSchedule}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="TermsCondition"
        component={TermsCondition}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="AboutUs"
        component={AboutUs}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="CustomerSupport"
        component={CustomerSupport}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="DeleteAccount"
        component={DeleteAccount}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="PrivacyPolicy"
        component={PrivacyPolicy}
      />
      <Stack.Screen options={{headerShown: false}} name="FAQ" component={FAQ} />
      <Stack.Screen
        options={{headerShown: false}}
        name="Settings"
        component={Settings}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="SelectPaymentMethod"
        component={SelectPaymentMethod}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="CardDetails"
        component={CardDetails}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="SavedCards"
        component={SavedCards}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="OTPVerificationPayment"
        component={OTPVerificationPayment}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="AccountCreated"
        component={BlueBgComponent}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="PurchaseSuccess"
        component={PurchaseSuccess}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="EditProfile"
        component={EditProfile}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Filter"
        component={FilterScreen}
      />
      {/* <Stack.Screen
        options={{headerShown: false}}
        name="Favorites"
        component={Favorites}
      /> */}
    </Stack.Navigator>
  );
};

export default AuthStack;
