import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { Formik } from "formik";
import { Alert } from "react-native";
import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";

//images
import {
  looper,
  logo,
  google,
  apple,
  renter,
  space_owner,
} from "../../../assets/images";
import CustomButton from "../../components/global/common/ui/Button";
import CustomInput from "../../components/global/common/CommonInput";

import { useToast } from "react-native-toast-notifications";
import { signupValidationSchema } from "../../components/global/auth/validation/signupValidationSchema";

import { API } from "../../../api/endpoints";
import { adminAPI } from "../../../api";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { t } from "../../translation/i18n";

const SignupScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [tab, setTab] = useState("RENTER");
  const navigation = useNavigation();

  const toast = useToast();


  const { mutateAsync: signUpMutation, isLoading: isSigninLoading } =
    useMutation({
      mutationFn: (payload) => {
        return adminAPI.post(API.SignUp, payload);
      },
    });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      setSubmitting(true);
      console.log({ values });
      const payload = {
        ...values,
        role: tab,
      };
      const response = await signUpMutation(payload);
      console.log("Sunmitted");
      console.log(response);
      if (response?.data?.data) {
        toast.show("Signup Successfully ! 👋", { type: "success" });
        // router.replace("/login");
        navigation.navigate("Login");
      }
      setSubmitting(false);
    } catch (err) {
      toast.show("Something went wrong 👋", {
        type: "danger",
      });
      console.log({ err });
      setSubmitting(false);
      setErrors(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundImageContainer}>
        <Image source={looper} style={styles.backgroundImage} />
      </View>
      <View className="w-full h-20 flex justify-center items-center">
        <Image source={logo} className="w-60 h-20" style={styles.logo} />
      </View>

      <ScrollView style={styles.scrollView}>
        <Formik
          initialValues={{
            email: "",
            password: "",
            fullName: "",
            phoneNumber: "",
            dateOfBirth: "",
            address: "",
            countryCode:"",
          }}
          onSubmit={handleSubmit}
          validationSchema={signupValidationSchema}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <View style={styles.formContainer}>
              <Text style={styles.loginWithText}>{t('signup.create_with')}</Text>
              <View className="flex flex-row justify-between pt-4 pb-3">
                <CustomButton
                  bg={tab === "RENTER" ? Colors.akcent : Colors.gray2}
                  size={140}
                  text={t("signup.renter")}
                  height={45}
                  icon={renter}
                  showIcon={true}
                  type={"image"}
                  onPress={() => setTab("RENTER")}
                />
                <CustomButton
                  bg={tab === "OWNER" ? Colors.akcent : Colors.gray2}
                  size={150}
                  text={t("signup.owner")}
                  height={45}
                  icon={space_owner}
                  showIcon={true}
                  type={"image"}
                  onPress={() => setTab("OWNER")}
                />
              </View>

              <CustomInput
                icon="person-circle-sharp"
                placeholder={t("signup.enter_name")}
                autoCapitalize="none"
                keyboardAppearance="dark"
                returnKeyType="next"
                returnKeyLabel="next"
                label={t("signup.fullName")}
                onBlur={handleBlur("fullName")}
                error={errors.fullName}
                touched={touched.fullName}
                onChangeText={handleChange("fullName")}
                value={values.fullName}
                type="text"
              />
              <CustomInput
                icon="phone-portrait-outline"
                placeholder={t("signup.enter_phoneNumber")}
                autoCapitalize="none"
                keyboardAppearance="dark"
                keyboardType="numeric"
                returnKeyType="next"
                returnKeyLabel="next"
                label={t('signup.phoneNumber')}
                onBlur={handleBlur("phoneNumber")}
                error={errors.phoneNumber}
                touched={touched.phoneNumber}
                onChangeText={handleChange("phoneNumber")}
                value={values.phoneNumber}
                type="text"
              />
              <CustomInput
                icon="calendar-outline"
                placeholder={t('signup.enter_dateofbirth')}
                autoCapitalize="none"
                keyboardAppearance="dark"
                returnKeyType="next"
                returnKeyLabel="next"
                label={t('signup.dateofbirth')}
                onBlur={handleBlur("dateOfBirth")}
                error={errors.dateOfBirth}
                touched={touched.dateOfBirth}
                onChangeText={handleChange("dateOfBirth")}
                value={values.dateOfBirth}
                type="date"
                isEditable={true}
              />

              <CustomInput
                icon="mail"
                placeholder={t('signup.enter_email')}
                autoCapitalize="none"
                autoCompleteType="email"
                keyboardType="email-address"
                keyboardAppearance="dark"
                returnKeyType="next"
                returnKeyLabel="next"
                label={t('signup.email')}
                onBlur={handleBlur("email")}
                error={errors.email}
                touched={touched.email}
                onChangeText={handleChange("email")}
                value={values.email}
                type="text"
              />

              <CustomInput
                icon="key"
                label={t('signup.password')}
                placeholder={t('signup.enter_pass')}
                secureTextEntry={showPassword ? false : true}
                autoCompleteType="password"
                autoCapitalize="none"
                keyboardAppearance="dark"
                returnKeyType="go"
                returnKeyLabel="go"
                onBlur={handleBlur("password")}
                error={errors.password}
                touched={touched.password}
                onChangeText={handleChange("password")}
                value={values.password}
                passwordIcon={true}
                setShowPassword={setShowPassword}
                type="text"
              />

              <CustomInput
                icon="location"
                placeholder={t('signup.enter_address')}
                autoCapitalize="none"
                keyboardAppearance="dark"
                returnKeyType="next"
                returnKeyLabel="next"
                label={t('signup.address')}
                onBlur={handleBlur("address")}
                error={errors.address}
                touched={touched.address}
                onChangeText={handleChange("address")}
                value={values.address}
                type="text"
              />
              <GooglePlacesAutocomplete
                placeholder={t('signup.enter_address')}
                onPress={(data, details = null) => {
                  handleChange("address")(data.description+details?.geometry?.location); // set the address field
                }}
                query={{
                  key: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY, 
                  language: 'en',
                }}
                styles={{
                  container: {
                    flex: 0,
                    marginBottom: 20,
                  },
                  textInputContainer: {
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 5,
                    backgroundColor: '#fff',
                  },
                  textInput: {
                    height: 40,
                    fontSize: 16,
                    paddingHorizontal: 10,
                  },
                }}
                onFail={error => console.error(error)} // Handle errors
              />

              <View style={styles.buttonContainer}>
                <CustomButton
                  bg={Colors.primary}
                  size={300}
                  text={t('signup.create_account')}
                  height={45}
                  onPress={() => handleSubmit()}
                  disabled={isSubmitting}
                />
                {/* <Text style={styles.continueWithText}>OR CONTINUE WITH</Text>
                <View style={styles.socialIconsContainer}>
                  <TouchableOpacity
                    onPress={() => Alert.alert("Press google Login")}
                  >
                    <Image source={google} alt="google" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => Alert.alert("Press Apple Login ")}
                  >
                    <Image source={apple} alt="apple" />
                  </TouchableOpacity>
                </View> */}
                <View style={styles.createAccountContainer} className="mb-10 ">
                  <Text style={styles.noAccountText} className="pr-3 ">
                    {t('signup.have_account')}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Text style={styles.createAccountText}>{t("signup.login_here")}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBFAE6",
    position: "relative",
  },
  backgroundImageContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  logo: {
    marginTop: 70,
    alignItems: "center",
    resizeMode: "contain",
  },
  scrollView: {
    backgroundColor: "white",
    padding: 10,
    marginTop: 60,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  formContainer: {
    flex: 1,
    padding: 16,
    marginTop: 20,
  },
  loginWithText: {
    color: "#ABB0B6",
    marginVertical: 3,
  },
  buttonContainer: {
    alignSelf: "center",
    marginTop: 4,
  },
  forgotPasswordText: {
    color: "#ABB0B6",
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 6,
  },
  continueWithText: {
    color: "#ABB0B6",
    marginTop: 7,
  },
  socialIconsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 2,
  },
  createAccountContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  noAccountText: {
    color: "#ABB0B6",
    fontSize: 13,
  },
  createAccountText: {
    color: "#2D2D2A",
    fontWeight: "bold",
    fontSize: 14,
    marginLeft: 2,
  },
});

export default SignupScreen;
