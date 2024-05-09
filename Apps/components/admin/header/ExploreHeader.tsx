// Import necessary components and styles
import { View, Text, Alert } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import CustomButton from "@/components/global/common/ui/Button";


// Create your ExploreHeader component
const ExploreHeader = () => {
  return (
    <View className="w-full mt-5 flex flex-col justify-center items-center ">
      <View className="w-[340px] h-52 bg-black rounded-3xl flex justify-center items-center ">
        <View className="rounded-full border-[13px] border-white w-32 h-32 flex justify-center items-center ">
          <Text className="text-white text-2xl font-medium">20%</Text>
          <Text className="text-white text-xs font-medium">Free Spaces</Text>
        </View>
        <View className="flex flex-row space-x-4 justify-between items-center mt-3">
          <View className="flex flex-col justify-center items-center">
            <Text className="text-white text-sm">Total Space</Text>
            <View className="flex flex-row space-x-2 items-center pt-1">
              <View className="w-4 h-4 rounded-full bg-primary"></View>
              <Text className="text-white font-bold text-sm ">50</Text>
            </View>
          </View>
          <View className="flex flex-col justify-center items-center">
            <Text className="text-white text-sm ">Booked Space</Text>
            <View className="flex flex-row space-x-2 items-center pt-1">
              <View className="w-4 h-4 rounded-full bg-secondary"></View>
              <Text className="text-white text-sm font-bold">30</Text>
            </View>
          </View>
          <View className="flex flex-col justify-center items-center">
            <Text className="text-white text-sm">Request Space</Text>
            <View className="flex flex-row space-x-2 items-center pt-1">
              <View className="w-4 h-4 rounded-full bg-tertiary"></View>
              <Text className="text-white">50</Text>
            </View>
          </View>
        </View>
      </View>
     
      <View className="flex flex-row justify-between py-2">
        <CustomButton
          text="Create New Spaces"
          size={320}
          bg={Colors.akcent}
          onPress={() => Alert.alert("Reject")}
        />
      </View>
     
    </View>
  );
};
// Export your component
export default ExploreHeader;
