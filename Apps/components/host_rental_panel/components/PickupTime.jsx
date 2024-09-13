import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "../../global/common/ui/Button";
import Colors from "../../../constants/Colors";
import { countryData } from "../../../utils/countries";
import { Formik } from "formik";
import CustomInput from "../../global/common/CommonInput";
import AutoComplete from "../../global/common/Autocomplete";

const PickupCalender = ({ toggleSheet }) => {
  const [filteredStates, setFilteredStates] = useState([]);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    // Your form submission logic here
    console.log("Form submitted with values:", values);
  };

  return (
    <View className="w-full flex flex-col items-center justify-center px-4 pb-10 rounded-xl bg-white">
      <View className="flex flex-col items-center justify-center py-5">
        <Text className="font-[lato-bold] py-2 text-[24px]">
          When do you want to pickup ?
        </Text>
      </View>

      <Formik
        initialValues={{
         date: "", 
         time: ""
        }}
        onSubmit={handleSubmit}
        validationSchema={""} // Add validation schema if needed
      >
        {({
          handleSubmit,
          values,
          setFieldValue,
          handleBlur,
          touched,
          handleChange,
          errors,
        }) => (
          <View className="w-full">
            {/* <Text>isSubmitting:{JSON.stringify(values)}</Text> */}

            <View className="flex flex-col space-y-4 w-full">
              
            </View>

            <View className="mt-5 mb-5 self-center">
              <CustomButton
                text="Next"
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

export default PickupCalender;
