import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "../../global/common/ui/Button";
import Colors from "../../../constants/Colors";
import { countryData } from "../../../utils/countries";
import { Formik } from "formik";
import CustomInput from "../../global/common/CommonInput";
import AutoComplete from "../../global/common/Autocomplete";

const PickupFormBottomCard = ({ toggleSheet }) => {
  const [filteredStates, setFilteredStates] = useState([]);

  const handleCountrySelect = (country, setFieldValue) => {
    setFieldValue("country", country.name);
    setFilteredStates(country.states || []); // Load states or empty if none
    setFieldValue("state", ""); // Reset state value when country changes
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    // Your form submission logic here
    console.log("Form submitted with values:", values);
  };

  return (
    <View className="w-full flex flex-col items-center justify-center px-4 pb-10 rounded-xl bg-white">
      <View className="flex flex-col items-center justify-center py-5">
        <Text className="font-[lato-bold] py-2 text-[24px]">
          Where do you want to pickup?
        </Text>
      </View>

      <Formik
        initialValues={{
          name: "",
          email: "",
          phone: "",
          country: "Germany",
          state: "Berlin",
          address: "",
          address2: "",
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
              <View className="flex flex-row justify-between">
                <CustomInput
                  icon="text"
                  placeholder="Name"
                  keyboardAppearance="dark"
                  returnKeyType="next"
                  returnKeyLabel="next"
                  label="Name"
                  onBlur={handleBlur("name")}
                  error={touched.name && errors.name}
                  touched={touched.name}
                  onChangeText={handleChange("name")}
                  value={values.name}
                  type="text"
                  width="48%"
                />
                <CustomInput
                  icon="mail"
                  placeholder="Enter your email"
                  autoCapitalize="none"
                  autoCompleteType="email"
                  keyboardType="email-address"
                  keyboardAppearance="dark"
                  returnKeyType="next"
                  returnKeyLabel="next"
                  label="Email"
                  onBlur={handleBlur("email")}
                  error={errors.email}
                  touched={touched.email}
                  onChangeText={handleChange("email")}
                  value={values.email}
                  type="text"
                  width="50%"
                />
              </View>

              <CustomInput
                icon="phone-portrait-outline"
                placeholder="Enter your Phone Number"
                autoCapitalize="none"
                keyboardAppearance="dark"
                keyboardType="numeric"
                returnKeyType="next"
                returnKeyLabel="next"
                label="Phone"
                onBlur={handleBlur("phoneNumber")}
                error={errors.phoneNumber}
                touched={touched.phoneNumber}
                onChangeText={handleChange("phoneNumber")}
                value={values.phoneNumber}
                type="text"
              />

              <View>
                <AutoComplete
                  data={countryData}
                  value={values.country}
                  placeholder="Select Country"
                  onChange={(text) => setFieldValue("country", text)}
                  onSelect={(country) =>
                    handleCountrySelect(country, setFieldValue)
                  }
                />
                <CustomInput
                  label="Select State"
                  placeholder="Select "
                  onBlur={handleBlur("state")}
                  error={errors.state}
                  touched={touched.state}
                  onChangeText={(value) => setFieldValue("state", value)}
                  value={values.state}
                  values={values}
                  isEditable={values?.country ? true : false}
                  type="dropdown"
                  options={filteredStates}
                  paddingRight= {0}
                  width={"100%"}
                />
              </View>
              <CustomInput
                icon="location"
                placeholder="Enter your Address"
                autoCapitalize="none"
                keyboardAppearance="dark"
                returnKeyType="next"
                returnKeyLabel="next"
                label="Address"
                onBlur={handleBlur("address")}
                error={errors.address}
                touched={touched.address}
                onChangeText={handleChange("address")}
                value={values.address}
                type="text"
              />
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

export default PickupFormBottomCard;
