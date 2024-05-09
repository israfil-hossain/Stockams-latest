// Import necessary components and styles
import { View, Text } from "react-native";
import React from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import { useAuthUserContext } from "@/context/AuthUserProvider";
import { removeTokens } from "@/utils/localStorageUtils";

// Create your ExploreHeader component
const MainHeader = () => {
  const { userFound } = useAuthUserContext();
  const router = useRouter();

  // const handleUserLogout = async () => {
  //   console.log("Logout");
  //   await removeTokens();
  //   router.replace("/(main)/(auth)/login");
  // };
  return (
    <SafeAreaView style={{ flex: 0 }}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View style={styles.actionRow}>
          <Text className="font-[800] font-mono-b text-lg text-black">
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
                <TouchableOpacity>
                  <View className="relative ">
                    <Ionicons name="notifications-outline" size={20} />
                    <View className="w-3 h-3 bg-red-500 rounded-full absolute top-0 right-0 "></View>
                  </View>
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.Btn}>
              {userFound ? (
                <TouchableOpacity >
                  <Ionicons name="person" size={20} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity>
                  {/* <Link href="/(modals)/login"> */}
                  <AntDesign name="login" size={20} color="black" />
                  {/* </Link> */}
                </TouchableOpacity>
              )}
            </View>
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
    height: 42,
    paddingTop: 10,
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
    paddingBottom: 5,
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
  //   filterBtn: {
  //     width: 25,
  //     height: 25,
  //     padding: 2,
  //     justifyContent: "center",
  //     alignItems: "center",
  //     borderRadius: 24,
  //     backgroundColor: "#FFFFFF",
  //     shadowOffset: { width: 0, height: 4 },
  //     shadowOpacity: 0.1,
  //     shadowRadius: 20,
  //     // Android Elevation
  //     elevation: 2,
  //   },

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
