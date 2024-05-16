import { View, Text, Alert, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";


import { Formik } from "formik";
import { useToast } from "react-native-toast-notifications";

import { useMutation } from "@tanstack/react-query";

import { useRouter } from "expo-router";
import BackHeader from "../../components/global/header/BackHeader";
import { adminAPI } from "../../../api";
import { API } from "../../../api/endpoints";
import Colors from "../../constants/Colors";
import CustomInput from "../../components/global/common/CommonInput";
import { changePasswordValidationSchema } from "../../validation/profile/changePasswordValidation";
import CustomButton from "../../components/global/common/ui/Button";
import usePatchUpdate from "../../hooks/usePatchUpdate";
import usePost from "../../hooks/useCreate";

const ChangePasswordScreen = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const toast = useToast();
  const router = useRouter();

  // const { mutateAsync: changePassMutation, isLoading: isChangePassLoading } =
  //   useMutation((payload) => adminAPI.post(API.ChangePassword, payload));

    const {
      mutateAsync: changePassMutation,
      isLoading: isChangePassLoading,
      isError: profileinfoError,
    } = usePost({
      isMultiPart: false,
      endpoint: API.ChangePassword,
    });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      setSubmitting(true);
      const payload ={
        oldPassword: values?.oldPassword,
        newPassword: values?.newPassword
      }
      console.log(payload)
      const response = await changePassMutation(payload);
      console.log(response)
      if (response) {
        toast.show("ChangePassword Successfully ! 👋", { type: "success" });
        // router.push("/(main)/(home)/(rental)/(tabs)/rentalprofile");
      }
      setSubmitting(false);
    } catch (err) {
      toast.show("Something went wrong 👋", {
        type: "danger",
      });
      setSubmitting(false);
      setErrors(err);
      console.log(err)
    }
  };

  return (
    <View>
      <BackHeader Headertext="Back to Profile" />
      <ScrollView className="flex-col h-[550px] m-3 shadow-lg shadow-gray-400 bg-white rounded-xl ">
        <View className="p-3 mt-1 ml-1 mb-2">
          <Text className=" text-[18px] font-medium">Change Password</Text>
        </View>
        <Formik
          initialValues={{
            oldPassword: "",
            newPassword: "",
            retypePassword: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={changePasswordValidationSchema}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
            resetForm
          }) => (
            <View style={styles.formContainer}>
              <CustomInput
                icon="key"
                label="Current Password"
                placeholder="Enter your password"
                secureTextEntry={showOldPassword ? false : true}
                autoCompleteType="oldPassword"
                autoCapitalize="none"
                keyboardAppearance="dark"
                returnKeyType="go"
                returnKeyLabel="go"
                onBlur={handleBlur("oldPassword")}
                error={errors.oldPassword}
                touched={touched.oldPassword}
                onChangeText={handleChange("oldPassword")}
                value={values.oldPassword}
                passwordIcon={true}
                setShowPassword={setShowOldPassword}
                type="text"
              />
              <CustomInput
                icon="key"
                label="New Password"
                placeholder="Enter your password"
                secureTextEntry={showNewPassword ? false : true}
                autoCompleteType="password"
                autoCapitalize="none"
                keyboardAppearance="dark"
                returnKeyType="go"
                returnKeyLabel="go"
                onBlur={handleBlur("newPassword")}
                error={errors.newPassword}
                touched={touched.newPassword}
                onChangeText={handleChange("newPassword")}
                value={values.newPassword}
                passwordIcon={true}
                setShowPassword={setShowNewPassword}
                type="text"
              />
              <CustomInput
                icon="key"
                label="Retype Password"
                placeholder="Enter your password"
                secureTextEntry={showNewPassword ? false : true}
                autoCompleteType="retypePassword"
                autoCapitalize="none"
                keyboardAppearance="dark"
                returnKeyType="go"
                returnKeyLabel="go"
                onBlur={handleBlur("retypePassword")}
                error={errors.retypePassword}
                touched={touched.retypePassword}
                onChangeText={handleChange("retypePassword")}
                value={values.retypePassword}
                passwordIcon={true}
                setShowPassword={setShowNewPassword}
                type="text"
              />
              <View className="flex flex-row justify-between py-2  my-4 ">
                <CustomButton
                  text="Reset"
                  size={120}
                  bg={Colors.white}
                  onPress={() => Alert.alert("Reset")}
                />
                <CustomButton
                  bg={Colors.primary}
                  size={120}
                  text="Save Changes"
                  disabled={isSubmitting}
                  onPress={() => handleSubmit()}
                  isLoading={isChangePassLoading}
                />
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default ChangePasswordScreen;

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
    marginTop: 5,
    alignItems: "center",
    resizeMode: "contain",
  },
  scrollView: {
    backgroundColor: "white",
    padding: 10,
    marginTop: 100,
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
  },
  loginWithText: {
    color: "#ABB0B6",
    marginVertical: 3,
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
    marginTop: 2,
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
