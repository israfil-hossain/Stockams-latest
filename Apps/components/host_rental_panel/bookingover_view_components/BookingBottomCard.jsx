import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import CustomInput from "../../global/common/CommonInput";
import CustomButton from "../../global/common/ui/Button";
import Colors from "../../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import { useToast } from "react-native-toast-notifications";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { adminAPI } from "../../../../api";
import { API } from "../../../../api/endpoints";
import Checkout from "./Checkout"; // Importing Checkout component
import { useSharedValue } from "react-native-reanimated";
import CommonBottomSheet from "../../modals/CommonBottomSheet";
dayjs.extend(customParseFormat);

const bookingSchema = Yup.object().shape({
  formDate: Yup.string().required("FormDate is required"),
});

const BookingBottomCard = ({
  data,
  toggleSheet,
  congratulationSheet,
  toggleCheckout,
  issCheckoutOpen,
}) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentIntentData, setPaymentIntentData] = useState(null);
  console.log("Paym: ", paymentIntentData)

  const [options] = useState([
    { value: 30, label: "1 Month" },
    { value: 60, label: "2 Months" },
    { value: 90, label: "3 Months" },
    { value: 120, label: "4 Months" },
    { value: 150, label: "5 Months" },
    { value: 180, label: "6 Months" },
    { value: 365, label: "1 Year" },
  ]);

  const { mutateAsync: bookingMutation, isLoading: bookingLoading } =
    useMutation({
      mutationFn: (payload) => adminAPI.post(API.SpaceBooking, payload),
    });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      setSubmitting(true);
      setIsLoading(true);
      const toDateValue = dayjs(values?.fromDate, "DD/MM/YYYY", true).add(
        values?.toDate || 30,
        "day"
      );

      const payload = {
        spaceId: data?._id,
        fromDate: dayjs(values?.fromDate, "DD/MM/YYYY", true).toISOString(),
        toDate: toDateValue.toISOString(),
      };

      const response = await bookingMutation(payload);

      if (response?.data?.data) {
        const bookingId = response?.data?.data?._id;
        const paymentResponse = await adminAPI.get(API.PaymentAPI + bookingId);

        console.log("Payment Response : ", paymentResponse.data);
        if (paymentResponse?.data) {
          setPaymentIntentData(paymentResponse?.data?.data);
        }
      }
      setSubmitting(false);
      setIsLoading(false);
    } catch (err) {
      toast.show("Something went wrong 👋", { type: "danger" });
      setSubmitting(false);
      setIsLoading(false);
      setErrors(err);
      console.error(err);
    }
  };

  return (
    <View className="w-full flex flex-col items-center justify-center px-4 mb-20 mt-5">
      {paymentIntentData ? (
        <>
          <Text className="font-[outfit] text-lg py-5">Payment Page </Text>
          <View className="py-3 px-3 mb-5 w-full flex-row justify-between border border-primary rounded-xl items-center">
            <Text className="font-[outfit] font-medium text-lg">Total</Text>
            <Text className="font-[outfit] font-medium text-lg">$ {paymentIntentData?.bookingPrice}</Text>
          </View>

          <Checkout
            paymentIntentData={paymentIntentData}
            toggleSheet={toggleSheet}
            congratulationSheet={congratulationSheet}
          />
        </>
      ) : (
        <>
          <View className="w-full items-center mt-5 mb-5">
            <Text className="text-[20px] font-bold pb-2">
              From ${data?.pricePerMonth}/month Including Tax
            </Text>
            <Text className="text-[14px] self-center">
              Monthly rate including Insurance.
            </Text>
          </View>
          <View className="py-4 mb-5 w-full flex-row bg-[#B3FAFF] rounded-xl items-center justify-center mt-4">
            <Text className="text-[14px] font-bold self-center">
              {data?.name} {data?.area} m
            </Text>
            <Text style={{ fontSize: 11, lineHeight: 11, marginLeft: 2 }}>
              2
            </Text>
          </View>
          <Formik
            initialValues={{ fromDate: "", toDate: null }}
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
              <View className="w-full">
                <View className="flex-row space-x-3 w-[100%]">
                  <View className="w-[48%]">
                    <CustomInput
                      placeholder="Start Date"
                      label="Start Date"
                      onBlur={handleBlur("fromDate")}
                      error={errors.fromDate}
                      touched={touched.fromDate}
                      onChangeText={handleChange("fromDate")}
                      value={values.fromDate}
                      type="date"
                      isEditable={true}
                    />
                  </View>
                  <View className="w-[50%]">
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
                    />
                  </View>
                </View>

                <View className="mt-5 self-center">
                  <CustomButton
                    text="Book Now"
                    size={320}
                    height={45}
                    bg={Colors.primary}
                    onPress={handleSubmit}
                    isLoading={isLoading}
                    disabled={isSubmitting || !values.fromDate}
                  />
                </View>
              </View>
            )}
          </Formik>
        </>
      )}

      {/* Render Checkout component with paymentIntentData */}

      <TouchableOpacity className="h-[45px] w-[320px] mt-5 mb-5 border-[1px] border-primary rounded-xl flex flex-row justify-center items-center space-x-2">
        <Text>Call Now</Text>
        <Ionicons name="call-outline" size={17} color="black" />
        <Text>(989) 6654 6665</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookingBottomCard;
