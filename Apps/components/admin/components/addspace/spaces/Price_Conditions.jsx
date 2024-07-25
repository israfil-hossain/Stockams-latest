import { Text, View, ScrollView } from "react-native";
import React, { useState } from "react";

import Features from "./Features";
import { Formik } from "formik";
import { convertNumber } from "../../../../../utils/commonFunction";
import { conditionValidation } from "../../../../../validation/space/addSpaceValidation";
import CustomButton from "../../../../global/common/ui/Button";
import Colors from "../../../../../constants/Colors";
import CustomInput from "../../../../global/common/CommonInput";

const Price_Conditions = ({
  onSubmit,
  prevStep,
  data,
  setFormData,
  spacedata,
  isLoading,
}) => {
  const [isSubmit, setIsSubmit] = useState(false);

  const [options, setOptions] = useState([
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

  const handleSubmit = async (values) => {
    try {
      setIsSubmit(!isSubmit);

      const payload = {
        ...values,
        pricePerMonth: convertNumber(values?.pricePerMonth),
        minimumBookingDays: convertNumber(values?.minimumBookingDays),
      };
      await setFormData((prevFormData) => ({
        ...prevFormData,
        ...payload,
      }));
    } catch (error) {
      setIsSubmit(false);
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={{
        minimumBookingDays:
          data?.minimumBookingDays || spacedata?.data?.minimumBookingDays
            ? convertNumber(
                data?.minimumBookingDays || spacedata?.data?.minimumBookingDays
              )
            : "",
        pricePerMonth:
          convertNumber(spacedata?.data?.pricePerMonth) ||
          convertNumber(data?.pricePerMonth) ||
          "",
        spaceSchedules:
          spacedata?.data?.spaceSchedules || data?.spaceSchedules || [],
        storageConditions:
          spacedata?.data?.storageConditions || data?.storageConditions || [],
        spaceSecurities:
          spacedata?.data?.spaceSecurities || data?.spaceSecurities || [],
        unloadingMovings:
          spacedata?.data?.unloadingMovings || data?.unloadingMovings || [],
      }}
      onSubmit={handleSubmit}
      validationSchema={conditionValidation}
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
        <View className="mb-20 h-[85%]">
          {/* <Text>isSubmitting:{JSON.stringify(values)}</Text> */}
          <ScrollView className="px-2 h-full">
            <View className=" flex flex-col justify-center items-center">
              <CustomInput
                placeholder="Set Price here"
                label="Set your Price"
                error={errors.pricePerMonth}
                touched={touched.pricePerMonth}
                onChangeText={handleChange("pricePerMonth")}
                value={String(values?.pricePerMonth)}
                type="number"
                rightText="$ USD"
              />
              <CustomInput
                icon="form-dropdown"
                label="Minimum Rental Period"
                placeholder="Select Rental Period"
                onBlur={handleBlur("minimumBookingDays")}
                error={errors.minimumBookingDays}
                touched={touched.minimumBookingDays}
                onChangeText={(value) =>
                  setFieldValue("minimumBookingDays", value)
                }
                value={values.minimumBookingDays}
                type="dropdown"
                options={options}
              />

              <View className="w-[100%] pb-8 flex flex-col justify-center items-center mt-4 bg-white shadow-md shadow-gray-200">
                <Text className="text-[16px] font-bold sm:text-[14px] xs:text-[12px] py-2 ">
                  Minimum conditions required of tenats:{" "}
                </Text>
                <Text
                  className="text-sm text-start font-normal leading-relaxed text-gray-600 px-1"
                  style={{ textAlign: "left" }}
                >
                  Costocked goods are covered by the insurance policy taken out
                  by Costockage (see Insurance conditions).
                  {"\n"}
                  {"\n"}
                  The back card is valid and verified by the Leetchi system.
                  {"\n"}
                  {"\n"}
                  Objects prohibited for storage include, among other; stolen,
                  explosive, living, illegal objects.
                </Text>
              </View>

              <View className="border border-tertiary rounded-lg shadow-lg bg-white w-[100%] relative py-4 ">
                <Text
                  style={{ fontSize: 19, fontWeight: "bold" }}
                  className="pb-4 pl-2"
                >
                  Features
                </Text>
                <Features values={values} setFieldValue={setFieldValue} />
              </View>

              <View className="w-full flex flex-row justify-between mt-5 py-2 ">
                <CustomButton
                  bg={Colors.primary}
                  size={120}
                  text={"Prev"}
                  height={40}
                  onPress={() => {
                    prevStep();
                    setIsSubmit(false);
                  }}
                  showIcon={true}
                  icon={"arrow-back-circle-sharp"}
                />
                {!isSubmit && (
                  <CustomButton
                    bg={Colors.primary}
                    size={120}
                    text={"Next"}
                    height={40}
                    onPress={() => handleSubmit()}
                    showIcon={false}
                    disabled={isLoading}
                  />
                )}

                {isSubmit && (
                  <CustomButton
                    bg={Colors.primary}
                    size={120}
                    text={"Submit"}
                    height={40}
                    onPress={() => onSubmit()}
                    showIcon={false}
                    isLoading={isLoading}
                    disabled={isLoading}
                  />
                )}
              </View>
            </View>
          </ScrollView>
        </View>
      )}
    </Formik>
  );
};

export default Price_Conditions;
