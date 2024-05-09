import React from "react";
import { View, Text, Image, StyleSheet, Alert } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import Colors from "@/constants/Colors";

// import HorizontalProgress from "@/components/global/progress/HorizontalProgress";
const BookedCard = ({ data }: any) => {
  return (
    <View className="w-[342px] h-[400px] shadow-lg shadow-gray-400 bg-white border-primary border  rounded-xl mt-5 relative flex justify-center items-center">
      <View className="w-[94%] h-44 absolute top-4 items-center justify-center flex bg-white rounded-2xl shadow ">
        <Image
          className="w-full h-full  absolute rounded-2xl"
          source={{ uri: "https://via.placeholder.com/364x194" }}
        />
      </View>
      <View className="w-32 h-[37px] p-2 right-5 top-8 absolute bg-white rounded-lg justify-between flex flex-row items-center ">
        <AntDesign name="staro" size={18} color="orange" />
        <Text className="text-md font-medium">4.8</Text>
        <Text className="text-[10px] text-gray-400">345 reviews</Text>
      </View>
      <View className="w-[100px] h-[37px] px-2 left-5 top-7 absolute bg-tertiary rounded-xl justify-around flex flex-row items-center">
        <Ionicons
          name="person-circle-sharp"
          size={24}
          color="black"
          className="items-center"
        />
        <Text className="text-sm font-medium ">Certified</Text>
      </View>
      <View className=" top-[200px]  w-[92%] absolute ">
        <View className="relative flex flex-row justify-between">
          <View className="w-[60%]">
            <Text className="text-[15px] font-bold">Diamond field storage</Text>
          </View>
          <View className="h-[22px] flex flex-row w-[40%] absolute right-0">
            <Image
              className="left-[36px] rounded-full border-gray-700 border"
              source={{ uri: "https://via.placeholder.com/22x22" }}
              style={{height:22, width:22,borderRadius:10}}
              resizeMode="cover"
              
            />
            <Image
               className="left-[36px] rounded-full border-gray-700 border"
               source={{ uri: "https://via.placeholder.com/22x22" }}
               style={{height:22, width:22,borderRadius:10}}
               resizeMode="cover"
            />
            <Image
               className="left-[36px] rounded-full border-gray-700 border"
               source={{ uri: "https://via.placeholder.com/22x22" }}
               style={{height:22, width:22,borderRadius:10}}
               resizeMode="cover"
            />
            <Image
              className="left-[36px] rounded-full border-gray-700 border"
              source={{ uri: "https://via.placeholder.com/22x22" }}
              style={{height:22, width:22,borderRadius:10}}
              resizeMode="cover"
            />
          </View>
        </View>
        <View className="">
          <Text className="text-gray-600 py-2">
            {" "}
            Chodkiewicza Karola 111, Chorzow 41-506
          </Text>
        </View>
        <View className="flex flex-row justify-between">
          <Text className="text-[12px] font-[700]">Access 24/7</Text>
          <View className="flex flex-row">
            <Text className="font-bold text-[16px]">$74</Text>
            <Text className="text-sm text-gray-500">/month</Text>
          </View>
        </View>
      </View>
      <View className="top-[270px]  w-[100%] absolute  py-2 px-2 border-t border-gray-200 mt-2">
        <View className="flex flex-row justify-around">
          <View className="flex flex-col justify-around">
            <Text className="text-slate-400 text-[12px] font-semibold ">
              Start date
            </Text>
            <Text className="text-slate-800 text-[14px] font-bold">
              12 Mar 2023
            </Text>
          </View>
          <View className="flex flex-col justify-around">
            <Text className="text-slate-400 text-[12px] font-semibold ">
              End date
            </Text>
            <Text className="text-slate-800 text-[14px] font-bold">
              12 Mar 2023
            </Text>
          </View>
          <View className="flex flex-col justify-around">
            <Text className="text-slate-400 text-[12px] font-semibold ">
              Duration
            </Text>
            <Text className="text-slate-800 text-[14px] font-bold">
              2 Months
            </Text>
          </View>
        </View>
        <View className="mt-4 w-full">
          {/* <HorizontalProgress /> */}
        </View>
        <View className="flex flex-row justify-between px-2 mt-2">
          <Text className="text-sm font-[600] text-gray-400">Time Left</Text>
          <Text className="text-sm font-[600] text-gray-400">45 days</Text>
        </View>
      </View>
    </View>
  );
};

export default BookedCard;
