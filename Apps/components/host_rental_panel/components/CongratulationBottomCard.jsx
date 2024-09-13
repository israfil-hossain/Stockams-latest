import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../../constants/Colors";
import CustomButton from "../../global/common/ui/Button";
import { congratulation } from "../../../../assets/images";
import { useNavigation } from "@react-navigation/core";


const CongratulationBottomCard = ({ toggleSheet }) => {
  const navigation = useNavigation();
  return (
    <View className="w-full  flex flex-col items-center justify-center px-4 py-10 rounded-xl -mt-2 bg-white">
      <View className="py-5 flex flex-col items-center jusfity-center ">
        <Image
          source={congratulation}
          className="  object-contain p-1"
        />
        <Text className="font-[outfit-medium] py-2 text-[20px]">
          Congratulation !
        </Text>
        <Text className="font-[outfit] text-[16px] text-gray-600 pb-4">
          You have successfully booked the space 
        </Text>
      </View>

      <View className="w-full space-y-4 flex flex-col justify-center items-center">
        <CustomButton
          text="Set Pickup Options"
          size={"95%"}
          height={45}
          bg={Colors.primary}
          onPress={toggleSheet}
        />
        <TouchableOpacity className="h-[45px] w-[320px] mt-5 mb-5 border-[1px] border-primary rounded-xl flex flex-row justify-center items-center space-x-2"
        onPress={()=> navigation.navigate("Nearme")}>
          <Text>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CongratulationBottomCard;
