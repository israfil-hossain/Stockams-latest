import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import CustomInput from "../../global/common/CommonInput";
import CustomButton from "../../global/common/ui/Button";
import Colors from "../../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import { useToast } from "react-native-toast-notifications";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { adminAPI } from "../../../../api";
import { API } from "../../../../api/endpoints";

const bookingSchema = Yup.object().shape({
  formDate: Yup.string().required("FormDate is required"),
  // toDate: Yup.number().required("Rental Duration is required"),
});

const BookingBottomCard = ({ data,toggleSheet,congratulationSheet}) => {
  const toast = useToast();
  // console.log("data", data);
  const [options, setOptions] = useState([
    // {
    //   value: 7,
    //   label: "1 Week",
    // },
    // {
    //   value: 14,
    //   label: "2 Weeks",
    // },
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

  const { mutateAsync: bookingMutation, isLoading: bookingLoading,isError } =
    useMutation({
      mutationFn: (payload) => {
        return adminAPI.post(API.SpaceBooking, payload);
      },
    });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      setSubmitting(true);
      const toDateValue = dayjs(values?.fromDate, "DD/MM/YYYY", true)
        .add(values?.toDate || 30, "day");

      const payload = {
        spaceId: data?._id,
        fromDate: dayjs(values?.fromDate, "DD/MM/YYYY", true).toISOString(),
        toDate: toDateValue.toISOString(),
      };
      console.log("payload: ", payload)
      const response = await bookingMutation(payload);
      console.log("response : ", response)
      if (response?.data?.data) {
        toast.show("Booking Successfully ! 👋", { type: "success" });
        // navigation.navigate("");
        toggleSheet();
        congratulationSheet();
      }
      else{
        console.log(response?.error)
      }
      setSubmitting(false);
    } catch (err) {
      toast.show("Something went wrong 👋", {
        type: "danger",
      });
      console.log(err);
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
          toDate: null,
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
                icon=""
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
                width={"49%"}
              />
              <CustomInput
                label="Rental Duration"
                placeholder="Select Rental Period"
                onBlur={handleBlur("toDate")}
                error={errors.toDate}
                touched={touched.toDate}
                onChangeText={(value) => setFieldValue("toDate", value)}
                value={values.toDate}
                values={values}
                isEditable={!!values?.formDate}
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
                disabled={isSubmitting || !values.fromDate}
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
