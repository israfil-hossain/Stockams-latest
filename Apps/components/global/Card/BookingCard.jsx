import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { noimage, profile } from "../../../../assets/images";
import { truncateString } from "../../../utils/commonFunction";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import {
  calculateDuration,
  formatDate,
  formatDateWithMonth,
} from "../../../utils/formatDate";
import Colors from "../../../constants/Colors";

const BookingCard = ({ data }) => {
  const { _id, spaceDetails } = data;
  const navigation = useNavigation();

  // Calculate dates
  const fromDate = new Date(data?.fromDate);
  const toDate = new Date(data?.toDate);
  const currentDate = new Date();

  // Calculate total duration in milliseconds
  const totalDuration = toDate - fromDate;

  // Calculate time remaining until toDate
  const timeRemaining = toDate - currentDate;

  // Calculate the percentage of time left (clamped between 0 and 1)
  const percentage = Math.min(1, Math.max(0, timeRemaining / totalDuration));

  // Calculate days left
  const daysLeft = Math.max(
    0,
    Math.ceil(timeRemaining / (1000 * 60 * 60 * 24))
  );

  // Determine background color based on days left
  const progressBarColor = daysLeft === 0 ? Colors.danger : Colors.primary; // red if no days left, otherwise blue

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate("spaceOverview", { id: `${spaceDetails._id}` })
      }
      className={`w-[320px]  shadow-lg shadow-gray-400 h-[420px]
       bg-white border-primary border  rounded-xl mt-5 relative flex justify-center items-center `}
    >
      <View className="w-[94%] h-44 absolute top-4 items-center justify-center flex bg-white rounded-3xl shadow ">
        {spaceDetails?.coverImage ? (
          <>
            <Image
              className="w-full h-full   rounded-2xl"
              source={{
                uri: spaceDetails?.coverImage,
              }}
            />
          </>
        ) : (
          <View className="w-[99%]  h-44 absolute top-0 items-center justify-center flex bg-gray-100 rounded-2xl  shadow">
            <Image className="w-20 h-20  mt-5 rounded-2xl" source={noimage} />
          </View>
        )}
      </View>
      <View className="w-32 h-[37px] p-2 right-5 top-8 absolute bg-white rounded-lg justify-between flex flex-row items-center ">
        <AntDesign name="staro" size={18} color="orange" />
        <Text className="text-sm  font-[outfit-medium]">
          {spaceDetails.averageRating}
        </Text>
        <Text className="text-[10px] text-gray-400 font-[outfit-medium]">
          {spaceDetails?.reviewCount} reviews
        </Text>
      </View>
      <View className="w-[100px] h-[37px] px-2 left-5 top-7 absolute bg-tertiary rounded-xl justify-around flex flex-row items-center">
        {spaceDetails?.ownerProfilePicture ? (
          <Image
            source={{
              uri: spaceDetails?.ownerProfilePicture,
            }}
            className="w-5 h-5 rounded-full"
          />
        ) : (
          <Ionicons
            name="person-circle-sharp"
            size={24}
            color="black"
            className="items-center"
          />
        )}
        <Text className="text-sm font-medium ">Certified</Text>
      </View>
      <View className=" top-[200px]  w-[92%] absolute ">
        <View className="flex flex-row justify-between pt-1">
          <View className="w-[60%]">
            <Text className="text-[15px] font-[outfit-bold]">
              {" "}
              {truncateString(spaceDetails.name, 45) || "N/A"}
            </Text>
          </View>
          <View className="flex flex-row gap-4">
            <View className="h-[22px] flex flex-row">
              {spaceDetails?.favoriteUsers?.slice(0, 6).map((item, index) => (
                <View
                  key={index}
                  className="w-[24px] h-[24px] -ml-2 z-5 bg-white items-center flex flex-row justify-center rounded-full border border-gray-300 p-[1px] overflow-hidden"
                >
                  {item?.profilePicture ? (
                    <Image
                      className="w-full h-full pl-5 "
                      source={{
                        uri: item?.profilePicture,
                      }}
                      width={30}
                      height={30}
                    />
                  ) : (
                    <Ionicons
                      name="person-circle-sharp"
                      color="black"
                      size={20}
                      className="w-[22px] h-[22px]"
                    />
                  )}
                </View>
              ))}
            </View>
            {
              <Ionicons
                name={
                  spaceDetails?.favoriteUsers?.length > 0
                    ? "heart"
                    : "heart-outline"
                }
                size={27}
                color="#FF7354"
              />
            }
          </View>
        </View>
        <View className="">
          <Text className="text-gray-600 py-2 font-[outfit]">
            {" "}
            {truncateString(spaceDetails?.location, 40) || "N/A"}
          </Text>
        </View>
        <View className="flex flex-row justify-between ">
          <Text className="text-[12px] font-[outfit-medium]">
            {" "}
            {truncateString(spaceDetails?.accessMethod, 30)}
          </Text>
          <View className="flex flex-row">
            <Text className="font-[outfit-bold] text-[16px]">
              ${spaceDetails?.pricePerMonth}
            </Text>
            <Text className="text-sm text-gray-500">/month</Text>
          </View>
        </View>

        <View className="">
          <View
            style={{
              borderBottomColor: "#e3e3e3",
              borderBottomWidth: 1,
              marginVertical: 10, // Adjust the margin as needed
            }}
          ></View>
          <View className="flex-row justify-between items-center ">
            <Text className="font-[outfit] text-[12px] text-gray-400">
              Start date
            </Text>
            <Text className="font-[outfit] text-[12px] text-gray-400">
              End date
            </Text>
            <Text className="font-[outfit] text-[12px] text-gray-400">
              Duration
            </Text>
          </View>
          <View className="flex-row justify-between items-center mt-1">
            <Text className="font-[outfit-medium] text-[12px] ">
              {formatDateWithMonth(data?.fromDate)}
            </Text>
            <Text className="font-[outfit-medium] text-[12px] ">
              {formatDateWithMonth(data?.toDate)}
            </Text>
            <Text className="font-[outfit-medium] text-[12px] ">
              {calculateDuration(data?.fromDate, data?.toDate)}
            </Text>
          </View>
          <View className="mt-4">
            <View
              style={{ height: 7, borderRadius: 5, backgroundColor: "#e0e0e0" }}
            >
              <View
                style={{
                  width: `${percentage * 100}%`,
                  height: "100%",
                  borderRadius: 5,
                  backgroundColor: progressBarColor, // Tailwind color for blue-500
                }}
              />
            </View>
            <View className="flex flex-row justify-between pt-2">
              <Text className="font-[outfit] text-[12px] text-gray-400">
                Time Left
              </Text>
              <Text className="font-[outfit-medium] text-[12px] ">
                {daysLeft} days left
              </Text>
            </View>
          </View>

          {/* <View className="flex flex-row justify-between py-2">
              <CustomButton
                text="Reject"
                size={140}
                bg={Colors.white}
                onPress={() => Alert.alert("Reject")}
              />
              <CustomButton
                bg={Colors.primary}
                size={140}
                text="Approve"
                onPress={() => Alert.alert("Button clicked")}
              />
            </View> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BookingCard;
