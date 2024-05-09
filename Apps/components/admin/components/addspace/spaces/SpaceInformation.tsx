import { Text, View, ScrollView, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import CustomInput from "@/components/global/common/CommonInput";

import { API } from "@/api/endpoints";
import { useGet } from "@/hooks";
import SpaceInfoSkeleton from "@/components/global/progress/skeleton/SpaceInfoeSkeleton";
import { Formik } from "formik";
import convertNumber from "@/utils/commonFunction";
import CustomButton from "@/components/global/common/ui/Button";
import Colors from "@/constants/Colors";
import { addSpaceValidation } from "@/validation/space/addSpaceValidation";
import Location from "@/components/global/common/Location";

interface CustomInputProps {
  onSubmit?: any;
  data?: any;
  setFormData?: any;
}

const SpaceInformation: React.FC<CustomInputProps> = ({
  onSubmit,
  data,
  setFormData,
}) => {
  const [locationData, setLocationData] = useState([]); // State to store location results
  const spaceTypeEndpoint = `${API.GetAllDropdownSpaceType}`;
  const spaceAccessEndpoint = `${API.GetAllDropdownAccess}`;

  const { data: { data: spaceType } = {}, isLoading: spaceTypeLoading = true } =
    useGet({ endpoint: spaceTypeEndpoint });
  const {
    data: { data: spaceAccessData } = {},
    isLoading: spaceAccessLoading = true,
  } = useGet({ endpoint: spaceAccessEndpoint });

  if (spaceTypeLoading || spaceAccessLoading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#3C09BC" />
        <SpaceInfoSkeleton />
      </View>
    );
  }

  const handleSubmit = async (values: any) => {
    const payload = {
      ...values,
      area: convertNumber(values?.area),
      height: convertNumber(values?.height),
    };

    await setFormData((prevFormData: any) => ({
      ...prevFormData,
      ...payload,
    }));
    console.log("object :>> ", data);
    onSubmit();
  };

  return (
    <Formik
      initialValues={{
        name: data?.name || "",
        type: data?.type || "",
        area: data?.area || "",
        height: data?.height || "",
        showpricePerMonth: data?.pricePerMonth || "",
        accessMethod: data?.accessMethod || "",
        location: data?.location || "",
        description: data?.description || "",
      }}
      onSubmit={handleSubmit}
      validationSchema={addSpaceValidation}
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
        <ScrollView className="px-4 h-[90%] mb-20">
          <View className="">
            {/* <Text>{JSON.stringify(values)}</Text> */}

            <CustomInput
              icon="text"
              placeholder="Type here"
              keyboardAppearance="dark"
              returnKeyType="next"
              returnKeyLabel="next"
              label="Space Name"
              onBlur={handleBlur("name")}
              error={touched.name && errors.name}
              touched={touched.name}
              onChangeText={handleChange("name")}
              value={values.name}
              type="text"
              rightText="m2"
            />

            <CustomInput
              icon="form-dropdown"
              label="Select Space Type"
              placeholder="Select Space "
              error={errors.type}
              touched={touched.type}
              onChangeText={handleChange("type")}
              setFieldValue={setFieldValue}
              value={values?.type}
              values={values}
              type="dropdown"
              options={spaceType?.data || []}
              isDropdownChangeAnotherField={true}
            />
            <View
              className="border border-tertiary rounded-lg shadow-lg bg-white "
              style={{ padding: 5, margin: 4 }}
            >
              <Text className="text-md text-gray-400 font-medium text-center pt-3">
                INDICATE THE SIZE OF YOUR SPACE
              </Text>
              <CustomInput
                placeholder="Input Area"
                label="Area"
                error={errors.area}
                touched={touched.area}
                onChangeText={handleChange("area")}
                value={values.area}
                type="number"
                rightText="m2"
              />
              <CustomInput
                placeholder="Input Height"
                label="Height"
                onBlur={handleBlur("height")}
                error={errors.height}
                touched={touched.height}
                onChangeText={handleChange("height")}
                value={values.height}
                type="number"
                rightText="m"
              />
              <View className="flex flex-row justify-center items-center">
                <Text className="text-sm text-center font-medium text-gray-300">
                  PRICE{" "}
                </Text>
                <Text className="text-sm text-center font-medium text-gray-800 px-2">
                  ${values?.showpricePerMonth}
                </Text>
                <Text className="text-sm text-center font-medium text-gray-300">
                  PER M
                </Text>
              </View>
              <View className="flex flex-row justify-between items-center bg-tertiary rounded-lg mt-3 py-3 px-3">
                <Text>Which Equals</Text>
                <Text>
                  {values?.area && values?.height
                    ? convertNumber(values?.area) *
                      convertNumber(values?.height)
                    : 0}{" "}
                  m3
                </Text>
              </View>
            </View>

            <CustomInput
              icon="form-dropdown"
              label="Define the access your offer to tenants"
              placeholder="Key Handover"
              onBlur={handleBlur("accessMethod")}
              error={errors.accessMethod}
              touched={touched.accessMethod}
              onChangeText={handleChange("accessMethod")}
              value={values.accessMethod}
              type="dropdown"
              options={spaceAccessData?.data || []}
            />

            <CustomInput
              placeholder="Type Location"
              label="Location"
              onBlur={handleBlur("location")}
              error={errors.location}
              touched={touched.location}
              onChangeText={handleChange("location")}
              value={values.location}
              type="location"
             
            />
            

            <CustomInput
              placeholder="Type Here"
              label="Description"
              onBlur={handleBlur("description")}
              error={errors.description}
              touched={touched.description}
              onChangeText={handleChange("description")}
              value={values.description}
              type="richtext"
              height={100}
            />
          </View>
          <View className="flex flex-row justify-between mt-5 py-2 px-4">
            <CustomButton
              bg={Colors.primary}
              size={120}
              text={"Prev"}
              height={40}
              showIcon={true}
              disabled={true}
              icon={"arrow-back-circle-outline"}
            />
            <CustomButton
              bg={Colors.primary}
              size={120}
              text={"Next"}
              height={40}
              onPress={() => handleSubmit()}
              rightIcon={true}
              icon={"arrow-forward-circle-sharp"}
              disabled={Object.keys(errors).length > 0 || !touched}
            />
          </View>
        </ScrollView>
      )}
    </Formik>
  );
};

export default SpaceInformation;
