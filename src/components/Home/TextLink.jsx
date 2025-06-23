/** @format */

import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { colors, fontFamily } from "../../constants";
import { DropDown } from "../../constants/svgs";
import { widthPercentageToDP } from "react-native-responsive-screen";

const TextLink = ({
  firstText = "Featured Venues",
  secondText = "See All",
  navTo = "/",
  smallText = false,
  params = {},
  size = 12,
  iconMTop = 5,

  ...props
}) => {
  console.log("parms", { ...params });
  const navigation = useNavigation();
  return (
    <View style={styles.secondaryHeader}>
      <Text
        style={{
          ...styles.featured,
          fontSize: smallText ? 16 : 26,
          color: !smallText ? colors.black : colors.paleWhite,
          fontFamily: !smallText ? fontFamily.semiBold : fontFamily.regular,
        }}
      >
        {firstText}
      </Text>
      <Pressable
        style={{
          flexDirection: secondText !== "See All" ? "row" : "column",
        }}
        onPress={() =>
          props?.handleClick
            ? props?.handleClick()
            : Object.keys(params).length == 0
            ? navigation.navigate(navTo)
            : navigation.navigate(navTo, { ...params })
        }
      >
        <Text
          style={[
            styles.viewAll,
            {
              color: secondText !== "See All" ? colors.black : colors.darkWhite,
            },
          ]}
        >
          {secondText}
        </Text>
        {secondText !== "See All" && (
          <DropDown
            style={{
              marginTop: iconMTop,
              marginLeft: widthPercentageToDP(2),
              alignItems: "center",
              alignSelf: "center",
              justifyContent: "center",
            }}
            width={size}
            height={size}
          />
        )}
      </Pressable>
    </View>
  );
};

export default TextLink;

const styles = StyleSheet.create({
  secondaryHeader: {
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
    marginHorizontal: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  featured: {
    color: colors.darkWhite,
    fontWeight: "500",
    fontFamily: fontFamily.regular,
    fontSize: 16,
  },
  viewAll: {
    color: "#818C81",
    fontSize: 14,
    fontWeight: "400",
    fontFamily: fontFamily.regular,

    textDecorationLine: "underline",
  },
});
