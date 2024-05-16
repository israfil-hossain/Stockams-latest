import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { favourite } from "../../../../assets/images";
import CustomButton from "../common/ui/Button";
import Colors from "../../../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import PopUpBottomModal from "../../modals/BottomCenterModal";
import CustomInput from "../common/CommonInput";
import { Formik } from "formik";
import { ReviewValidationSchema } from "../../../validation/review/reviewValidation";

const NotificationCard = ({ handleReviewOpenModal }) => {
  const navigation = useNavigation();
 


  return (
    <View className={`w-[320px] mt-5 shadow-lg shadow-gray-40 `}>
      <View className="flex-row justify-between items-center w-[100%]  ">
        <Image className="h-[25px] rounded-full w-[25px]" source={favourite} />
        <View className="w-[65%]">
          <Text>
            Your order is completed.Write a review for the room and express your
            thoughts on it.
          </Text>
          <View className="mt-2">
            <CustomButton
              text="Review"
              size={90}
              height={30}
              rounded={6}
              bg={Colors.primary}
              onPress={() => handleReviewOpenModal()}
            />
          </View>
        </View>
        <Image className="h-[55px] rounded-xl w-[18%]" source={favourite} />
      </View>
      <View className="h-[2px] w-[100%] bg-gray-200 mt-5"></View>


    </View>
  );
};

export default NotificationCard;
