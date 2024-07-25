import React, { Children, useCallback, useRef, useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";

import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";

import BackHeader from "../../components/global/header/BackHeader";
import CustomButton from "../../components/global/common/ui/Button";

import { useRoute } from "@react-navigation/native";
import { API } from "../../../api/endpoints";
import { useGet } from "../../hooks";
import CommonBottomSheet from "../../components/modals/CommonBottomSheet";
import { useSharedValue } from "react-native-reanimated";
import BookingBottomCard from "../../components/host_rental_panel/components/BookingBottomCard";

const SpaceOverviewScreen = () => {
  const navigation = useNavigation();
  const [activeImage, setActiveImage] = useState(0);
  const [isOpen, setIssOpen] = useState(true);
  const route = useRoute();
  const { id } = route.params; // Destructure the 'id' param

  const issOpen = useSharedValue(false);

  const toggleSheet = () => {
    issOpen.value = !issOpen.value;
  };

  const spaceOverViewAPI = `${API.GetSingleSpaceForRent}/${id}`;

  const {
    data: { data: spaceRentData = {} } = {},
    isLoading: spaceTypeLoading,
  } = useGet({ endpoint: spaceOverViewAPI });

  console.log("Data : ===> ", spaceRentData?.data);


  const handleImageClick = (index) => {
    setActiveImage(index);
  };

  return (
    <View>
      <BackHeader Headertext="Back" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        style={[{ backgroundColor: isOpen ? "transfarent" : "white" }]}
      >
        <View style={styles.container}>
          {/* For Banner and Image Section  */}
          <View>
            <Image
              source={{
                uri: spaceRentData?.data?.spaceImages[activeImage]?.url,
              }}
              style={styles.banner}
            />
            <TouchableOpacity className="w-[100px] h-[37px] px-2 left-5 top-5 absolute bg-tertiary rounded-xl justify-around flex flex-row items-center">
              <Ionicons
                name="person-circle-sharp"
                size={24}
                color="black"
                className="items-center"
              />
              <Text className="text-sm font-medium ">Certified</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-32 h-[37px] p-2 right-5 top-5 absolute bg-white rounded-lg justify-between flex flex-row items-center">
              <AntDesign name="staro" size={18} color="orange" />
              <Text className="text-md font-medium">4.8</Text>
              <Text className="text-[10px] text-gray-400">345 reviews</Text>
            </TouchableOpacity>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollContainer}
            >
              {spaceRentData?.data?.spaceImages?.map((image, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleImageClick(index)}
                  style={[
                    styles.thumbnailWrapper,
                    {
                      borderColor:
                        activeImage === index ? "#DCE102" : "transparent",
                    },
                  ]}
                >
                  <Image
                    source={{ uri: image?.url }}
                    style={styles.thumbnail}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View className="flex flex-row justify-between">
            <Text className="text-[15px] font-bold">
              {spaceRentData?.data?.name}
            </Text>
            <View className="flex flex-row items-center">
              <Text className="text-[18px] font-bold">
                ${spaceRentData?.data?.pricePerMonth}
              </Text>
              <Text className="text-[12px] font-normal text-gray-600">
                {" "}
                /month
              </Text>
            </View>
          </View>

          <View className="flex flex-row items-center space-x-1">
            <Octicons name="location" size={20} color="#757575" />
            <Text className="text-gray-600 py-2">
              {" "}
              {spaceRentData?.data?.location}
            </Text>
          </View>

          <View className="flex flex-row justify-between items-center ">
            <Text className="text-[14px] font-[600]">Access 24/7</Text>
            <Ionicons name="heart" size={27} color="#FF7354" />
          </View>
          <View className="w-full flex flex-row justify-between items-center p-1 mt-3 space-x-2">
            <TouchableOpacity>
              <View className="bg-white w-[105px] h-[80px] border-primary border  rounded-xl shadow-lg flex flex-col items-center justify-center space-y-2">
                <View className="bg-primary h-[30px] w-[30px] justify-center rounded-3xl items-center">
                  <MaterialCommunityIcons
                    name="shield-lock-outline"
                    size={20}
                    color="#2D2D2A"
                  />
                </View>
                <Text className="text-[12px] font-bold">Secure Center</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View className="bg-white w-[105px] h-[80px] border-tertiary border  rounded-xl shadow-sm flex flex-col items-center justify-center space-y-2">
                <View className="bg-tertiary h-[30px] w-[30px] justify-center rounded-3xl items-center">
                  <Ionicons name="key-outline" size={20} color="#2D2D2A" />
                </View>
                <Text className="text-[12px] font-bold">key Handover</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View className="bg-white w-[105px] h-[80px] border-secondary border  rounded-xl shadow-sm flex flex-col items-center justify-center space-y-2">
                <View className="bg-secondary h-[30px] w-[30px] justify-center rounded-3xl items-center">
                  <MaterialCommunityIcons
                    name="home-modern"
                    size={20}
                    color="#2D2D2A"
                  />
                </View>
                <Text className="text-[12px] font-bold">Individual Space</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View className="w-full mt-4 flex flex-col space-y-3">
            <Text className="text-[18px] font-bold">Secure Center </Text>
            <Text className="text-[14px] font-[300] text-justify">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
              Exercitation veniam consequat sunt nostrud amet. Amet minim mollit
              non deserunt ullamco est sit aliqua dolor do amet sint.
            </Text>
            <Text className="text-[14px] font-[300] text-justify">
              Velit officia consequat duis enim velit mollit. Exercitation
              veniam consequat sunt nostrud amet. Amet minim mollit non deserunt
              ullamco est sit aliqua dolor do amet sint. Velit officia consequat
              duis enim velit mollit. Exercitation veniam consequat sunt nostrud
              amet.
            </Text>
          </View>
          <View className="w-full mt-5 flex-col space-y-5">
            <Text className="text-[18px] font-bold">Features </Text>
            <View className="flex flex-row justify-start items-center w-full h-auto space-x-6 ">
              <View className="items-center">
                <Text className=" font-normal w-[150px]">
                  Storage Conditions
                </Text>
              </View>
              <View className="flex flex-row justify-start space-x-2  items-center">
                {spaceRentData?.data?.storageConditions?.map((item) => (
                  <View key={item?._id} className="flex-row space-x-2">
                    <Feather name="check" size={20} color="#37CF02" />
                    <Text>{item?.name}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View className="flex flex-row justify-start items-center w-full h-auto space-x-6">
              <View className="items-center">
                <Text className="font-normal w-[150px]">
                  Unloading & Moving
                </Text>
              </View>
              <View className="flex flex-col justify-start space-x-2 items-start">
                {spaceRentData?.data?.unloadingMovings?.map((item) => (
                  <View
                    key={item?._id}
                    className="flex-row space-x-2 justify-center items-center"
                  >
                    <Feather name="check" size={20} color="#37CF02" />
                    <Text>{item?.name}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View className="flex flex-row justify-start items-center w-full h-auto space-x-6">
              <View className="items-center">
                <Text className="font-normal w-[150px]">Security</Text>
              </View>
              <View className="flex flex-col justify-start space-x-2 items-start ">
                {spaceRentData?.data?.spaceSecurities?.map((item) => (
                  <View
                    key={item?._id}
                    className="flex-row space-x-2 justify-center items-center"
                  >
                    <Feather name="check" size={20} color="#37CF02" />
                    <Text>{item?.name}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View className="flex flex-row justify-start items-center w-full h-auto space-x-6">
              <View className="items-center">
                <Text className="font-normal w-[150px]">Schedule</Text>
              </View>
              <View className="flex flex-col justify-start space-x-2 items-start ">
                {spaceRentData?.data?.spaceSchedules?.map((item) => (
                  <View
                    key={item?._id}
                    className="flex-row space-x-2 justify-start items-center"
                  >
                    <Feather name="check" size={20} color="#37CF02" />
                    <Text>{item?.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View className="flex flex-col mt-5 w-full h-auto mb-4 space-y-4">
            <View className="flex flex-row justify-between bg-white border-primary border rounded-lg w-full h-[48px] items-center p-2">
              <Text className="text-[#ABB0B6] text-[15px] font-normal">
                Insurance Coverage
              </Text>
              <Text className="text-[17px] font-bold">6 month left</Text>
            </View>
            <View className="flex flex-row justify-between bg-white border-primary border rounded-lg w-full h-[48px] items-center p-2">
              <Text className="text-[#ABB0B6] text-[15px] font-normal">
                Cancelation
              </Text>
              <Text className="text-[17px] font-bold">10%</Text>
            </View>
            <View className="flex flex-row justify-between bg-white border-primary border rounded-lg w-full h-[48px] items-center p-2">
              <Text className="text-[#ABB0B6] text-[15px] font-normal">
                Gate Access Hours
              </Text>
              <Text className="text-[17px] font-bold">24 Hours</Text>
            </View>
            <View className="items-center">
              <CustomButton
                text="View Review"
                size={"100%"}
                height={45}
                bg={Colors.white}
                onPress={() =>
                  navigation.navigate("spaceReview", {
                    id: `${spaceRentData?.data?._id}`,
                  })
                }
              />
            </View>
          </View>
        </View>

        <View className="w-full h-auto rounded-t-3xl drop-shadow-2xl shadow-black mb-20">
          <View className="m-4">
            {/* <Text className="text-[15px] font-normal">Select Space</Text> */}

            {/* <CustomDropDown
                title="8.5m2 111$ month including tax $75"
                data={options}
              /> */}

            <CustomButton
              text="Book Now"
              size={"100%"}
              height={45}
              bg={Colors.primary}
              onPress={toggleSheet}
            />
          </View>
        </View>

        <CommonBottomSheet isOpen={issOpen} toggleSheet={toggleSheet} >
          <BookingBottomCard data={spaceRentData?.data}/>
        </CommonBottomSheet>

       
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: "auto",
    width: "100%",
  },
  banner: {
    width: "100%",
    height: 220, // Adjust the height as needed
    resizeMode: "cover",
    borderRadius: 15,
  },
  scrollContainer: {
    paddingVertical: 10,
    marginTop: 5,
  },
  thumbnailWrapper: {
    borderWidth: 1,
    borderRadius: 6,
    marginRight: 10,
    height: 52,
    width: 52,
  },
  thumbnail: {
    width: 50,
    height: 50,
    marginRight: 10,
    resizeMode: "cover",
    borderRadius: 5,
  },
  commonText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SpaceOverviewScreen;
