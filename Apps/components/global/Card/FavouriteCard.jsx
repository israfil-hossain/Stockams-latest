import { View, Text, Image } from "react-native";
import React from "react";
import { favourite } from "../../../../assets/images";
import { AntDesign, Ionicons, Octicons } from "@expo/vector-icons";

const FavouriteCard = ({ data }) => {
  return (
    <View className=" w-[320px]  h-[180px] rounded-2xl bg-white items-center  mt-5 shadow-lg shadow-gray-500">
      <View className="flex flex-col mt-3 space-y-2 w-[100%]">
        <View className="flex flex-row justify-start space-x-4  w-[100%] px-5">
          <Image className="h-[63px] rounded-xl w-[22%]" source={favourite} />
          <View className="flex flex-col w-[63%]">
            <Text className="font-[outfit-medium] text-[16px] text-gray-600">Diamond Field Storage</Text>
            <View className="flex flex-row items-center space-x-1 ">
              <Octicons name="location" size={18} color="#757575" />
              <Text className="text-gray-600 py-1 text-[12px] font-[outfit]">
                {" "}
                Chodkiewicza Karola 111, Chorzow 41-506
              </Text>
            </View>
          </View>
          <Ionicons name="heart" size={25} color="#FF7354" className="pr-4" />
        </View>

        <View className="flex-row justify-between items-center w-[100%] px-4">
          <Text className="text-[14px] font-[600] font-[outfit]">Access 24/7</Text>
          <View className="flex flex-row items-center ">
            <Text className="text-[18px] font-[outfit-medium]">$ 74</Text>
            <Text className="text-[12px] font-normal text-gray-600 font-[outfit]">
              {" "}
              /month
            </Text>
          </View>
        </View>

        <View className="flex-row justify-between space-x-2 items-center  w-[100%] px-3 ">
          <View className=" flex flex-row  w-[20%]">
            <Image
              className="w-[22px] h-[22px] rounded-full border-gray-700 border"
              source={{ uri: "https://via.placeholder.com/22x22" }}
            />
            <Image
              className="w-[22px] h-[22px] rounded-full border-white right-[11px]"
              source={{ uri: "https://via.placeholder.com/22x22" }}
            />
            <Image
              className="w-[22px] h-[22px] rounded-full border-white right-[22px]"
              source={{ uri: "https://via.placeholder.com/22x22" }}
            />
            <Image
              className="w-[22px] h-[22px] rounded-full border-white right-[32px]"
              source={{ uri: "https://via.placeholder.com/22x22" }}
            />
          </View>

          <View className="  px-2 w-[32%] py-1 bg-tertiary rounded-xl justify-around flex flex-row items-center">
            <Ionicons
              name="person-circle-sharp"
              size={24}
              color="black"
              className="items-center"
            />
            <Text className="text-sm font-[outfit]">Certified</Text>
          </View>

          <View className=" w-[40%] p-2  bg-white rounded-lg justify-between flex flex-row items-center border-gray2 border">
            <AntDesign name="staro" size={18} color="orange" />
            <Text className="text-md font-medium">4.8</Text>
            <Text className="text-[10px] text-gray-400">345 reviews</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FavouriteCard;
