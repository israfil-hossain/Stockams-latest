import { AntDesign, Ionicons, Octicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import BackHeader from "../../components/global/header/BackHeader";
import { favourite } from "../../../assets/images";
import FavouriteCard from "../../components/global/Card/FavouriteCard";

const FavouritePageScreen = () => {
  const [favorites, setFavorites] = useState([]);

  // Function to add an item to the favorites list
  const addToFavorites = (item) => {
    setFavorites([...favorites, item]);
  };

  // Function to remove an item from the favorites list
  const removeFromFavorites = (index) => {
    const newFavorites = [...favorites];
    newFavorites.splice(index, 1);
    setFavorites(newFavorites);
  };
  return (
    <View className="  w-[100%] h-[100%]">
      <BackHeader Headertext="Back to Profile" />
      <View className="flex-col justify-center items-center ">
        <ScrollView className="h-[94%] mb-20 px-4">
          <FavouriteCard />
          <FavouriteCard />
          <FavouriteCard />
          <FavouriteCard />
          <FavouriteCard />
          <FavouriteCard />
          <FavouriteCard />
          <FavouriteCard />
          <FavouriteCard />
          <FavouriteCard />
          <FavouriteCard />
          <FavouriteCard />
          <FavouriteCard />
          <FavouriteCard />
          <FavouriteCard />
          <FavouriteCard />
        </ScrollView>
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
