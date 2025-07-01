/** @format */

import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import MapIcon from "../../assets/icons/MapIcon";
import { SearchBar } from "react-native-screens";
import SearchBarFilter from "../../components/Home/SearchBar";
import Venues from "../../components/Home/Venues";
import ClassesComponent from "../../components/Home/ClassesComponent";
import FilterIcon from "../../assets/icons/FilterIcon";
import Search from "../../assets/icons/SearchGray.svg";
import { ActivityIndicator } from "react-native";

import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { colors, fontFamily } from "../../constants";
import axiosInstance from "../../helper/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { clearFiltersOfclasses } from "../../Redux/reducer";
import { heightPercentageToDP } from "react-native-responsive-screen";

const Explore = () => {
  const [classVenues, setClassVenues] = useState([]);
  const filtersOfclasses = useSelector(
    (state) => state.reducer.filtersOfclasses
  );
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const handleNavigation = () => {
    navigation.navigate("Filter");
  };

  const fetchClassesVenues = async () => {
    try {
      setLoading(true); // Start loading
      let payload = {};
      if (filtersOfclasses && Object.keys(filtersOfclasses).length > 0) {
        payload = { ...filtersOfclasses };
      }
      if (search) {
        payload = { ...payload, search };
      }
      const response = await axiosInstance.post("/api/venueClasses", payload);
      setClassVenues(response?.data?.data?.records);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false); // End loading
    }
  };
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchClassesVenues();
  }, [isFocused, search]); // refetch when filters change

  const [selectedSpan, setSelectedSpan] = useState("Venues");
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  useEffect(() => {
    setSearch("");
    dispatch(clearFiltersOfclasses());
  }, [selectedSpan]);

  // useLayoutEffect(() => {
  //   if (route?.params) {
  //     setSelectedSpan(route?.params?.to);
  //   } else {
  //     setSelectedSpan('Venues');
  //   }
  // }, [JSON.stringify(route?.params)]);

  return (
    <ScrollView style={{ ...styles.container }}>
      {/* <SafeAreaView  /> */}
      {/* <StatusBar backgroundColor={'white'} /> */}

      <View
        style={{
          elevation: 5,
          shadowOffset: {
            width: 0,
            height:3
          },
          shadowOpacity:0.2,
          paddingBottom: heightPercentageToDP(3),
          backgroundColor: "white",
          paddingTop: heightPercentageToDP(6),
        }}
      >
        <View style={styles.header}>
          {/* <View></View> */}
          {/* <Text style={styles.exploreText}>Explore</Text> */}
          <View style={styles.span}>
            <Pressable onPress={() => setSelectedSpan("Venues")}>
              <Text
                style={
                  selectedSpan == "Venues"
                    ? [styles.selectedText, { marginRight: 12.5 }]
                    : styles.text
                }
              >
              Venues
              </Text>
            </Pressable>
            <Pressable onPress={() => setSelectedSpan("Classes")}>
              <Text
                style={
                  selectedSpan == "Classes"
                    ? [styles.selectedText, { marginLeft: 12.5 }]
                    : styles.text
                }
              >
              {" "}Classes
              </Text>
            </Pressable>
          </View>
          <Pressable>
            {/* <MapIcon /> */}
          <Image source={require('../../assets/icons/class_icon_new.png')} style={{width: 25, height: 25}} />
          </Pressable>
        </View>
        <View style={{ marginTop: "5%" }}>
          <SearchBarFilter
            value={search}
            leftIcon={<Search />}
            icon={<Image source={require('../../assets/icons/filter_icon_new.png')} style={{width: 20, height: 20}} />}
            onRightIconClick={handleNavigation}
            onChangeText={setSearch}
          />
        </View>
      </View>
      <View style={{ marginBottom: 25 }}>
        <View style={{  marginVertical: 1 }}></View>
        {/* ActivityIndicator below the tabs */}
        {loading && (
          <ActivityIndicator
            size={50}
            color={"black"}
            style={{
              marginVertical: 20,

              justifyContent: "center",
            }}
          />
        )}
        {!loading && selectedSpan == "Venues" && (
          <Venues classVenues={classVenues} />
        )}
        {!loading && selectedSpan == "Classes" && (
          <ClassesComponent classVenues={classVenues} />
        )}
      </View>
    </ScrollView>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: heightPercentageToDP(1.2),
    alignItems: "center",
    width: "90%",
    margin: "auto",
    marginTop: 15,
  },
  exploreText: {
    color: "#15161E",
    // fontWeight: "700",
    fontSize: 18,
  },
  span: {
    width: 198,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#15161E",
    height: 30,
    borderRadius: 26,
  },

  selected: {
    width: 99,
    textAlign: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 26,
    height: 24,
    margin: "auto",
  },
  text: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    width: 99,
    fontSize: 16,
    color: "#F5F5F5",
    fontWeight: "500",
  },

  selectedText: {
    color: "#15161E",
    alignSelf: "center",
    alignItems: "center",
    fontWeight: "500",
    fontSize: 16,
  },

  ml: {
    marginLeft: 3,
  },
  mr: {
    marginRight: 3,
  },
  span: {
    flexDirection: "row",
    alignItems: "center",
  },

  selectedText: {
    color: colors.black,
    fontWeight: "500",
    fontFamily: fontFamily.semiBold,
    fontSize: 24,
  },

  text: {
    color: colors.darkWhite,
    fontFamily: fontFamily.medium,
    fontSize: 24,
    fontWeight: "500",
  },
});
