import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import React, { useState } from "react";
import BackHeader from "../../components/global/header/BackHeader";
import CustomButton from "../../components/global/common/ui/Button";
import AntDesign from "@expo/vector-icons/AntDesign";
import CustomInput from "../../components/global/common/CommonInput";
import { Formik } from "formik";
import Colors from "../../constants/Colors";
import SearchBar from "../../components/global/common/SearchBar";

const ManagePaymentScreen = () => {
  const [tab, setTab] = useState("Active");
  const { height, width } = Dimensions.get("window");
  const [search, setSearch] = useState("");

  const handleSubmit = () => {
    console.log("Click ");
  };
  const handleSearch = (newQuery) => {
    setSearch(newQuery);
  };

  return (
    <SafeAreaView
      className="flex flex-col  bg-white h-full px-2 "
      style={{ width: width }}
    >
      <BackHeader Headertext="Back to Profile" />
      <View className="flex flex-row justify-start pt-4 pb-3 mx-5">
        <CustomButton
          bg={tab === "Active" ? Colors.akcent : Colors.gray2}
          size={140}
          text="Card details"
          height={45}
          // icon={renter}
          showIcon={true}
          onPress={() => setTab("Active")}
          // type="image"
          className={` ${
            tab === "Active" ? "bg-primary" : "bg-gray-100 "
          } border border-[#ccc] w-[120px] font-[outfit] rounded-l-lg`}
        />
        <CustomButton
          bg={tab === "Request" ? Colors.akcent : Colors.gray2}
          size={150}
          text="History"
          height={45}
          // icon={space_owner}
          showIcon={true}
          onPress={() => setTab("Request")}
          // type="image"
          className={` ${
            tab === "Request" ? "bg-primary" : "bg-gray-100 ]"
          } border border-[#ccc] w-24 font-[outfit] rounded-r-lg`}
        />
      </View>
      {tab === "Active" ? (
        <View
          className="flex flex-col justify-between mt-3 h-full mx-1"
          style={{ height: height - height * 0.34 }}
        >
          <View className="border border-primary w-full rounded-lg flex flex-row justify-between items-center px-4 py-4 shadow-lg">
            <View className="flex flex-row justify-center items-center space-x-4">
              <Text>Card</Text>
              <View className="flex flex-col gap-1">
                <Text className="font-[outfit-medium] text-[13px] text-gray-700">
                  Mastercard 345***445
                </Text>
                <Text className="font-[outfit] text-[10px] text-gray-400 ">
                  Expire 06/27
                </Text>
              </View>
            </View>
            <TouchableOpacity className="border border-[#ccc] rounded-full w-8 h-8 flex flex-row justify-center items-center">
              <AntDesign name="delete" size={13} color="#bdbdbd" />
            </TouchableOpacity>
          </View>
          <View>
            <Formik
              initialValues={{
                card: "",
                name: "",
                expiry_date: "",
                cvc: null,
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
                <View
                  className="w-full flex flex-col px-4 bg-white py-5 space-y-4 "
                  style={styles.popup}
                >
                  <View>
                    <CustomInput
                      icon=""
                      placeholder="Card Number"
                      autoCapitalize="none"
                      keyboardAppearance="dark"
                      returnKeyType="next"
                      returnKeyLabel="next"
                      label="Start Date"
                      onBlur={handleBlur("card")}
                      error={errors.card}
                      touched={touched.card}
                      onChangeText={handleChange("card")}
                      value={values.card}
                      type="text"
                      isEditable={true}
                      className="w-full "
                      width={"49%"}
                    />
                  </View>
                  <View>
                    <CustomInput
                      icon=""
                      placeholder="Full Name"
                      autoCapitalize="none"
                      keyboardAppearance="dark"
                      returnKeyType="next"
                      returnKeyLabel="next"
                      label="Murad Hossain"
                      onBlur={handleBlur("name")}
                      error={errors.name}
                      touched={touched.name}
                      onChangeText={handleChange("name")}
                      value={values.name}
                      type="text"
                      isEditable={true}
                      className="w-full "
                    />
                  </View>

                  <View className="flex flex-row justify-between ">
                    <CustomInput
                      icon=""
                      placeholder="Full Name"
                      autoCapitalize="none"
                      keyboardAppearance="dark"
                      returnKeyType="next"
                      returnKeyLabel="next"
                      label="Murad Hossain"
                      onBlur={handleBlur("name")}
                      error={errors.name}
                      touched={touched.name}
                      onChangeText={handleChange("name")}
                      value={values.name}
                      type="text"
                      isEditable={true}
                      width={"45%"}
                    />
                    <CustomInput
                      label="CVC"
                      placeholder="323"
                      onBlur={handleBlur("cvc")}
                      error={errors.cvc}
                      touched={touched.cvc}
                      onChangeText={(value) => setFieldValue("cvc", value)}
                      value={values.cvc}
                      values={values}
                      type="number"
                      width={"45%"}
                    />
                  </View>

                  <View className="mt-5 self-center">
                    <CustomButton
                      text="Save Changes"
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
          </View>
        </View>
      ) : (
        <View className="mt-4" style={{ width: width - width * 0.1 }}>
          <View className="">
            <SearchBar
              updateFilters={handleSearch}
              text={"Search for a store"}
            />
          </View>
          <View className="flex flex-row justify-between mt-6 mb-2">
            <Text className="text-gray-600 font-[outfit-medium] ">ENTRY</Text>
            <Text className="text-gray-400 font-[outfit-medium] ">DATE</Text>
          </View>

          <View className="border-t border-[#ccc] py-4 mt-2 flex flex-row justify-between items-start space-x-3">
            <View className="border rounded-lg w-10 h-10 "></View>
            <View className="flex flex-col space-y-2 ">
              <Text className="font-[outfit] text-[16px] ">
                Diamond field storage
              </Text>
              <View className="flex flex-row space-x-2">
                <Text className="font-[outfit] text-[15px] text-gray-400">
                  {" "}
                  Duration
                </Text>
                <Text className="font-[outfit-medium] text-[12px] text-gray-800">
                  {" "}
                  2 Months
                </Text>
              </View>
              <View className="flex flex-row space-x-2">
                <Text className="font-[outfit] text-[15px] text-gray-400">
                  {" "}
                  Amount
                </Text>
                <Text className="font-[outfit-medium] text-[12px] text-gray-800">
                  {" "}
                  $148
                </Text>
              </View>
            </View>
            <View className="flex flex-row space-x-4 justify-end">
              <EvilIcons name="calendar" size={24} color="black" />
              <Text>23 Jul 2021</Text>
            </View>
          </View>

          <View className="border-t border-[#ccc] py-4 mt-2 flex flex-row justify-between items-start space-x-3">
            <View className="border rounded-lg w-10 h-10 "></View>
            <View className="flex flex-col space-y-2 ">
              <Text className="font-[outfit] text-[16px] ">
                Diamond field storage
              </Text>
              <View className="flex flex-row space-x-2">
                <Text className="font-[outfit] text-[15px] text-gray-400">
                  {" "}
                  Duration
                </Text>
                <Text className="font-[outfit-medium] text-[12px] text-gray-800">
                  {" "}
                  2 Months
                </Text>
              </View>
              <View className="flex flex-row space-x-2">
                <Text className="font-[outfit] text-[15px] text-gray-400">
                  {" "}
                  Amount
                </Text>
                <Text className="font-[outfit-medium] text-[12px] text-gray-800">
                  {" "}
                  $148
                </Text>
              </View>
            </View>
            <View className="flex flex-row space-x-4 justify-end">
              <EvilIcons name="calendar" size={24} color="black" />
              <Text>23 Jul 2021</Text>
            </View>
          </View>
          <View className="border-t border-[#ccc] py-4 mt-2 flex flex-row justify-between items-start space-x-3">
            <View className="border rounded-lg w-10 h-10 "></View>
            <View className="flex flex-col space-y-2 ">
              <Text className="font-[outfit] text-[16px] ">
                Diamond field storage
              </Text>
              <View className="flex flex-row space-x-2">
                <Text className="font-[outfit] text-[15px] text-gray-400">
                  {" "}
                  Duration
                </Text>
                <Text className="font-[outfit-medium] text-[12px] text-gray-800">
                  {" "}
                  2 Months
                </Text>
              </View>
              <View className="flex flex-row space-x-2">
                <Text className="font-[outfit] text-[15px] text-gray-400">
                  {" "}
                  Amount
                </Text>
                <Text className="font-[outfit-medium] text-[12px] text-gray-800">
                  {" "}
                  $148
                </Text>
              </View>
            </View>
            <View className="flex flex-row space-x-4 justify-end">
              <EvilIcons name="calendar" size={24} color="black" />
              <Text>23 Jul 2021</Text>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  popup: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    // Custom shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // Custom shadow for Android
    elevation: 10,
  },
});
export default ManagePaymentScreen;
