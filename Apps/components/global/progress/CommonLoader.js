import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

const CommonLoader = () => {
  return (
    <View className="w-96 flex mt-5 mb-5 flex-row  justify-center items-center p-5 rounded-xl bg-white shadow-md">
      <ActivityIndicator size="large"  color="#0000ff"/>
    </View>
  );
};

export default CommonLoader;
