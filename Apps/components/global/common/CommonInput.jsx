import React, { useState } from "react";
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
import PopUpModal from "../../modals/PopUpModal";
import { convertNumber } from "../../../utils/commonFunction";

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
  type = "text",
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
    if (type === "number") {
      onChangeText?.(text.replace(/[^0-9]/g, ""));
    } else {
      onChangeText?.(text);
    }
  };

  const onChange = (event, selectedDate) => {
    setShow(false);
    onChangeText?.(selectedDate.toLocaleDateString("en-GB"));
  };

  const onLocationChange = (text) => {
    setIsModalVisible(false);
    onChangeText?.(address || text);
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

  const showDatePicker = () => setShow(true);
  const togglePasswordVisibility = () =>
    inputProps.setShowPassword((prev) => !prev);
  const handleOpenModal = () => setIsModalVisible(true);
  const handleCloseModal = () => setIsModalVisible(false);

  const renderInputField = () => {
    switch (type) {
      case "number":
        return (
          <RNTextInput
            {...inputProps}
            underlineColorAndroid="transparent"
            placeholderTextColor="rgba(34, 62, 75, 0.7)"
            placeholder={placeholder}
            value={value}
            onChangeText={handleChangeText}
            editable={isEditable}
            keyboardType="numeric"
            maxLength={10}
          />
        );
      case "richtext":
        return (
          <RNTextInput
            {...inputProps}
            underlineColorAndroid="transparent"
            placeholderTextColor="rgba(34, 62, 75, 0.7)"
            placeholder={placeholder}
            value={value}
            onChangeText={handleChangeText}
            editable={isEditable}
            multiline
            numberOfLines={15}
            style={{ height: 100, textAlignVertical: "top", marginTop: 10 }}
          />
        );
      case "date":
        return (
          <View style={styles.flexRow} className="px-2 mr-3">
            <RNTextInput
              {...inputProps}
              underlineColorAndroid="transparent"
              placeholderTextColor="rgba(34, 62, 75, 0.7)"
              placeholder={placeholder}
              value={value}
              onChangeText={handleChangeText}
              editable={isEditable}
            />
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                mode={mode}
                onChange={onChange}
                value={new Date()}
                is24Hour
              />
            )}
            <TouchableOpacity disabled={!isEditable} onPress={showDatePicker}>
              <Ionicons name="calendar" color={validationColor} size={22} />
            </TouchableOpacity>
          </View>
        );
      case "dropdown":
        return (
          <Picker
            selectedValue={value}
            onValueChange={handleChangeDropdown}
            style={{ height: 50, width: "100%" }}
          >
            {options?.map((item, index) => (
              <Picker.Item
                key={index}
                label={item?.name || item?.label}
                value={item?.name || item?.value}
              />
            ))}
          </Picker>
        );
      case "checkbox":
        return <Checkbox value={value} onValueChange={onChangeText} />;
      case "location":
        return (
          <View style={styles.flexRow}>
            <RNTextInput
              {...inputProps}
              underlineColorAndroid="transparent"
              placeholderTextColor="rgba(34, 62, 75, 0.7)"
              placeholder={placeholder}
              value={value}
              onChangeText={onLocationChange}
              editable={isEditable}
              style={{
                width: "90%",
                textAlign: "start",
                fontSize: 14,
                fontWeight: "500",
              }}
            />
            <TouchableOpacity onPress={handleOpenModal}>
              <Ionicons name="location" color={validationColor} size={23} />
            </TouchableOpacity>
            {isModalVisible && (
              <PopUpModal
                visible={isModalVisible}
                onRequestClose={handleCloseModal}
              >
                <View style={styles.modalContent}>
                  <Location
                    values={value}
                    onLocationChange={onLocationChange}
                  />
                </View>
              </PopUpModal>
            )}
          </View>
        );
      default:
        return (
          <RNTextInput
            {...inputProps}
            underlineColorAndroid="transparent"
            placeholderTextColor="rgba(34, 62, 75, 0.7)"
            placeholder={placeholder}
            value={value}
            onChangeText={handleChangeText}
            editable={isEditable}
          />
        );
    }
  };

  return (
    <View style={{ padding: 4, width: width }}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          {
            height: height,
            borderColor: validationColor,
            borderWidth: border || StyleSheet.hairlineWidth,
          },
        ]}
      >
        <View className="py-2">
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
        <View style={{ flex: 1 }}>{renderInputField()}</View>
        {inputProps.passwordIcon && (
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Ionicons
              name={inputProps.secureTextEntry ? "eye-off" : "eye"}
              color={validationColor}
              size={20}
            />
          </TouchableOpacity>
        )}
        {inputProps.rightIcon && (
          <Ionicons
            name={inputProps.rightIcon}
            color={validationColor}
            size={20}
          />
        )}
        {inputProps.rightText && <Text>{inputProps.rightText}</Text>}
      </View>
      {touched && error && <Text style={styles.errorText}>{error}</Text>}
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingRight: 5,
    paddingLeft: 5,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "#E7E9E2",
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalContent: {
    width: 320,
    paddingTop: 16,
    borderRadius: 12,
    backgroundColor: "#E7E9E2",
    height: "92%",
  },
  errorText: {
    color: "red",
    marginLeft: 10,
  },
});

export default CustomInput;
