/** @format */

import React from "react";
import {
  View,
  FlatList,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";
import { colors, fontFamily } from "../../constants";
import { widthPercentageToDP } from "react-native-responsive-screen";

const { width } = Dimensions.get("window");

const data = [
  {
    id: "1",
    title: "Pilates",
    image: require("../../assets/images/fitness.jpg"),
  },
  {
    id: "2",
    title: "Crossfit",
    image: require("../../assets/images/fitness.jpg"),
  },
  {
    id: "3",
    title: "Cardio",
    image: require("../../assets/images/fitness.jpg"),
  },
  { id: "4", title: "Yoga", image: require("../../assets/images/fitness.jpg") },
];

const FitnessCategories = ({ FlatListData }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Get Inspired</Text>
      <FlatList
        data={FlatListData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          console.log("item", item.image);
          return (
            <View style={styles.itemContainer}>
              <ImageBackground
                source={{ uri: item.image }}
                style={styles.image}
                imageStyle={{ borderRadius: 10 }}
              >
                <Text style={styles.text}>{item.name}</Text>
              </ImageBackground>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 10,
    // backgroundColor:'red'
  },
  header: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.darkWhite,
    marginBottom: 10,
    fontFamily: fontFamily.regular,
  },
  itemContainer: {
    marginRight: widthPercentageToDP(1.5),
    borderRadius: 12,
    // backgroundColor:'yellow',
    overflow: "hidden",
  },
  image: {
    width: 117,
    height: 107,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.white,
    fontFamily: fontFamily.semiBold,
    textAlign: "center",
    // backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 5,
    borderRadius: 5,
  },
});

export default FitnessCategories;
