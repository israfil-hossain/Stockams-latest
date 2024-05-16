import {
  AntDesign,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";

import React, { Children, useRef, useState } from "react";
import { Alert } from "react-native";
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import BackHeader from "../../components/global/header/BackHeader";
import CustomButton from "../../components/global/common/ui/Button";
import CustomInput from "../../components/global/common/CommonInput";
import CustomDropDown from "../../components/global/common/AutoDropDown";
import { features } from "../../utils/features";
import { useRoute } from '@react-navigation/native';
import { API } from "../../../api/endpoints";


const SpaceOverviewScreen = () => {
  const [activeImage, setActiveImage] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const route = useRoute();
  const { id } = route.params; // Destructure the 'id' param
  console.log("Id: ", id)

  const spaceOverViewAPI = `${API.GetSingleSpaceForRent}/${id}`;

  const {
    data: { data: spaceRentData = {} } = {},
    isLoading: spaceTypeLoading,
  } = useGet({ endpoint: spaceOverViewAPI });

  console.log("SpaceData",spaceRentData )
  
  const handlePresentModal = () => {};

  const options = [
    { title: "item1" },
    { title: "item1" },
    { title: "item1" },
    { title: "item1" },
    { title: "item1" },
    { title: "item1" },
    { title: "item1" },
    { title: "item1" },
    { title: "item1" },
    { title: "item1" },
    { title: "item1" },
    { title: "item1" },
    { title: "item1" },
    { title: "item1" },
    { title: "item1" },
    { title: "item1" },
  ];

  const images = [
    "https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-nature-mountain-scenery-with-flowers-free-photo.jpg?w=2210&quality=70",
    "https://i0.wp.com/picjumbo.com/wp-content/uploads/camping-on-top-of-the-mountain-during-sunset-free-photo.jpg?w=2210&quality=70",
    "https://i0.wp.com/picjumbo.com/wp-content/uploads/wooden-path-in-tropical-rain-forest-free-photo.jpg?w=2210&quality=70",
    "https://i0.wp.com/picjumbo.com/wp-content/uploads/red-heart-tree-free-photo.jpg?w=2210&quality=70",
    "https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-nature-mountain-scenery-with-flowers-free-photo.jpg?w=2210&quality=70",
    "https://i0.wp.com/picjumbo.com/wp-content/uploads/camping-on-top-of-the-mountain-during-sunset-free-photo.jpg?w=2210&quality=70",
    "https://i0.wp.com/picjumbo.com/wp-content/uploads/wooden-path-in-tropical-rain-forest-free-photo.jpg?w=2210&quality=70",
    "https://i0.wp.com/picjumbo.com/wp-content/uploads/red-heart-tree-free-photo.jpg?w=2210&quality=70",
  ];
  const subChildren = (
    <View className="h-full w-full p-4 flex flex-col items-center justify-normal">
      <View className="">
        <Text className="text-[20px] font-bold">
          From $111/month Including Tax
        </Text>
        <Text className="text-[14px] self-center">
          Monthly rate including Insurance.
        </Text>
      </View>
      <View className="h-[45px] w-full bg-[#B3FAFF] rounded-xl items-center justify-center mt-4">
        <Text className="text-[15px] font-bold self-center">
          7 Self0-Storage boxes.
        </Text>
      </View>
      <View className="h-auto w-full flex flex-col justify-center items-center mt-4">
        <View className="flex flex-row w-full items-center justify-between">
            <View className="w-[48%] rounded-xl ">
              <Text className="text-[13px]">Start Date</Text>
              <CustomInput
                icon="md-calendar"
                placeholder="Enter Date"
                autoCapitalize="none"
                keyboardAppearance="dark"
                returnKeyType="next"
                returnKeyLabel="next"
                label="Date"
                type="date"
              />
          </View>
          <View className=" w-[48%] rounded-xl">
            <View className="flex flex-col">
              <Text className="text-[13px]">Rental Duration</Text>
              <CustomDropDown
                title="2 Months"
                data={options}
                height={38}
                marginTop={2}
              />
            </View>
          </View>
        </View>
        <View className="mt-5 self-center">
          <CustomButton
            text="Book Now"
            size={350}
            height={45}
            padding={0}
            bg={Colors.primary}
            onPress={() => {}}
          />
        </View>
        <TouchableOpacity className="h-[45px] w-full mt-5 border-[1px] border-primary rounded-xl flex flex-row justify-center items-center space-x-2">
          <Text>Call Now</Text>
          <Ionicons name="call-outline" size={17} color="black" />
          <Text>(989) 6654 6665</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleImageClick = (index) => {
    setActiveImage(index);
  };

  return (
    <View
    >
      <BackHeader Headertext="Back" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        style={[{ backgroundColor: isOpen ? "transfarent" : "white" }]}
      >
        <View style={styles.container}>
          {/* For Banner and Image Section  */}
          <View>
            <Image
              source={{ uri: images[activeImage] }}
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
              {images.map((image, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleImageClick(index)}
                  style={[
                    styles.thumbnailWrapper,
                    {
                      borderColor:
                        activeImage === index ? "#DCE102" : "transparent",
                    },
                  ]}
                >
                  <Image source={{ uri: image }} style={styles.thumbnail} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View className="flex flex-row justify-between">
            <Text className="text-[15px] font-bold">Diamond field storage</Text>
            <View className="flex flex-row items-center">
              <Text className="text-[18px] font-bold">$74</Text>
              <Text className="text-[12px] font-normal text-gray-600">
                {" "}
                /month
              </Text>
            </View>
          </View>

          <View className="flex flex-row items-center space-x-1">
            <Octicons name="location" size={20} color="#757575" />
            <Text className="text-gray-600 py-2">
              {" "}
              Chodkiewicza Karola 111, Chorzow 41-506
            </Text>
          </View>

          <View className="flex flex-row justify-between items-center ">
            <Text className="text-[14px] font-[600]">Access 24/7</Text>
            <Ionicons name="heart" size={27} color="#FF7354" />
          </View>
          <View className="w-full flex flex-row justify-between items-center p-1 mt-3 space-x-2">
            <TouchableOpacity>
              <View className="bg-white w-[105px] h-[80px] border-primary border  rounded-xl shadow-lg flex flex-col items-center justify-center space-y-2">
                <View className="bg-primary h-[30px] w-[30px] justify-center rounded-3xl items-center">
                  <MaterialCommunityIcons
                    name="shield-lock-outline"
                    size={20}
                    color="#2D2D2A"
                  />
                </View>
                <Text className="text-[12px] font-bold">Secure Center</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View className="bg-white w-[105px] h-[80px] border-tertiary border  rounded-xl shadow-sm flex flex-col items-center justify-center space-y-2">
                <View className="bg-tertiary h-[30px] w-[30px] justify-center rounded-3xl items-center">
                  <Ionicons name="key-outline" size={20} color="#2D2D2A" />
                </View>
                <Text className="text-[12px] font-bold">key Handover</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View className="bg-white w-[105px] h-[80px] border-secondary border  rounded-xl shadow-sm flex flex-col items-center justify-center space-y-2">
                <View className="bg-secondary h-[30px] w-[30px] justify-center rounded-3xl items-center">
                  <MaterialCommunityIcons
                    name="home-modern"
                    size={20}
                    color="#2D2D2A"
                  />
                </View>
                <Text className="text-[12px] font-bold">Individual Space</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View className="w-full mt-4 flex flex-col space-y-3">
            <Text className="text-[18px] font-bold">Secure Center </Text>
            <Text className="text-[14px] font-[300] text-justify">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
              Exercitation veniam consequat sunt nostrud amet. Amet minim mollit
              non deserunt ullamco est sit aliqua dolor do amet sint.
            </Text>
            <Text className="text-[14px] font-[300] text-justify">
              Velit officia consequat duis enim velit mollit. Exercitation
              veniam consequat sunt nostrud amet. Amet minim mollit non deserunt
              ullamco est sit aliqua dolor do amet sint. Velit officia consequat
              duis enim velit mollit. Exercitation veniam consequat sunt nostrud
              amet.
            </Text>
          </View>
          <View className="w-full mt-5 h-80">
            <Text className="text-[18px] font-bold">Features </Text>
            <View className="flex flex-row justify-start items-center w-full h-auto space-x-6 ">
              <View>
                <Text className=" mt-5 font-normal">Storage Conditions</Text>
              </View>
              <View className="flex flex-row justify-center space-x-2 mt-5">
                <Feather name="check" size={24} color="#37CF02" />
                <Text>{features.storageConditions}</Text>
              </View>
            </View>
            <View className="flex flex-row justify-start mt-6 w-full h-auto space-x-5">
              <View>
                <Text className="font-normal">Unloading & Moving</Text>
              </View>
              <View className="flex flex-col justify-start items-start">
                <View className="flex flex-row justify-center space-x-2 ">
                  <Feather name="check" size={24} color="#37CF02" />
                  <Text>{features.unloadingAndMoving.carPark}</Text>
                </View>
                <View className="flex flex-row justify-center space-x-2 ">
                  <Feather name="check" size={24} color="#37CF02" />
                  <Text>{features.unloadingAndMoving.hgvAccess}</Text>
                </View>
                <View className="flex flex-row justify-center space-x-2">
                  <Feather name="check" size={24} color="#37CF02" />
                  <Text>{features.unloadingAndMoving.insideLighting}</Text>
                </View>
              </View>
            </View>

            <View className="flex flex-row mt-6 w-full h-auto">
              <View>
                <Text className="font-normal">Security</Text>
              </View>
              <View className="flex flex-col justify-start items-start left-[95px]">
                <View className="flex flex-row justify-center space-x-2 ">
                  <Feather name="check" size={24} color="#37CF02" />
                  <Text>{features.security.accessControl}</Text>
                </View>
                <View className="flex flex-row justify-center space-x-2 ">
                  <Feather name="check" size={24} color="#37CF02" />
                  <Text>{features.security.videoSurveillance}</Text>
                </View>
                <View className="flex flex-row justify-center space-x-2">
                  <Feather name="check" size={24} color="#37CF02" />
                  <Text>{features.security.alarm}</Text>
                </View>
                <View className="flex flex-row justify-center space-x-2">
                  <Feather name="check" size={24} color="#37CF02" />
                  <Text>{features.security.fireSafety}</Text>
                </View>
              </View>
            </View>
          </View>
          <View className="flex flex-col mt-5 w-full h-auto mb-4 space-y-4">
            <View className="flex flex-row justify-between bg-white border-primary border rounded-lg w-full h-[48px] items-center p-2">
              <Text className="text-[#ABB0B6] text-[15px] font-normal">
                Insurance Coverage
              </Text>
              <Text className="text-[17px] font-bold">6 month left</Text>
            </View>
            <View className="flex flex-row justify-between bg-white border-primary border rounded-lg w-full h-[48px] items-center p-2">
              <Text className="text-[#ABB0B6] text-[15px] font-normal">
                Cancelation
              </Text>
              <Text className="text-[17px] font-bold">10%</Text>
            </View>
            <View className="flex flex-row justify-between bg-white border-primary border rounded-lg w-full h-[48px] items-center p-2">
              <Text className="text-[#ABB0B6] text-[15px] font-normal">
                Gate Access Hours
              </Text>
              <Text className="text-[17px] font-bold">24 Hours</Text>
            </View>
            <View className="items-center">
              <CustomButton
                text="View Review"
                size={352}
                height={45}
                bg={Colors.white}
                onPress={() => Alert.alert("Review")}
              />
            </View>
          </View>
        </View>
        <View className="w-full h-auto rounded-t-3xl drop-shadow-2xl shadow-black mb-20">
          <View className="m-4">
            <Text className="text-[15px] font-normal">Select Space</Text>
            <View className="w-full mb-4">
              {/* <CustomDropDown
                title="8.5m2 111$ month including tax $75"
                data={options}
              /> */}
            </View>
            <CustomButton
              text="Book Now"
              size={345}
              height={45}
              bg={Colors.primary}
              onPress={() => {}}
            />
          </View>
        </View>
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

export default SpaceOverviewScreen;
