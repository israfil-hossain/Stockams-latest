import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const Banner = ({ spaceRentData }) => {
  const [activeImage, setActiveImage] = useState(0);
  const handleImageClick = (index) => {
    setActiveImage(index);
  };
  return (
    <View>
      <Image
        source={{
          uri: spaceRentData?.data?.spaceImages[activeImage]?.url,
        }}
        style={styles.banner}
      />
      <TouchableOpacity className="w-[100px] h-[37px] px-2 left-5 top-5 absolute bg-tertiary rounded-xl justify-around flex flex-row items-center">
        <Ionicons
          name="person-circle-sharp"
          size={24}
          color="black"
          className="items-center"
        />
        <Text className="text-sm font-medium ">Certified</Text>
      </TouchableOpacity>
      <TouchableOpacity className="w-32 h-[37px] p-2 right-5 top-5 absolute bg-white rounded-lg justify-between flex flex-row items-center">
        <AntDesign name="staro" size={18} color="orange" />
        <Text className="text-md font-medium">4.8</Text>
        <Text className="text-[10px] text-gray-400">345 reviews</Text>
      </TouchableOpacity>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {spaceRentData?.data?.spaceImages?.map((image, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleImageClick(index)}
            style={[
              styles.thumbnailWrapper,
              {
                borderColor: activeImage === index ? "#DCE102" : "transparent",
              },
            ]}
          >
            <Image source={{ uri: image?.url }} style={styles.thumbnail} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: "auto",
    width: "100%",
  },
  banner: {
    width: "100%",
    height: 220, // Adjust the height as needed
    resizeMode: "cover",
    borderRadius: 15,
  },
  scrollContainer: {
    paddingVertical: 10,
    marginTop: 5,
  },
  thumbnailWrapper: {
    borderWidth: 1,
    borderRadius: 6,
    marginRight: 10,
    height: 52,
    width: 52,
  },
  thumbnail: {
    width: 50,
    height: 50,
    marginRight: 10,
    resizeMode: "cover",
    borderRadius: 5,
  },
  commonText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Banner;
