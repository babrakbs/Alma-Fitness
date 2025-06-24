/** @format */

import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AlmaxIcon from "../../assets/icons/Almax";
import VenueCard from "../../components/Home/VenueCard";
import TextLink from "../../components/Home/TextLink";
import FilterPill from "../../components/Home/FilterPill";
import ClassesCard from "../../components/Home/ClassesCard";
import HomeCarousel from "./HomeCarousel";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AlmaScans from "../../assets/icons/AlmaScans";
import { HeartIconWhite, HeartIconWhites } from "../../constants/svgs";
import { colors } from "../../constants";
import WelcomeImage from "./WelcomeImage";
import HomeCarouselHorizontal from "./FitnessCategories";
import FitnessCategories from "./FitnessCategories";
import axiosInstance from "../../helper/axiosInstance";
import { useSelector } from "react-redux";

const workouts = [
  {
    imageUrl: require("../../assets/images/TwoMenExercise.jpg"),
    heading: "Flow Pilates",
    subText: "Pilates Hub",
    dateText: "18 Sept. 13:30 - 14:30",
    address: "Panormou 130, 10865 Athens, Greece",
    number: "10",
  },
  {
    imageUrl: require("../../assets/images/TwoMenExercise.jpg"),
    heading: "Yin Yoga",
    subText: "Tar Studio",
    dateText: "11 July. 18:00 - 19:30",
    address: "Pl. Asteros 38 10832 Athens Greece",
    number: "10",
  },
  {
    imageUrl: require("../../assets/images/TwoMenExercise.jpg"),
    heading: "Boxing Techniques",
    subText: "Dopamine Studio",
    dateText: "18 Sept. 13:30 - 14:30",
    address: "Panormou 130, 10865 Athens, Greece",
    number: "10",
  },
  {
    imageUrl: require("../../assets/images/TwoMenExercise.jpg"),
    heading: "Boxing Technique",
    subText: "Pilates Hub",
    dateText: "18 Sept. 13:30 - 14:30",
    address: "Panormou 130, 10865 Athens, Greece",
    number: "10",
  },
];

const HomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [venues, setVenues] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const user = useSelector((state) => state?.reducer?.user);
  console.log("user", user);

  useFocusEffect(() => {
    setLoading(false);
    // console.log("I am");

    return () => {
      // console.log("UNMPONNTED");
      setLoading(true);
    };
  });
  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/api/categoriesList");

      setCategories(response?.data?.data?.records);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const fetchVenues = async () => {
    try {
      const response = await axiosInstance.post("/api/venuesList");
      setVenues(response?.data?.data);
      console.log("venues", response?.data?.data[0]); // Add this line for debugging
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const fetchSchedules = async () => {
    try {
      const response = await axiosInstance.post("/api/schedulesList");
      console.log("response schedules", response?.data); // Add this line for debugging
      setSchedules(response?.data?.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  useEffect(() => {
    fetchVenues();
    fetchCategories();
    fetchSchedules();
  }, []);

  return loading ? (
    <ActivityIndicator
      size={50}
      color={"black"}
      style={{
        marginTop: StatusBar.currentHeight,
        height: "100%",
        justifyContent: "center",
      }}
    />
  ) : (
    <GestureHandlerRootView>
      <SafeAreaView style={{ backgroundColor: "white" }}>
        <ScrollView
          style={{
            backgroundColor: "white",
            // marginBottom: 50,
            // flex: 1,
          }}
        >
          {/* <View style={styles.header}> */}
          {/* <Text style={styles.heading}>Hi, Mark</Text> */}
          {/* <AlmaxIcon /> */}
          {/* <TouchableOpacity
            onPress={() => {
              navigation.navigate('Profile', {
                screen: 'Favorites',
              });
            }}>
            {/* <HeartIconWhite width={24} height={24} /> */}
          {/* </TouchableOpacity>  */}
          {/* </View> */}
          <View style={{ width: "95%", margin: "auto" }}>
            <TextLink
              firstText={user?.name ? `Hi, ${user?.name}` : "Hi, Mark"}
              navTo="Expore"
              secondText={"Athens, Greece"}
            />
          </View>
          {/* <VenueCard /> */}
          <WelcomeImage />

          {/* <View style={{width: '95%', margin: 'auto'}}>
          <TextLink firstText="Get Inspired" navTo="Expore"  smallText={true} />
        </View> */}
          {/* <VenueCard /> */}
          <FitnessCategories FlatListData={categories} />
          <View style={{ width: "95%", margin: "auto", marginTop: "2%" }}>
            <TextLink
              firstText="Venues For You"
              navTo="Explore"
              smallText={true}
            />
          </View>
          {/* <VenueCard /> */}
          <HomeCarousel venues={venues} isProfile={false} />

          {/* <View style={{width: '95%', margin: 'auto', marginTop:20}}>
          <TextLink
            firstText="Workouts Near You"
            navTo="Expore"
            smallText={true}
            params={{to: 'Classes'}}
          />
        </View> */}
          {/* <View
          style={{
            width: '95%',
            margin: 'auto',
          }}>
          <FilterPill />
        </View> */}
          {/* <View style={{marginTop: 20}}> */}
          {/* <ClassesCard attached={true} /> */}
          {/* </View> */}
          <View style={{ width: "95%", margin: "auto", marginTop: "20%" }}>
            <TextLink
              firstText="Workouts Near You"
              navTo="Expore"
              smallText={true}
              params={{ to: "Classes" }}
            />
          </View>

          <View style={{ marginBottom: 20 }}>
            {schedules && schedules.length > 0 ? (
              schedules.map((d, index) => (
                <View style={{ marginBottom: 10 }} key={index}>
                  <ClassesCard
                    imageUrl={d?.imageUrl}
                    address={d?.address}
                    dateText={d?.dateText}
                    heading={d?.heading}
                    key={index}
                    number={d.number}
                    subText={d?.subText}
                  />
                </View>
              ))
            ) : (
              <Text
                style={{ textAlign: "center", color: "gray", marginTop: 20 }}
              >
                No schedule available
              </Text>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "93%",
    marginHorizontal: "auto",
    marginVertical: 10,
  },
  heading: {
    color: "#15161E",
    fontWeight: "500",
    fontSize: 20,
  },
});
