import { Text, View, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const BackHeader = ({ Headertext }) => {
  const navigate = useNavigation(); 
  return (
    <View className="flex flex-row items-center space-x-2 bg-white  py-2 rounded-xl">
      <TouchableOpacity className="ml-2" onPress={() => navigate.goBack("")}>
        <Ionicons
          name="arrow-back"
          size={26}
          color="#808080"
        />
      </TouchableOpacity>

      <Text className="font-semibold  text-[14px]">{Headertext}</Text>
    </View>
  );
};

export default BackHeader;
