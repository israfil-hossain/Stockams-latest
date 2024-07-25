import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity,Animated } from "react-native";

const PopUpBottomModal = ({ visible, onRequestClose, children }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fadeAnim = useRef( new Animated.Value(0).current); 

  const slideUp = () => {
    Animated.timing(slideUp, {
      toValue: 1, 
      duration: 1500, 
      usenativeDriver : true, 
    }).start();
  }

  const slideDown = () => {
    Animated.timing(slideDown, {
      toValue: 0, 
      duration: 3000, 
      useNativeDriver: true, 
    }).start();
  }
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
          <AntDesign name="closecircle" size={40} color="red" />
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
