/** @format */

import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderIconText from "../../components/HeaderIconText";
import Input from "../../components/input";
import Button from "../../components/Button";
import CheckBox from "@react-native-community/checkbox";
import OrLine from "../../components/OrLine";
import SocialAuthButtons from "../../components/SocialAuthButtons";
import AuthNavigationText from "../../components/AuthNavigationText";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import EyeSvg from "../../assets/icons/Password_Icon.svg";
import { colors, fontFamily } from "../../constants";
import { useDispatch } from "react-redux";
import EyeOpenSvg from "../../assets/icons/EyeOpen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setToken, setUser } from "../../Redux/reducer";
import axiosInstance from "../../helper/axiosInstance";
import { isEmailValid } from "../../helper/utils";
import { toast } from "../../helper/toast";
import { heightPercentageToDP } from "react-native-responsive-screen";

const Login = ({ navigation }) => {
  // const navigation = useNavigation();
  const onChange = () => {};
  const [isChecked, setIsChecked] = useState(false);
  const toggleCheckbox = () => setIsChecked(!isChecked);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [hide, setVisible] = useState(true);
  const [error, setError] = useState({});
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleValidation = () => {
    let errors = {};
    let isError = false;

    if (!form.email || form.email.length === 0) {
      errors.email = "The email field is required.";
      isError = true;
    } else if (!isEmailValid(form.email)) {
      errors.email = "The email is not valid.";
      isError = true;
    }

    if (!form.password || form.password.length === 0) {
      errors.password = "The password field is required.";
      isError = true;
    }

    setError(errors);
    return isError;
  };
  const isFocused = useIsFocused();
  useEffect(() => {
    setError("");
    setForm({
      email: "",
      password: "",
    });
  }, [isFocused]);

  const handleSignIn = async () => {
    setError({});
    if (handleValidation()) return;

    try {
      setLoading(true);

      const formdata = new FormData();
      formdata.append("email", form.email);
      formdata.append("password", form.password);

      const res = await axiosInstance.post(`/api/login`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Login res:", res?.data);

      const token = res?.data?.data?.ACCESS_TOKEN;
      if (!token) {
        throw new Error(
          res?.data?.meta?.message || "Login failed, please try again."
        );
      }
      await AsyncStorage.setItem("Token", token);
      dispatch(setUser(res?.data?.data));
      dispatch(setToken(token));

      navigation.replace("Plans");
      setForm({ email: "", password: "" });
    } catch (err) {
      console.log("Login Error:", err);
      toast(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (index, value) => {
    setForm({
      ...form,
      [index]: value,
    });
  };
  return (
    <ScrollView style={styles.container}>
      {/* <StatusBar animated={true} /> */}
      <StatusBar animated={true} backgroundColor="transparent" translucent />
      {/* <HeaderIconText text="Welcome" headingMTop={20} size={120} /> */}
      <Text style={styles.headingText}>Welcome</Text>
      <Text style={styles.bodyText}>Log in to your account</Text>
      <View style={styles.contentContainer}>
        <View style={styles.fieldsContainer}>
          <Input
            // onChange={onChange}
            placeholder="Email"
            rightSVGIcon={true}
            type={"Email"}
            onChangeText={(text) => handleInput("email", text)}
            error={error.email}
            value={form.email}
          />
          <Input
            // onChange={onChange}
            placeholder="Password"
            type={"password"}
            showRighIcon
            rightSVGIcon={hide ? EyeSvg : EyeOpenSvg}
            rightIconPress={() => setVisible(!hide)}
            onChangeText={(text) => handleInput("password", text)}
            secureTextEntry={hide}
            value={form.password}
            error={error.password}
          />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 45,
          }}
        >
          <View style={styles.optContainer}>
            {/* <CheckBox
              value={isChecked}
              tintColor="#DBDCDB"
              tintColors={{false: '#DBDCDB', true: '#15161E'}}
              onValueChange={toggleCheckbox}
            />
            <Text style={styles.remember}>Remember me</Text> */}
          </View>
          <Pressable onPress={() => navigation.navigate("ForgotPassword")}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </Pressable>
        </View>
        <Button
          handleClick={() => handleSignIn()}
          text="Log In"
          textBold={false}
          loading={loading}
          // disabled={form?.email?.length === 0 || form?.password?.length === 0}
        />
        <OrLine />
      </View>
      <SocialAuthButtons />
      <AuthNavigationText />
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    width: "100%",
    // margin: 'auto',
    paddingVertical: heightPercentageToDP(6),
    marginHorizontal: "auto",
  },
  fieldsContainer: {
    marginTop: 35,
    // width: '95%',
    // margin: 'auto',
  },
  remember: {
    color: "#46515A",
    fontSize: 14,
    fontWeight: "400",
  },
  contentContainer: { width: "90%", margin: "auto" },

  optContainer: { display: "flex", flexDirection: "row", alignItems: "center" },
  headingText: {
    color: colors.black,
    fontSize: 26,
    textAlign: "left",
    alignSelf: "flex-start",
    fontWeight: "400",
    fontFamily: fontFamily.regular,
    marginTop: 60,
    paddingHorizontal: 20,
  },
  bodyText: {
    color: colors.darkWhite,
    textAlign: "left",
    alignSelf: "flex-start",
    fontFamily: fontFamily.regular,
    fontSize: 18,
    fontWeight: "400",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  forgotText: {
    color: colors.darkGray,
    textDecorationLine: "underline",
    fontFamily: fontFamily.regular,
    // fontWeight: '500',
    fontSize: 13,
  },
});
