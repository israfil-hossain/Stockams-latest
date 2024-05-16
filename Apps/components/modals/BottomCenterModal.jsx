import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";

const PopUpBottomModal = ({ visible, onRequestClose, children }) => {
 
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    setIsModalVisible(visible);
  }, [visible]);

  const handleClose = () => {
    setIsModalVisible(false);
    onRequestClose(); // Call the optional callback if provided
  };
  return (
    <Modal
      animationType="slide" // Choose a suitable animation type (optional)
      transparent={true}
      visible={isModalVisible}
      onRequestClose={handleClose} // Handle closing requests when outside the modal is tapped
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity onPress={handleClose}>
          <AntDesign name="closecircle" size={32} color="red" />
        </TouchableOpacity>

        <View style={styles.modalContent}>{children}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent background
  },
  modalContent: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingBottom: 50, // Adjust this value as per your requirement to give space at the bottom
  },
});

export default PopUpBottomModal;
