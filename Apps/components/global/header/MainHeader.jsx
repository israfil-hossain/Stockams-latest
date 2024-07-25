// Import necessary components and styles
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";

import { useAuthUserContext } from "../../../context/AuthUserProvider";
import { profile } from "../../../../assets/images";
import PopUpBottomModal from "../../modals/BottomCenterModal";
import { useNavigation } from "@react-navigation/native";
import NotificationCard from "../Card/NotificationCard";
import ReviewComponent from "../../host_rental_panel/components/ReviewComponent";

// Create your ExploreHeader component
const MainHeader = () => {
  const { userFound } = useAuthUserContext();
  const { userData, userRefetch, userLoading, userRole } = useAuthUserContext();
  const router = useRouter();
  const navigation = useNavigation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);

  const handleProfilePage = () => {
    if (userRole === "RENTER") {
      navigation.navigate("ProfileHome");
    }
    else{
      navigation.navigate("ProfileOwner");
    }
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  const handleReviewOpenModal = async () => {
    await setIsModalVisible(false);
    await setIsReviewModalVisible(true);
  };
  const handleReviewCloseModal = async () => {
    await setIsReviewModalVisible(false);
    await setIsModalVisible(true);
  };

  // const handleUserLogout = async () => {
  //   console.log("Logout");
  //   await removeTokens();
  //   router.replace("/(main)/(auth)/login");
  // };
  return (
    <SafeAreaView style={{}} className="-mt-2">
      {/* <StatusBar style="dark" /> */}
      <View style={styles.container}>
        <View style={styles.actionRow}>
          <Text className=" font-[outfit-medium] text-2xl text-black">
            StockAms
          </Text>

          <View style={styles.rightHeader}>
            <View style={[styles.Btn, { marginRight: 10 }]}>
              <TouchableOpacity>
                <Ionicons name="language-outline" size={20} />
              </TouchableOpacity>
            </View>
            {userFound && (
              <View style={[styles.Btn, { marginRight: 10 }]}>
                <TouchableOpacity onPress={() => handleOpenModal()}>
                  <View className="relative ">
                    <Ionicons name="notifications-outline" size={20} />
                    <View className="w-3 h-3 bg-red-500 rounded-full absolute top-0 right-0 "></View>
                  </View>
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.Btn}>
              {userFound ? (
                <TouchableOpacity
                  onPress={() => handleProfilePage()}
                  className=" w-full h-full rounded-full"
                >
                  {userData?.profilePicture ? (
                    <Image
                      className="w-full h-full rounded-full"
                      source={{ uri: userData?.profilePicture }}
                      resizeMode="cover"
                    />
                  ) : (
                    <Image
                      className="w-full h-full   rounded-full"
                      source={profile}
                    />
                  )}
                </TouchableOpacity>
              ) : (
                <TouchableOpacity>
                  {/* <Link href="/(modals)/login"> */}
                  <AntDesign name="login" size={20} color="black" />
                  {/* </Link> */}
                </TouchableOpacity>
              )}
            </View>

            {isModalVisible && (
              <PopUpBottomModal
                visible={isModalVisible}
                onRequestClose={handleCloseModal}
              >
                <View className="bg-white mt-2 shadow-xl shadow-gray-800 w-[100%] flex-col justify-start  rounded-t-[20px] ">
                  <Text className="font-[outfit-medium] mt-5 text-[16px] ml-3">
                    {" "}
                    Notifications
                  </Text>
                  <ScrollView className="h-[360px]  px-4">
                    <NotificationCard
                      handleReviewOpenModal={handleReviewOpenModal}
                    />
                    <NotificationCard
                      handleReviewOpenModal={handleReviewOpenModal}
                    />
                    <NotificationCard
                      handleReviewOpenModal={handleReviewOpenModal}
                    />
                    <NotificationCard
                      handleReviewOpenModal={handleReviewOpenModal}
                    />
                    <NotificationCard
                      handleReviewOpenModal={handleReviewOpenModal}
                    />
                    <NotificationCard
                      handleReviewOpenModal={handleReviewOpenModal}
                    />
                    <NotificationCard />
                    <NotificationCard />
                    <NotificationCard />
                    <NotificationCard />
                    <NotificationCard />
                  </ScrollView>
                </View>
              </PopUpBottomModal>
            )}

            {isReviewModalVisible && (
              <PopUpBottomModal
                visible={isReviewModalVisible}
                onRequestClose={handleReviewCloseModal}
              >
                <View className="bg-white mt-2 shadow-xl shadow-gray-800 w-[100%] flex-col justify-start  rounded-t-[20px] ">
                  <Text className="font-[outfit-medium] mt-5 text-[16px] ml-3">
                    {" "}
                    Review
                  </Text>
                  <ReviewComponent />
                </View>
              </PopUpBottomModal>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Define your styles
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#ffffff",
    height: 60,
    paddingTop: 12,
    paddingBottom: 5,
  },
  rightHeader: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    padding: 2,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingBottom: 0,
  },
  Btn: {
    width: 30,
    height: 30,
    backgroundColor: "#FFFFFF",
    marginRight: 5,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    // Android Elevation
    elevation: 3,
  },

  categoryText: {
    fontSize: 14,
    fontFamily: "mon-sb",
    color: Colors.grey,
  },
  filterText: {
    color: "#FFFFFF", // Set the font color here
  },
});

// Export your component
export default MainHeader;
