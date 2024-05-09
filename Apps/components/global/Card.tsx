import React from "react";
import { View, Text, Image, StyleSheet, Alert } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import Colors from "@/constants/Colors";
import CustomButton from "./common/ui/Button";
const StoreCard = ({ data }: any) => {
  return (
    <View className="w-[320px] h-[350px] shadow-lg shadow-gray-400 bg-white border-tertiary border  rounded-xl mt-5 relative flex justify-center items-center">
      <View className="w-[92%] h-44 absolute top-4 items-center justify-center flex bg-white rounded-3xl shadow ">
        <Image
          className="w-full h-full  absolute rounded-3xl"
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
          {/* <View className="h-[22px] flex flex-row w-[40%] absolute right-0">
            <Image
              className="w-[24px] h-[24px] rounded-full border-gray-700 border"
              source={{ uri: "https://via.placeholder.com/22x22" }}
              width={30} 
              height={30}
            />
            <Image
              className="w-[22px] h-[22px] rounded-full border-white "
              source={{ uri: "https://via.placeholder.com/22x22" }}
            />
             <Image
              className="w-[22px] h-[22px] rounded-full border-white "
              source={{ uri: "https://via.placeholder.com/22x22" }}
            />
            <Image
              className="w-[22px] h-[22px] rounded-full border-white "
              source={{ uri: "https://via.placeholder.com/22x22" }}
            />
          </View> */}
        </View>
        <View className="">
          <Text className="text-gray-600 py-2"> Chodkiewicza Karola 111, Chorzow 41-506</Text>
        </View>
        <View className="flex flex-row justify-between">
          <Text className="text-[12px] font-[700]">Access 24/7</Text>
          <View className="flex flex-row">
            <Text className="font-bold text-[16px]">
              $74
            </Text>
            <Text className="text-sm text-gray-500">/month</Text>
          </View>
        </View>
       
        <View className="flex flex-row justify-between py-2">
          <CustomButton  text="Reject" size={140} bg={Colors.white} onPress={() => Alert.alert('Reject')}/>
          <CustomButton bg={Colors.primary} size={140} text="Approve" onPress={()=> Alert.alert('Button clicked')}/>
          
        </View>
      </View>
    </View>
  );
};

export default StoreCard;
