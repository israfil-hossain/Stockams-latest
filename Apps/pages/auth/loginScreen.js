import React, { useEffect, useState } from "react";
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
import { useNavigation } from "@react-navigation/native";
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
import { signinValidationSchema } from "../../components/global/auth/validation/signinValidationSchema";
import { API } from "../../../api/endpoints";

import {
  setAccessToken,
  setRefreshToken,
  setUserRole,
} from "../../utils/localStorageUtils";
import usePost from "../../hooks/useCreate";
import { useAuthUserContext } from "../../context/AuthUserProvider";
import { adminQueryClient } from "../../../api";
import CommonProgress from "../../components/global/progress/CommonProgress";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { t } from "../../translation/i18n";

const LoginScreen = () => {
  const { userData, userRefetch, userLoading, userFound, userRole } =
    useAuthUserContext();
  const [showPassword, setShowPassword] = useState(false);
  const [tab, setTab] = useState("RENTER");
  const navigation = useNavigation();
  const toast = useToast();

  const {
    mutateAsync: signInMutation,
    isLoading: isSigninLoading,
    isError: signinError,
  } = usePost({
    isMultiPart: false,
    endpoint: API.Login,
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      setSubmitting(true);
      const payload = {
        ...values,
        role: tab,
      };
      const response = await signInMutation(payload);

      if (response?.data?.data) {
        const { accessToken, refreshToken, role } = response?.data?.data;
        await setAccessToken(accessToken);
        await setRefreshToken(refreshToken);

        // Ensure `role` is not undefined before storing it
        if (role) {
          await setUserRole(role);
        } else {
          // Handle the case where `role` is undefined, e.g., remove the item if needed
          await AsyncStorage.removeItem("userRole");
        }
        userRefetch();
        adminQueryClient.resetQueries();
      }
      setSubmitting(false);
    } catch (err) {
      toast.show("Something went wrong 👋", {
        type: "danger",
      });
      console.log("Error ===> ", err);
      setErrors(err);
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchNavigation = async () => {
      if (userFound && userData) {
        if (userRole) {
          await navigation.reset({
            index: 0,
            routes: [
              { name: userRole === "RENTER" ? "RentalTabs" : "OwnerTabs" },
            ],
          });
          toast.show("Signin Successfully 👋", { type: "success" });
        }
      }
    };
    fetchNavigation();
  }, [userData, userRole, userFound]);

  if (userLoading) {
    return <CommonProgress />;
  }


  return (
    <View style={styles.container}>
      <View style={styles.backgroundImageContainer}>
        <Image source={looper} style={styles.backgroundImage} />
      </View>
      <View className="flex justify-center items-center mt-16 w-full">
        <Image
          source={logo}
          className="w-60 h-20 object-contain"
          style={styles.logo}
        />
      </View>
      <ScrollView style={styles.scrollView}>
        <Formik
          initialValues={{ email: "", password: "", role: "RENTER" }}
          onSubmit={handleSubmit}
          validationSchema={signinValidationSchema}
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
              <Text style={styles.loginWithText}>{t('auth.login_with')}</Text>
              <View className="flex flex-row justify-between pt-4 pb-3">
                <CustomButton
                  bg={tab === "RENTER" ? Colors.akcent : Colors.gray2}
                  size={140}
                  text={t("auth.renter")}
                  height={45}
                  icon={renter}
                  showIcon={true}
                  onPress={() => setTab("RENTER")}
                  type="image"
                />
                <CustomButton
                  bg={tab === "OWNER" ? Colors.akcent : Colors.gray2}
                  size={150}
                  text={t('auth.owner')}
                  height={45}
                  icon={space_owner}
                  showIcon={true}
                  onPress={() => setTab("OWNER")}
                  type="image"
                />
              </View>

              <CustomInput
                icon="mail"
                placeholder={t("auth.enter_email")}
                autoCapitalize="none"
                autoCompleteType="email"
                keyboardType="email-address"
                keyboardAppearance="dark"
                returnKeyType="next"
                returnKeyLabel="next"
                label={t('auth.email')}
                onBlur={handleBlur("email")}
                error={errors.email}
                touched={touched.email}
                onChangeText={handleChange("email")}
                value={values.email}
                type="text"
              />

              <CustomInput
                icon="key"
                label={t("auth.password")}
                placeholder={t("auth.enter_pass")}
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

              <View style={styles.buttonContainer}>
                <CustomButton
                  bg={Colors.primary}
                  size={300}
                  text={t('auth.btn_login')}
                  height={45}
                  onPress={() => handleSubmit()}
                  disabled={isSubmitting}
                  isLoading={isSigninLoading}
                />
                <Text style={styles.forgotPasswordText}>{t('auth.forgot')}</Text>
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
                <View style={styles.createAccountContainer}>
                  <Text style={styles.noAccountText} className="pr-5">
                    {t('auth.dont_account')}
                  </Text>

                  <TouchableOpacity
                    onPress={() => navigation.navigate("Signup")}
                  >
                    <Text style={styles.createAccountText}>{t('auth.create_account')}</Text>
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
    marginTop: 5,
    alignItems: "center",
    resizeMode: "contain",
  },
  scrollView: {
    backgroundColor: "white",
    padding: 10,
    marginTop: 30,
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
    marginTop: 0,
  },
  loginWithText: {
    color: "#ABB0B6",
    marginVertical: 3,
  },
  buttonContainer: {
    alignSelf: "center",
    marginTop: 16,
  },
  forgotPasswordText: {
    color: "#ABB0B6",
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 10,
  },
  continueWithText: {
    color: "#ABB0B6",
    marginTop: 7,
  },
  socialIconsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 1,
  },
  createAccountContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 0,
    marginTop: 16

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

export default LoginScreen;
