import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import CustomInput from "../../global/common/CommonInput";
import CustomDropDown from "../../global/common/AutoDropDown";
import CustomButton from "../../global/common/ui/Button";
import Colors from "../../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import { useToast } from "react-native-toast-notifications";

const BookingBottomCard = ({ data }) => {
  const toast = useToast();
  const options = useState([
    {
      value: 7,
      label: "1 Week",
    },
    {
      value: 14,
      label: "2 Weeks",
    },
    {
      value: 30,
      label: "1 Month",
    },
    {
      value: 60,
      label: "2 Months",
    },
    {
      value: 90,
      label: "3 Months",
    },
    {
      value: 120,
      label: "4 Months",
    },
    {
      value: 150,
      label: "5 Months",
    },
    {
      value: 180,
      label: "6 Months",
    },
    {
      value: 365,
      label: "1 Year",
    },
  ]);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      setSubmitting(true);
      console.log({ values });
      const payload = {
        spaceId: data?._id,
        ...values,
      };
      // const response = await signUpMutation(payload);
      // console.log("Sunmitted");
      // console.log(response);
      // if (response?.data?.data) {
      //   toast.show("Signup Successfully ! 👋", { type: "success" });
      //   // router.replace("/login");
      //   navigation.navigate("Login");
      // }
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
    <View className="w-full  flex flex-col items-center justify-center px-4 mb-20 mt-5">
      <View className="w-full items-center mt-5 mb-5">
        <Text className="text-[20px] font-bold font-[outfit-medium]">
          From ${data?.pricePerMonth}/month Including Tax
        </Text>
        <Text className="text-[14px] self-center font-outfit">
          Monthly rate including Insurance.
        </Text>
      </View>
      <View className="py-4 mb-5 w-full flex-row bg-[#B3FAFF] rounded-xl items-center justify-center mt-4">
        <Text className="text-[14px]  font-bold self-center">
          {data?.name} {data?.area} m
        </Text>
        <Text style={{ fontSize: 11, lineHeight: 11, marginLeft: 2 }}>2</Text>
      </View>

      <Formik
        initialValues={{
          fromDate: "",
          toDate: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={""}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isSubmitting,
          setFieldValue,
        }) => (
          <View className="w-full ">
            <View className="flex-row space-x-5 w-full">
              <CustomInput
                icon="calendar-outline"
                placeholder="Start Date"
                autoCapitalize="none"
                keyboardAppearance="dark"
                returnKeyType="next"
                returnKeyLabel="next"
                label="Start Date"
                onBlur={handleBlur("fromDate")}
                error={errors.fromDate}
                touched={touched.fromDate}
                onChangeText={handleChange("fromDate")}
                value={values.fromDate}
                type="date"
                isEditable={true}
                className="w-full "
                width={"50%"}
              />
              <CustomInput
                label="Rental Duration"
                placeholder="Select Rental Period"
                onBlur={handleBlur("toDate")}
                error={errors.toDate}
                touched={touched.toDate}
                onChangeText={(value) => setFieldValue("toDate", value)}
                value={values.toDate}
                type="dropdown"
                options={options}
                width={"50%"}
              />
            </View>

            <View className="mt-5 self-center">
              <CustomButton
                text="Book Now"
                size={320}
                height={45}
                padding={0}
                bg={Colors.primary}
                onPress={() => handleSubmit()}
                disabled={isSubmitting}
              />
            </View>
          </View>
        )}
      </Formik>
      <TouchableOpacity className="h-[45px] w-[320px] mt-5 mb-5 border-[1px] border-primary rounded-xl flex flex-row justify-center items-center space-x-2">
        <Text>Call Now</Text>
        <Ionicons name="call-outline" size={17} color="black" />
        <Text>(989) 6654 6665</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookingBottomCard;
