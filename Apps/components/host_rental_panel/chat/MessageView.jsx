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
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useGet } from "../../../hooks";
import { API } from "../../../../api/endpoints";
import Colors from "../../../constants/Colors";
import usePost from "../../../hooks/useCreate";
import { profile } from "../../../../assets/images";
import { formatDateandTime } from "../../../utils/commonFunction";
import CommonLoader from "../../global/progress/CommonLoader";

const SingleMessageView = ({ setIsMessageOpen, id }) => {
  console.log("id: ", id);
  const { width, height } = Dimensions.get("window");

  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const GetMsg = API.GetAllMessage + id + "?Page=1&PageSize=500";
  const {
    data: { data: allmessage = {} } = {},
    isLoading: allmessageLoading,
    refetch,
  } = useGet({
    endpoint: GetMsg,
  });

  const { mutateAsync: createmutate, isLoading: createLoading } = usePost({
    isMultiPart: false,
    endpoint: API.AddMessage + id,
  });

  console.log("Allmessage : ", allmessage);

  useEffect(() => {
    refetch();
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

  const handleSubmit = async () => {
    try {
      if (!text) {
        return;
      }

      // Create a new message object
      const payload = {
        message: text,
      };
      const res = await createmutate(payload);
      if (res) {
        refetch();
        setText("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SafeAreaView
      className=" "
      style={{ width: width - width * 0.1, height: height - height * 0.2 }}
    >
      <View className=" px-4 w-[100%] bg-white flex flex-row justify-start items-center mt-[10px] self-center rounded-xl h-[50px] shadow-xl shadow-slate-500">
        <TouchableOpacity
          className="w-9 h-9 items-center justify-center flex flex-row bg-[#faf8f8] rounded-full border border-[#dcdbdb]"
          onPress={() => setIsMessageOpen(false)}
        >
          <Ionicons name="arrow-back" size={24} color="#ccb" />
        </TouchableOpacity>
        <View className="flex flex-row justify-start space-x-2 items-center left-[90px]">
          <Image className="h-[32px] w-[32px] rounded-3xl" source={profile} />
          <Text className="font-medium text-[14px]">{"Hello"}</Text>
        </View>
      </View>
      <View style={{ padding: 16 }}>
        {allmessageLoading ? (
          <CommonLoader />
        ) : (
          <ScrollView className="mb-0 max-h-[85%]">
            {allmessage?.data
              ?.sort((a, b) => new Date(a.sendTime) - new Date(b.sendTime)) // Sort messages in ascending order by sendTime
              .map((item, id) => (
                <View key={id}>
                  {item?.sender?.role !== "ADMIN" && (
                    <View style={styles.adminMessageContainer}>
                      <View style={styles.adminMessageBox}>
                        <Text style={styles.messageText}>{item?.message}</Text>
                        <Text style={styles.timeText}>
                          {formatDateandTime(item?.sendTime)}
                        </Text>
                      </View>
                    </View>
                  )}
                  {item?.sender?.role === "ADMIN" && (
                    <View style={styles.userMessageContainer}>
                      <Image
                        source={item?.sender?.profilePicture || profile}
                        style={styles.profileImage}
                      />
                      <View style={styles.userMessageBox}>
                        <Text style={styles.messageText}>{item?.message}</Text>
                        <Text style={styles.timeText}>
                          {formatDateandTime(item?.sendTime)}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              ))}
          </ScrollView>
        )}

        <View
          style={{ width: width - width * 0.1, height: "50px" }}
          className="flex flex-row justify-start items-center space-x-2"
        >
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
          {createLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <TouchableOpacity
              className="rounded-3xl shadow-xl shadow-slate-500 h-[55px] w-[55px] bg-white items-center justify-center "
              onPress={() => handleSubmit()}
              disabled={text.length === 0 || createLoading}
            >
              <Feather name="send" size={24} color={Colors.primary} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  userMessageContainer: {
    flexDirection: "row",
    gap: 10,
    paddingVertical: 10,
  },
  profileImage: {
    width: 25,
    height: 25,
    borderRadius: 24,
    backgroundColor: "#F87171",
  },
  userMessageBox: {
    backgroundColor: "#475569",
    padding: 16,
    borderRadius: 10,
    width: "75%",
  },
  messageText: {
    fontSize: 14,
    color: "white",
  },
  timeText: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 10,
  },
  adminMessageContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingVertical: 10,
  },
  adminMessageBox: {
    backgroundColor: "#475569",
    padding: 16,
    borderRadius: 10,
    width: "75%",
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
