import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";

const CommonLayout = ({ children }: { children: any }) => {
  return <View style={styles.container}>{children}</View>;
};
const styles = StyleSheet.create({
  container: {
    height:"100%",
    width: Dimensions.get("window").width * 1,
    // height:Dimensions.get('window').height,
    padding: 5,
    backgroundColor:"#ffffff"
  },
});
export default CommonLayout;
