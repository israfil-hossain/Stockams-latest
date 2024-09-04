import { View, Text } from "react-native";
import React from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
const Access = () => {
  return (
    <View>
      <View className="flex flex-row justify-between items-center ">
        <Text className="text-[14px] font-[600]">Access 24/7</Text>
        <Ionicons name="heart" size={27} color="#FF7354" />
      </View>
      <View className="w-full flex flex-row justify-between items-center p-1 mt-3 space-x-2">
        <TouchableOpacity>
          <View className="bg-white w-[105px] h-[80px] border-primary border  rounded-xl shadow-lg flex flex-col items-center justify-center space-y-2">
            <View className="bg-primary h-[30px] w-[30px] justify-center rounded-3xl items-center">
              <MaterialCommunityIcons
                name="shield-lock-outline"
                size={20}
                color="#2D2D2A"
              />
            </View>
            <Text className="text-[12px] font-bold">Secure Center</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View className="bg-white w-[105px] h-[80px] border-tertiary border  rounded-xl shadow-sm flex flex-col items-center justify-center space-y-2">
            <View className="bg-tertiary h-[30px] w-[30px] justify-center rounded-3xl items-center">
              <Ionicons name="key-outline" size={20} color="#2D2D2A" />
            </View>
            <Text className="text-[12px] font-bold">key Handover</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View className="bg-white w-[105px] h-[80px] border-secondary border  rounded-xl shadow-sm flex flex-col items-center justify-center space-y-2">
            <View className="bg-secondary h-[30px] w-[30px] justify-center rounded-3xl items-center">
              <MaterialCommunityIcons
                name="home-modern"
                size={20}
                color="#2D2D2A"
              />
            </View>
            <Text className="text-[12px] font-bold">Individual Space</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className="w-full mt-4 flex flex-col space-y-3">
        <Text className="text-[18px] font-bold">Secure Center </Text>
        <Text className="text-[14px] font-[300] text-justify">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit. Exercitation
          veniam consequat sunt nostrud amet. Amet minim mollit non deserunt
          ullamco est sit aliqua dolor do amet sint.
        </Text>
        <Text className="text-[14px] font-[300] text-justify">
          Velit officia consequat duis enim velit mollit. Exercitation veniam
          consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco
          est sit aliqua dolor do amet sint. Velit officia consequat duis enim
          velit mollit. Exercitation veniam consequat sunt nostrud amet.
        </Text>
      </View>
    </View>
  );
};

export default Access;
