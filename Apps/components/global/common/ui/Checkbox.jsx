import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Checkbox } from "expo-checkbox"; // Import Checkbox from expo-checkbox


import Colors from "../../../../constants/Colors";

const CommonCheckBox = ({
  index,
  values,
  handleCheckedChange,
  items,
  label,
}) => {
  return (
    <TouchableOpacity
      key={index}
      className="border rounded-lg p-1 py-2 border-gray-200 items-center flex flex-row "
    >
      <Checkbox
        value={values?.includes(items?.value)}
        onValueChange={() => handleCheckedChange(items?.value)}
        className="rounded-md w-5 h-5 mr-1 ml-1"
        color={
          values && values.includes(items?.value) ? Colors.primary : Colors.grey
        }
      />
      <Text className="text-md font-[700] text-gray-600 px-2">{label}</Text>
    </TouchableOpacity>
  );
};

export default CommonCheckBox;
