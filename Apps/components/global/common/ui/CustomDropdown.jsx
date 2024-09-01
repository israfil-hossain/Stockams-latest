import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../../constants/Colors";


const CustomDropDown = ({ label, placeholder, options, onValueChange, value, width, error, touched }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleSelect = (item) => {
    setIsVisible(false);
    onValueChange(item.value);
  };

  return (
    <View style={[styles.container, { width }]}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={[styles.inputContainer, error && touched ? styles.errorInput : null]}
        onPress={() => setIsVisible(true)}
      >
        <Text style={value ? styles.valueText : styles.placeholderText}>
          {value ? options.find(option => option.value === value)?.label : placeholder}
        </Text>
        <Ionicons name="chevron-down-outline" size={20} color={Colors.dark} />
      </TouchableOpacity>

      {error && touched && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      <Modal visible={isVisible} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setIsVisible(false)}>
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.optionItem} onPress={() => handleSelect(item)}>
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    color: Colors.dark,
    fontWeight: "600",
  },
  inputContainer: {
    height: 45,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.white,
  },
  placeholderText: {
    color: Colors.gray,
  },
  valueText: {
    color: Colors.dark,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingVertical: 10,
  },
  optionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  optionText: {
    color: Colors.dark,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  errorInput: {
    borderColor: "red",
  },
});

export default CustomDropDown;
