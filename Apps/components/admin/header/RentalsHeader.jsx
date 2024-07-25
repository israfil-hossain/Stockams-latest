import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import CustomButton from "../../global/common/ui/Button";

const RentalsHeader = ({ tab, setTab }) => {
  return (
    <View style={styles.container}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <View className="flex flex-row ">
          <TouchableOpacity
            onPress={() => {
              setTab("all");
            }}
          >
            <View
              className={` ${
                tab === "all" ? "bg-tertiary" : "bg-white"
              } border-l border-t border-b rounded-l-md px-2 py-3 border-gray-300 `}
            >
              <Text>All Spaces</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setTab("booked");
            }}
          >
            <View
              className={` ${
                tab === "booked" ? "bg-tertiary" : "bg-white"
              } border-r border-t border-b rounded-r-md px-2 py-3 border-gray-300 `}
            >
              <Text>Booked Spaces</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <CustomButton
        text="Map View"
        size={90}
        bg={Colors.primary}
        onPress={() => Alert.alert("Reject")}
      />
    </View>
  );
};

export default RentalsHeader;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width * 0.97,
    //height:Dimensions.get('window').height,
    paddingTop: 5,
    paddingRight: 5,
    margin: 8,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
