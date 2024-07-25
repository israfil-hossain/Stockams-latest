import { Text, View, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";

import { Formik } from "formik";
import { addSpaceValidation } from "../../../../../validation/space/addSpaceValidation";
import Colors from "../../../../../constants/Colors";
import CustomButton from "../../../../global/common/ui/Button";
import { convertNumber } from "../../../../../utils/commonFunction";
import SpaceInfoSkeleton from "../../../../global/progress/skeleton/SpaceInfoeSkeleton";
import { useGet } from "../../../../../hooks";
import { API } from "../../../../../../api/endpoints";
import CustomInput from "../../../../global/common/CommonInput";

const SpaceInformation = ({ onSubmit, data, setFormData, spacedata }) => {
  const [locationData, setLocationData] = useState([]); // State to store location results
  const spaceTypeEndpoint = `${API.GetAllDropdownSpaceType}`;
  const spaceAccessEndpoint = `${API.GetAllDropdownAccess}`;

  const {
    data: { data: spaceType } = [],
    isLoading: spaceTypeLoading,
    refetch: spaceTypeRefetch,
    isFetching: spaceTypeFetching,
  } = useGet({ endpoint: spaceTypeEndpoint });

  const {
    data: { data: spaceAccessData } = [],
    refetch: spaceAccessRefetch,
    isLoading: spaceAccessLoading,
    isFetching: spaceAccessFetching,
  } = useGet({ endpoint: spaceAccessEndpoint });

  // useEffect(() => {
  //   if (!spacedata) {
  //     spaceTypeRefetch({enabled:true});
  //     spaceAccessRefetch({enabled:true});
  //   }
  // }, [spacedata]);

  const handleSubmit = async (values) => {
    const payload = {
      ...values,
      area: convertNumber(values?.area),
      height: convertNumber(values?.height),
    };

    console.log(payload);

    await setFormData((prevFormData) => ({
      ...prevFormData,
      ...payload,
    }));
    console.log("object :>> ", data);
    onSubmit();
  };

  return (
    <View className="h-[95%]">
      {spaceTypeLoading || spaceAccessLoading ? (
        <View>
          <ActivityIndicator size="large" color="#3C09BC" />
          <SpaceInfoSkeleton />
        </View>
      ) : (
        <Formik
          initialValues={{
            name: spacedata?.data?.name || data?.name || "",
            type: spacedata?.data?.type?._id || data?.type || "",
            area: spacedata?.data?.area || data?.area || 0,
            height: spacedata?.data?.height || data?.height || 0,
            showpricePerMonth:
              spacedata?.data?.pricePerMonth || data?.pricePerMonth || "",
            accessMethod:
              spacedata?.data?.accessMethod?._id || data?.accessMethod || "",
            location: spacedata?.data?.location || data?.location || "",
            description:
              spacedata?.data?.description || data?.description || "",
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
            <ScrollView className="px-4 h-[90%] mb-10">
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
                    value={String(values?.area)}
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
                    value={String(values.height)}
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
                  label="Define the access your offer to Tenants"
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
      )}
    </View>
  );
};

export default SpaceInformation;
