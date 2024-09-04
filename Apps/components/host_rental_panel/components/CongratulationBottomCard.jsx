import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "../../../constants/Colors";
import CustomButton from "../../global/common/ui/Button";
import { congratulation } from "../../../../assets/images";

const CongratulationBottomCard = ({ toggleSheet }) => {
  return (
    <View className="w-full  flex flex-col items-center justify-center px-4 mb-20 mt-5">
      <Image
        source={congratulation}
        className="w-20 h-20 rounded-full object-cover p-2"
      />
      <View className="w-full space-y-4">
        <CustomButton
          text="Book Now"
          size={"100%"}
          height={45}
          bg={Colors.primary}
          onPress={toggleSheet}
        />
        <TouchableOpacity className="h-[45px] w-[320px] mt-5 mb-5 border-[1px] border-primary rounded-xl flex flex-row justify-center items-center space-x-2">
          <Text>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CongratulationBottomCard;
