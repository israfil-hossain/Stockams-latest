import React from "react";
import { StyleSheet, View } from "react-native";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";

const SpaceInfoSkeleton = () => {
  return (
    <MotiView
      transition={{
        type: "timing",
      }}
      style={[styles.container, styles.padded]}
      animate={{ backgroundColor: "#FFFFFA" }}
    >
      {/* <Skeleton radius="round" colorMode={'light'} height={75} width={75} /> */}
      <Spacer />
      <Skeleton  colorMode={'light'} width={"100%"} height={55} />
      <Spacer height={25} />
      <Skeleton  colorMode={'light'} width={"100%"} height={55}/>
      <Spacer height={35} />
      <Skeleton  colorMode={'light'} width={"100%"} height={250}/>
      
    </MotiView>
  );
};

export default SpaceInfoSkeleton;

const Spacer = ({height= 20}) => <View style={{ height }} />;

const styles = StyleSheet.create({
  shape: {
    justifyContent: "center",
    height: 250,
    width: 250,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: "white",
  },
  container: {
    justifyContent: "center",
    marginTop: 0,
  },
  padded: {
    padding: 16,
  },
});
