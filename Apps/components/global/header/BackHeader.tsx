import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";

const BackHeader: React.FC<any> = ({ Headertext }) => {
  const router = useRouter();
  return (
    <View className="flex flex-row items-center space-x-2 bg-white  py-2 rounded-xl">
      <TouchableOpacity className="ml-2" onPress={() => router.back()}>
        <Ionicons
          name="ios-arrow-back-circle-outline"
          size={26}
          color="#808080"
        />
      </TouchableOpacity>

      <Text className="font-semibold  text-[14px]">{Headertext}</Text>
    </View>
  );
};

export default BackHeader;
