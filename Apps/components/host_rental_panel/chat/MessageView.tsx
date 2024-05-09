import { Feather, Ionicons } from "@expo/vector-icons";
import React, { Component, useEffect, useState } from "react";
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ListRenderItem,
  TextInput,
  Modal,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Colors from "@/constants/Colors";

interface Message {
  id: number;
  text: string;
  image: any;
  originalWidth: any;
  originalHeight: any;
}
interface SelectedImage {
  uri: string;
}

const SingleMessageView = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [text, setText] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access media library denied");
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const sendMessage = async () => {
    if (!text && !image) {
      // Don't send an empty message
      return;
    }

    let originalWidth = 0;
    let originalHeight = 0;

    if (image) {
      // If an image is selected, get its original dimensions
      try {
        const { width, height } = await getImageDimensions(image);
        originalWidth = width;
        originalHeight = height;
      } catch (error) {
        console.error("Error getting image dimensions:", error);
        // Handle the error as needed
      }
    }

    // Create a new message object
    const newMessage: Message = {
      id: messages.length + 1,
      text,
      image,
      originalWidth,
      originalHeight,
    };

    // Update the messages state using the functional form
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // Reset text and image after sending
    setText("");
    setImage(null);
  };

  const getImageDimensions = async (imageUri: string) => {
    const { width, height } = await ImageManipulator.manipulateAsync(
      imageUri,
      [],
      {
        // You can adjust the format as needed
        base64: false, // Set to true if you also want the base64 representation
      }
    );

    return { width, height };
  };

  const handleImageClick = (imageUri: string) => {
    setSelectedImage(imageUri);
    setModalVisible(true);
  };

  const renderMessageItem = ({ item }: { item: Message }) => {
    return (
      <TouchableOpacity onPress={() => handleImageClick(item.image)}>
        <View style={styles.messageContainer}>
          <View style={styles.messageContent}>
            <Text style={styles.messageText}>{item.text}</Text>
            {item.image && (
              <Image source={{ uri: item.image }} style={styles.messageImage} />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="w-full h-full bg-white">
      <View className="flex flex-row justify-start items-center mt-[10px] self-center rounded-xl bg-[#ffffff] w-[360px] h-[50px] shadow-xl shadow-slate-500">
        <TouchableOpacity className="ml-2 " onPress={() => router.back()}>
          <Ionicons
            name="ios-arrow-back-circle-outline"
            size={30}
            color="#ABB0B6"
          />
        </TouchableOpacity>
        <View className="flex flex-row justify-start space-x-2 items-center left-[90px]">
          {/* <Image
            className="h-[32px] w-[32px] rounded-3xl"
            source={{ uri: params.image }}
          /> */}
          <Text className="font-medium text-[14px]">{params.name}</Text>
        </View>
      </View>
      <View style={{ flex: 1, padding: 16 }}>
        <FlatList
          data={messages}
          renderItem={renderMessageItem}
          keyExtractor={(item, index) => index.toString()}
          inverted
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
            setSelectedImage(null);
          }}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              className="self-end "
              onPress={() => {
                setModalVisible(false);
                setSelectedImage(null);
              }}
            >
              <Ionicons name="close" size={24} color={Colors.primary} />
            </TouchableOpacity>
            <View style={styles.modalContent}>
              {selectedImage && (
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.modalImage}
                />
              )}
            </View>
          </View>
        </Modal>
        <View className="flex flex-row justify-between space-x-2  items-center self-center ml-3 mr-3">
          <TouchableOpacity
            className="rounded-3xl shadow-xl shadow-slate-500 h-[55px] w-[55px] bg-white items-center justify-center"
            onPress={pickImage}
          >
            {image && <Image source={{ uri: image }} />}

            <Ionicons name="image-outline" size={24} color={Colors.primary} />
          </TouchableOpacity>
          <View className="h-[60px] bg-white w-[250px] rounded-2xl shadow-xl shadow-slate-500">
            <TextInput
              className="text-[15px] p-4 font-normal text-[#727272]"
              value={text}
              onChangeText={(newText) => setText(newText)}
              placeholder="Type your massage"
              placeholderTextColor="#ABB0B6"
              allowFontScaling={true}
            />
          </View>
          <TouchableOpacity
            className="rounded-3xl shadow-xl shadow-slate-500 h-[55px] w-[55px] bg-white items-center justify-center "
            onPress={sendMessage}
          >
            <Feather name="send" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
  messageContainer: {
    marginBottom: 10,
    alignItems: "flex-start",
  },
  messageContent: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#E6E6E6",
    maxWidth: 250,
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
    color: "#000",
  },
  messageImage: {
    width: 200,
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 0,
    alignItems: "center",
  },
  modalImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
});

//make this component available to the app
export default SingleMessageView;
