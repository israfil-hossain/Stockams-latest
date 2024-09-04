import { View, Text } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

const FeatureCard = ({ spaceRentData }) => {
  return (
    <View className="w-full mt-5 flex-col space-y-5">
      <Text className="text-[18px] font-bold">Features </Text>
      <View className="flex flex-row justify-start items-center w-full h-auto space-x-6">
        <View className="w-[150px] items-start">
          <Text className="font-normal">Storage Conditions</Text>
        </View>
        <View className="flex flex-col justify-start items-start space-y-2">
          {spaceRentData?.data?.storageConditions?.map((item) => (
            <View key={item?._id} className="flex-row space-x-2 items-center">
              <Feather name="check" size={20} color="#37CF02" />
              <Text>{item?.name}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className="flex flex-row justify-start items-center w-full h-auto space-x-6">
        <View className="w-[150px] items-start">
          <Text className="font-normal">Unloading & Moving</Text>
        </View>
        <View className="flex flex-col justify-start items-start space-y-2">
          {spaceRentData?.data?.unloadingMovings?.map((item) => (
            <View key={item?._id} className="flex-row space-x-2 items-center">
              <Feather name="check" size={20} color="#37CF02" />
              <Text>{item?.name}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className="flex flex-row justify-start items-center w-full h-auto space-x-6">
        <View className="w-[150px] items-start">
          <Text className="font-normal">Security</Text>
        </View>
        <View className="flex flex-col justify-start items-start space-y-2">
          {spaceRentData?.data?.spaceSecurities?.map((item) => (
            <View key={item?._id} className="flex-row space-x-2 items-center">
              <Feather name="check" size={20} color="#37CF02" />
              <Text>{item?.name}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className="flex flex-row justify-start items-center w-full h-auto space-x-6">
        <View className="w-[150px] items-start">
          <Text className="font-normal">Schedule</Text>
        </View>
        <View className="flex flex-col justify-start items-start space-y-2">
          {spaceRentData?.data?.spaceSchedules?.map((item) => (
            <View key={item?._id} className="flex-row space-x-2 items-center">
              <Feather name="check" size={20} color="#37CF02" />
              <Text>{item?.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default FeatureCard;
