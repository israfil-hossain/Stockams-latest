import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";


import { looper, logo } from "../../assets/images";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.backgroundImageContainer}>
        <Image source={looper} style={styles.backgroundImage} />
      </View>
      <View className="flex justify-center items-center mt-16 w-full">
        <Image
          source={logo}
          className="w-60 h-20 object-contain"
          style={styles.logo}
        />
      </View>

      <ScrollView style={styles.scrollView}>
        <View className=" w-full items-center flex-col h-80 justify-start mt-10">
          <Text className="font-[outfit-bold] text-[26px] mb-5">
            Welcome To Stockams
          </Text>
          <TouchableOpacity
            onPress={() => NavigationPreloadManager.navigate("login")}
          >
            <View className="w-80 rounded-lg border mt-5 p-2 bg-white ">
              <Text className="text-center text-black font-[outfit-bold] text-[20px]">
                Login
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => NavigationPreloadManager.navigate("login")}
          >
            <View className="w-80 rounded-lg border mt-5 p-2 bg-white ">
              <Text className="text-center text-black font-[outfit-bold] text-[20px]">
                SignUp
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBFAE6",
    position: "relative",
  },
  backgroundImageContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  logo: {
    marginTop: 5,
    alignItems: "center",
    resizeMode: "contain",
  },
  scrollView: {
    backgroundColor: "#DCE102",
    padding: 10,
    marginTop: 190,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});

export default SplashScreen;
