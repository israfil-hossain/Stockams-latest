// TextInput, Datepicker, email, password. ...

import React, {  useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import {
  TextInput as RNTextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import Checkbox from "expo-checkbox";
import Location from "./Location";
// import PopUpModal from "@/app/(main)/(home)/(modals)/PopUpModal";

const CustomInput = ({
  label,
  icon,
  name,
  rules,
  defaultValue,
  options,
  onChangeText,
  placeholder,
  touched,
  error,
  value,
  type,
  date,
  setDate,
  isEditable,
  mode = "date",
  height = 48,
  keyboardType,
  setFieldValue,
  width = "100%",
  values,
  isDropdownChangeAnotherField = false,
  border,
  ...inputProps
}) => {
 
  const validationColor = !touched ? "#223e4b" : error ? "#FF5A5F" : "#223e4b";
  const [show, setShow] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [address, setAddress] = useState("");

  const handleChangeText = (text) => {
    onChangeText?.(text);
  };
  const onChange = (event, selectedDate) => {
    setShow(false);
    const currentDate = selectedDate.toLocaleDateString("en-GB");
    onChangeText?.(currentDate);
  };

  const onLocationChange = (text) => {
    setIsModalVisible(false);
    onChangeText?.(address ? address : text);
  };

  const handleChangeDropdown = (itemValue) => {
    if (isDropdownChangeAnotherField) {
      const selectedOption = options?.find((item) => item?.value === itemValue);

      if (selectedOption) {
        setFieldValue(
          "showpricePerMonth",
          convertNumber(selectedOption?.pricePerMonth)
        );
      }
    }
    onChangeText?.(itemValue);
  };

  const showDatePicker = () => {
    setShow(true);
  };
  const togglePasswordVisibility = () => {
    inputProps.setShowPassword((prevState) => !prevState);
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View
      style={{
        padding: 4,
        width: width,
      }}
    >
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          height: height,
          borderRadius: 8,
          borderColor: validationColor,
          borderWidth: border ? border : StyleSheet.hairlineWidth,
          padding: 8,
          marginTop: 5,
          marginBottom: 5,
          backgroundColor: Colors.gray2,
        }}
      >
        <View style={{ padding: 8 }}>
          {type === "dropdown" ? (
            <MaterialCommunityIcons
              name={icon}
              color={validationColor}
              size={16}
            />
          ) : (
            <Ionicons name={icon} color={validationColor} size={16} />
          )}
        </View>
        <View style={{ flex: 1 }}>
          {type === "text" && (
            <RNTextInput
              underlineColorAndroid="transparent"
              placeholderTextColor="rgba(34, 62, 75, 0.7)"
              placeholder={placeholder}
             
              value={value}
              onChangeText={handleChangeText}
              editable={isEditable}
              {...inputProps}
            />
          )}

          {type === "number" && (
            <RNTextInput
              underlineColorAndroid="transparent"
              placeholderTextColor="rgba(34, 62, 75, 0.7)"
              autoCapitalize="none"
              keyboardAppearance="dark"
              returnKeyType="go"
              returnKeyLabel="go"
              placeholder={placeholder}
            
              value={value}
              onChangeText={handleChangeText}
              keyboardType="numeric"
            />
          )}

          {type === "richtext" && (
            <RNTextInput
              underlineColorAndroid="transparent"
              placeholderTextColor="rgba(34, 62, 75, 0.7)"
              placeholder={placeholder}
             
              value={value}
              onChangeText={handleChangeText}
              multiline={true}
              numberOfLines={10}
              style={{ height: 50, textAlignVertical: "top" }}
              {...inputProps}
            />
          )}

          {type === "date" && (
            <View className="flex flex-row justify-between ">
              <RNTextInput
                underlineColorAndroid="transparent"
                placeholderTextColor="rgba(34, 62, 75, 0.7)"
                placeholder={placeholder}
               
                value={value}
                onChangeText={handleChangeText}
                editable={isEditable}
                {...inputProps}
              />
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  mode={mode}
                  onChange={onChange}
                  value={new Date()}
                  is24Hour={true}
                />
              )}
              <TouchableOpacity disabled={!isEditable} onPress={showDatePicker}>
                <Ionicons name="calendar" color={validationColor} size={23} />
              </TouchableOpacity>
            </View>
          )}

          {type === "dropdown" && (
            <Picker
              selectedValue={value}
              onValueChange={handleChangeDropdown}
              style={{ height: 50, width: "100%" }}
              className="text-md font-medium"
            >
              <Picker.Item label={placeholder} value={values} />
              {options?.map((item, index) => (
                <Picker.Item
                  key={index}
                  label={item?.name || item?.label}
                  value={item?.name || item?.value}
                />
              ))}
            </Picker>
          )}

          {type === "checkbox" && (
            <View>
              <Checkbox />
            </View>
          )}

          {type === "location" && (
            <View className="flex flex-row justify-between ">
              <RNTextInput
                underlineColorAndroid="transparent"
                placeholderTextColor="rgba(34, 62, 75, 0.7)"
                placeholder={placeholder}
               
                value={value}
                onChangeText={onLocationChange}
                editable={isEditable}
                {...inputProps}
                className="w-[90%] text-start  text-[14px]  font-medium"
              />

              <TouchableOpacity onPress={handleOpenModal} className="w-6">
                <Ionicons name="location" color={validationColor} size={23} />
              </TouchableOpacity>
              {isModalVisible && (
                <PopUpModal
                  visible={isModalVisible}
                  onRequestClose={handleCloseModal}
                >
                  <View
                    className="w-[320px] pt-4 shadow-lg rounded-xl bg-gray-200"
                    style={{ height: "92%" }}
                  >
                    <Location
                      values={value} // Adjust based on your data structure
                      onLocationChange={onLocationChange}
                    />
                  </View>
                </PopUpModal>
              )}
            </View>
          )}
        </View>
        {inputProps.passwordIcon && (
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Ionicons
              name={inputProps.secureTextEntry ? "eye-off" : "eye"}
              color={validationColor}
              size={20}
            />
          </TouchableOpacity>
        )}

        <View className="flex flex-row space-x-1">
          {inputProps.rightIcon && (
            <Ionicons
              name={inputProps?.rightIcon}
              color={validationColor}
              size={20}
            />
          )}
          {inputProps.rightText && <Text>{inputProps.rightText}</Text>}
        </View>
      </View>
      {touched && error && (
        <Text style={{ color: "red", marginLeft: 10 }}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: "#2D2D2A",
    marginLeft: 10,
    marginTop: 5,
    fontWeight: "500",
  },
  input: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: "#E7E9E2",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
  },
  inputError: {
    borderColor: "red", // Set border color to red for error state
    borderWidth: 1,
  },
  dropdown: {
    backgroundColor: "#E7E9E2",
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
  },
});

export default CustomInput;
