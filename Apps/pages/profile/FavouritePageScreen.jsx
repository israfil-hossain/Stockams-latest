import { AntDesign, Ionicons, Octicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import BackHeader from "../../components/global/header/BackHeader";
import { favourite } from "../../../assets/images";
import FavouriteCard from "../../components/global/Card/FavouriteCard";
import { useGet } from "../../hooks";
import { API } from "../../../api/endpoints";
import Colors from "../../constants/Colors";
import { adminAPI } from "../../../api";
import { useToast } from "react-native-toast-notifications";

const FavouritePageScreen = () => {
  
  const {
    data: { data: allFavorites = {} } = {},
    isLoading: favoriteLoading,
    refetch,
  } = useGet({
    endpoint: API.GetAllFavorite,
  });

  console.log("Favorite : ", allFavorites);

  if (favoriteLoading) {
    return (
      <View className="flex flex-col justify-center items-center h-full ">
        <ActivityIndicator size={"large"} color={Colors.primary} />
      </View>
    );
  }

  return (
    <View className="  w-[100%] h-[100%]">
      <BackHeader Headertext="Back to Profile" />
      <View className="flex-col justify-center items-center w-[100%] mb-5 pr-3">
        <FlatList
          className="px-3 mb-10 "
          data={allFavorites?.data}
          key={allFavorites?.data?._id}
          renderItem={({ item }) => <FavouriteCard data={item} refetch={refetch}/>}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
});

export default FavouritePageScreen;
