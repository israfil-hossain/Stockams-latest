import React, { useState, useEffect } from "react";
import { Text, View, FlatList, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../../../../constants/Colors";
import CustomButton from "../../../../global/common/ui/Button";

const AddImages = ({ onSubmit, prevStep, data, setFormData }) => {
  const [isError, setIsError] = useState(false);
  const [msgError, setMsgError] = useState("");

  useEffect(() => {
    if (data?.spaceImages?.length <= 0) {
      setIsError(true);
      setMsgError("* You must select at least one space image");
    } else if (data?.spaceImages?.length > 5) {
      setIsError(true);
      setMsgError("* Maximum number of spaceImages is reached. You can select a maximum of 5 images.");
    } else {
      setIsError(false);
      setMsgError("");
    }
  }, [data?.spaceImages]);

  const handleSubmit = async () => {
    if (data?.spaceImages?.length <= 0) {
      setIsError(true);
      setMsgError("* You must select at least one space image");
    } else {
      onSubmit();
    }
  };

  const pickImage = async () => {
    if (data?.spaceImages?.length === 5) {
      Alert.alert("Limit reached", "You can only add up to 5 images.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [5, 6],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = { url: result?.assets[0]?.uri, _id: Date.now().toString() };

      setFormData((prevFormData) => ({
        ...prevFormData,
        spaceImages: [...prevFormData.spaceImages, uri],
      }));
    }
  };

  const removeImage = (id) => {
    const updatedSpaceImages = data?.spaceImages.filter((image) => image._id !== id);
    setFormData((prevFormData) => ({
      ...prevFormData,
      spaceImages: updatedSpaceImages,
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.imagePickerContainer}>
        {isError && (
          <Text style={styles.errorText}>{msgError}</Text>
        )}
        <TouchableOpacity onPress={pickImage}>
          <View style={styles.pickButton}>
            <Text style={styles.pickButtonText}>Select File from</Text>
            <Ionicons name="cloud-upload-outline" size={24} color="black" />
          </View>
        </TouchableOpacity>

        <FlatList
          data={data?.spaceImages}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: item.url }}
                style={styles.image}
                resizeMode="cover"
              />
              <TouchableOpacity
                onPress={() => removeImage(item._id)}
                style={styles.removeButton}
              >
                <Ionicons name="close" size={24} color="white" />
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
          horizontal={false}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          bg={Colors.primary}
          size={120}
          text={"Prev"}
          height={40}
          onPress={prevStep}
          showIcon={true}
          icon={"arrow-back-circle-sharp"}
        />
        <CustomButton
          bg={Colors.primary}
          size={120}
          text={"Next"}
          height={40}
          onPress={handleSubmit}
          disabled={isError}
          rightIcon={true}
          icon={"arrow-forward-circle-sharp"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    width: '100%',
    height: "92%"
  },
  imagePickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '84%',
    width: '100%',
  },
  errorText: {
    paddingVertical: 8,
    color: 'red',
    fontSize: 16,
    fontWeight: '500',
  },
  pickButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 300,
    borderRadius: 10,
    borderColor: Colors.primary,
    borderWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'yellow',
  },
  pickButtonText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
  },
  imageContainer: {
    marginVertical: 8,
    width: '100%',
    paddingHorizontal: 8,
    position: 'relative',
  },
  image: {
    width: 300,
    height: 250,
    borderRadius: 10,
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
    borderWidth: 2,
    borderColor: 'white',
    paddingHorizontal: 8,
    borderRadius: 10,
    paddingVertical: 4,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});

export default AddImages;
