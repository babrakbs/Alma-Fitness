import { Dimensions, Platform, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home/HomeScreen';
import Explore from '../screens/Home/Explore';
import HomeIcon from '../assets/icons/menuWhite.svg';
import Calendar from '../screens/Home/Calendar';
import Profile from '../screens/Home/Profile';
import HomeSelected from '../assets/icons/menuBlack.svg';
import ExploreIcon from '../assets/icons/exploreWhite.svg';
import ExploreSelectedIcon from '../assets/icons/exploreBlack.svg';
import CalendarSelectedIcon from '../assets/icons/searchBlack.svg';
import CalendarIcon from '../assets/icons/searchWhite.svg';
import UserIcon from '../assets/icons/personWhite.svg';
import UserSelectedIcon from '../assets/icons/personBlack.svg';
import AlmaWhiteSIcon from '../assets/icons/AlmaWhiteS';
import ProfileNav from './ProfileNav';
import { colors, fontFamily } from '../constants';

const Tab = createBottomTabNavigator();
const width = Dimensions.get('window').width;
const TabNavigation = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarStyle: [styles.tabBar, {
            marginVertical: Platform.OS === 'ios' ? 20 : 10
          }],
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            let IconComponent;
            if (route.name === "Home") {
              IconComponent = focused ? HomeSelected : HomeIcon;
            } else if (route.name === "Explore") {
              IconComponent = focused ? ExploreSelectedIcon : ExploreIcon;
            } else if (route.name === "Calendar") {
              IconComponent = focused ? CalendarSelectedIcon : CalendarIcon;
            } else if (route.name === "Profile") {
              IconComponent = focused ? UserSelectedIcon : UserIcon;
            }

            return (
              <View style={[styles.iconWrapper, focused && styles.activeTab]}>
                <IconComponent />
                {focused && <Text style={styles.activeLabel}>{route.name}</Text>}
              </View>
            );
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Explore" component={Explore} options={{ headerShown: false }} />
        <Tab.Screen name="Calendar" component={Calendar} options={{ headerShown: false }} />
        <Tab.Screen name="Profile" component={ProfileNav} options={{ headerShown: false }} />
      </Tab.Navigator>

      <View style={[styles.almaScanContainer, {
        bottom: Platform.OS === 'ios' ? 20 : 10
      }]}>
        <AlmaWhiteSIcon />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  tabBar: {
    backgroundColor: colors.black,
    borderRadius: 50,
    justifyContent: 'space-between',
    marginVertical: 10,
    height: 60,
    alignItems: 'center',
    width: width * 0.8,
    paddingBottom: 5,
    marginHorizontal: 5
  },
  iconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 25,
  },
  activeTab: {
    backgroundColor: colors.white,
    marginTop: 4,
    borderRadius: 25,
  },
  activeLabel: {
    color: colors.black,
    fontFamily: fontFamily.regular,
    fontSize: 10.61,
    fontWeight: "400",
    marginLeft: 3,
  },
  almaScanContainer: {
    position: "absolute",
    bottom: 10,
    right: 2,
    alignSelf: "center",
    width: 60,
    height: 60,
    backgroundColor: colors.black,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.9,
    shadowRadius: 12,
    elevation: 20,
    marginHorizontal: 5
  },
});

export default TabNavigation;
