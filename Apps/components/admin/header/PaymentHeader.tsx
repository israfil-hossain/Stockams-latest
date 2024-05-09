import { Alert, Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CustomButton from "@/components/global/ui/Button";
import Colors from "@/constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";

const PaymentHeader = ({tab,setTab}:{tab:any,setTab:any}) => {

  return (
    <View className="p-5">
      <Text className="text-[20px] font-medium">
        My Payment
      </Text>
    </View>
  );
};

export default PaymentHeader;
