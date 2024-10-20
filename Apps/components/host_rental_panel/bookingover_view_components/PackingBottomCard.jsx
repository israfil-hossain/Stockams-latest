import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import CustomButton from "../../global/common/ui/Button";
import { useNavigation } from "@react-navigation/core";
import Colors from "../../../constants/Colors";
import Checkbox from "expo-checkbox";
import { Formik } from "formik";

const PackingBottomCard = ({ toggleSheet,noSelect }) => {
  const navigation = useNavigation();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    // Your form submission logic here
    console.log("Form submitted with values:", values);
    if(values?.selectOption === "yes"){
      toggleSheet();
    }
    else{
      noSelect();
    }
  };

  return (
    <View className="w-full flex flex-col items-center justify-center px-4 py-10 rounded-xl -mt-2 bg-white">
      <View className="py-5 flex flex-col items-center justify-center">
        <Text className="font-[lato-bold] py-2 text-[24px]">
          Do you help on packing stuff?
        </Text>
      </View>

      <Formik
        initialValues={{
          selectOption: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={""} // Add validation schema if needed
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <View className="w-full">
            <Text>isSubmitting:{JSON.stringify(values)}</Text>
            <View className="flex flex-col space-y-4 w-full">
              {/* Option 1: No */}
              <TouchableOpacity
                className={`border rounded-lg p-1 py-2 border-gray-200 items-center flex flex-row ${
                  values?.selectOption === "no" ? "border-primary bg-yellow-50" : ""
                }`}
                onPress={() => setFieldValue("selectOption", "no")}
              >
                <Checkbox
                  value={values?.selectOption === "no"}
                  onValueChange={() => setFieldValue("selectOption", "no")}
                  className="rounded-md w-5 h-5 mr-1 ml-1"
                  color={
                    values?.selectOption === "no" ? Colors.green : Colors.grey
                  }
                />
                <View className="flex flex-col space-y-1">
                  <Text className="text-[18px] font-[lato-medium]  text-gray-600 px-2">
                    No. I will do it myself
                  </Text>
                  <Text className="text-md font-[lato] text-gray-400 px-2">
                    I will pack my own boxes, disassemble my furniture etc.
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Option 2: Yes */}
              <TouchableOpacity
                className={`border rounded-lg p-1 py-2 border-gray-200 items-center flex flex-row ${
                  values?.selectOption === "yes" ? "border-primary bg-yellow-50" : ""
                }`}
                onPress={() => setFieldValue("selectOption", "yes")}
              >
                <Checkbox
                  value={values?.selectOption === "yes"}
                  onValueChange={() => setFieldValue("selectOption", "yes")}
                  className="rounded-md w-5 h-5 mr-1 ml-1"
                  color={
                    values?.selectOption === "yes"
                      ? Colors.green
                      : Colors.grey
                  }
                />
                <View className="flex flex-col space-y-1">
                  <Text className="text-[18px] font-[lato-medium] text-gray-600 px-2">
                    Yes, Help me pack
                  </Text>
                  <Text className="text-md font-[lato] text-gray-400 px-2">
                  our expert packers will pack everything up for you, disassemble your furthers etc.
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View className="mt-5 mb-5 self-center">
              <CustomButton
                text="Continue"
                size={320}
                height={45}
                padding={0}
                bg={Colors.primary}
                onPress={() => handleSubmit()}
                disabled={!values.selectOption}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default PackingBottomCard;
