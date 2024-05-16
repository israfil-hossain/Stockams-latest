import { View, Text, Image } from "react-native";
import React from "react";
import { nodata } from "../../../../../assets/images";

const NodataFound = () => {
  return (
    <View className="mt-16 rounded-lg shadow-lg flex-col justify-center bg-gray-100 px-16 items-center py-10  mx-4">
      <Image
        source={nodata}
        className="w-32 mb-4 h-24 rounded-lg"
      />
      <Text className="font-[outfit-medium] text-lg py-2">No Data Found !</Text>
    </View>
  );
};

export default NodataFound;
