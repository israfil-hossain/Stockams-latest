import React from "react";

import { View, Text, Image, Alert, TouchableOpacity } from "react-native";
import { Stack } from "expo-router";

import { AntDesign } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { removeTokens } from "../utils/localStorageUtils";
import { ScrollView } from "react-native";
import { next, profile } from "../../assets/images";
import Colors from "../constants/Colors";
import { useToast } from "react-native-toast-notifications";
import { useAuthUserContext } from "../context/AuthUserProvider";
import { adminQueryClient } from "../../api";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const { userData, userRefetch, userLoading } = useAuthUserContext();

  const handleUserLogout = async () => {
    await removeTokens();
    await adminQueryClient.resetQueries();
    toast.show("Signout Successfully ! 👋", { type: "success" });
    // navigation.navigate("Login");
  };
  return (
    <>
      <View className="flex flex-row px-4 h-28 bg-slate-100 w-[100%] py-3 rounded-3xl mx-2  justify-between items-center">
        <View className="flex-row justify-center items-center space-x-2 w-[80%]">
          {userData?.profilePicture ? (
            <Image
              className="w-24 h-20 rounded-lg "
              source={{ uri: userData?.profilePicture }}
              resizeMode="cover"
            />
          ) : (
            <Image
              className="w-24 h-20 rounded-lg "
              source={profile}
              resizeMode="cover"
            />
          )}
          <View className="w-[66%]">
            <Text className="font-[outfit-bold] text-md  uppercase text-violet-800">
              Hello!
            </Text>
            <Text className="font-[outfit-medium] text-lg  uppercase text-purple-800">
              {userData?.fullName}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => handleUserLogout()}
          className="mb-5 px-5"
          activeOpacity={0.7}
        >
          <AntDesign name="logout" size={30} color={Colors.black} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View className="flex flex-col px-5  justify-center items-center py-5 space-y-5">
          <TouchableOpacity
            onPress={() => navigation.navigate("profileInfo")}
            activeOpacity={0.8}
            className="w-[330px] bg-white shadow-md shadow-black rounded-xl px-5 py-4 flex flex-row justify-between"
          >
            <Text className="text-[16px] font-medium">Profile Information</Text>
            <Image className="w-[22px] h-[22px] ml-2" source={next} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("changePassword")}
            activeOpacity={0.8}
            className="w-[330px] bg-white shadow-md shadow-black rounded-xl px-5 py-4 flex flex-row justify-between"
          >
            <Text className="text-[16px] font-medium">Change Password</Text>
            <Image className="w-[22px] h-[22px] ml-2" source={next} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("favourite")}
            activeOpacity={0.8}
            className="w-[330px] bg-white shadow-md shadow-black rounded-xl px-5 py-4 flex flex-row justify-between"
          >
            <Text className="text-[16px] font-medium">Favourite</Text>
            <Image className="w-[22px] h-[22px] ml-2" source={next} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("manage-payment")}
            activeOpacity={0.8}
            className="w-[330px] bg-white shadow-md shadow-black rounded-xl px-5 py-4 flex flex-row justify-between"
          >
            <Text className="text-[16px] font-medium">Manage Payment</Text>
            <Image className="w-[22px] h-[22px] ml-2" source={next} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("terms-condition")}
            activeOpacity={0.8}
            className="w-[330px] bg-white shadow-md shadow-black rounded-xl px-5 py-4 flex flex-row justify-between"
          >
            <Text className="text-[16px] font-medium">Terms And Condition</Text>
            <Image className="w-[22px] h-[22px] ml-2" source={next} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("privacy-policy")}
            activeOpacity={0.8}
            className="w-[330px] bg-white shadow-md shadow-black rounded-xl px-5 py-4 flex flex-row justify-between"
          >
            <Text className="text-[16px] font-medium">Privacy Policy</Text>
            <Image className="w-[22px] h-[22px] ml-2" source={next} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default ProfileScreen;
