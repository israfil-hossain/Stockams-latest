import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { useToast } from "react-native-toast-notifications";
import { API } from "../../../../api/endpoints";

import { truncateString } from "../../../utils/commonFunction";
import { noimage } from "../../../../assets/images";
import { useDelete } from "../../../hooks";
import { useNavigation } from "@react-navigation/native";

const EditStoreCard = ({ data, refetch }) => {
  const toast = useToast();

  const navigation = useNavigation();

  //Delte Mutation ....
  const {
    mutateAsync: deleteMutation,
    isLoading: spaceIsLoading,
    isSuccess,
    onSuccess,
    isError,
  } = useDelete({
    endpoint: API.DeleteSpaceForRent,
  });
 
  const deleteItem = async (item) => {
    const confirmation = await Alert.alert(
      "Are you sure?",
      "You want to Delete this item?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              const { data, error } = await deleteMutation(item); // Destructure response

              if (data) {
                toast.show("Space Deleted Successfully!", { type: "success" });
                refetch(); // Refresh data (assuming `refetch` exists)
              } else if (error) {
                // Handle specific error cases (if applicable)
                console.error("Error deleting space:", error);
                toast.show("Error deleting space. Please try again later.", {
                  type: "error",
                });
              }
            } catch (err) {
              console.error("Unexpected error:", err);
              toast.show(
                "An unexpected error occurred. Please try again later.",
                { type: "error" }
              );
            }
          },
          style: "default",
        },
      ]
    );

    // Handle confirmation result for potential future actions
    // (optional, based on your use case)
    if (confirmation === "OK") {
      // User confirmed deletion (consider using a more specific check)
    } else {
      // User canceled deletion
    }
  };

  const handleNavigate = ()=>{
    navigation.navigate("SpaceEdit",{ id: data?._id || null})
  }

  return (
    <View className="w-[342px] h-[290px] shadow-lg shadow-gray-400 bg-white border-primary border  rounded-xl mt-5 relative flex justify-center items-center">
      <View className="w-[94%] h-44 absolute top-4 items-center justify-center flex bg-white rounded-2xl shadow ">
        {data?.coverImage ? (
          <>
            <Image
              className="w-full h-full   rounded-2xl"
              source={{
                uri: data?.coverImage,
              }}
            />
          </>
        ) : (
          <View className="w-[99%]  h-44 absolute top-0 items-center justify-center flex bg-gray-100 rounded-2xl  shadow">
            <Image className="w-20 h-20  mt-5 rounded-2xl" source={noimage} />
          </View>
        )}
      </View>

      {/* Review section  */}
      <View className="w-28 h-[37px] p-2 right-24 top-7 absolute bg-white rounded-lg justify-between flex flex-row items-center ">
        <AntDesign name="staro" size={16} color="orange" />
        <Text className="text-sm font-[outfit-medium] ">
          {data?.averageRating}
        </Text>
        <Text className="text-[9px] text-gray-400 font-[outfit-medium] pl-1">
          {data?.reviewCount} reviews
        </Text>
      </View>
      <View className="w-24 h-[37px] p-2 right-0 top-7 absolute  rounded-lg  flex flex-row justify-around items-center mr-1">
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() =>
            handleNavigate()
          }
        >
          <View className="bg-primary rounded-full w-8 h-8 items-center flex justify-center ">
            <Feather name="edit-3" size={15} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteItem(data?._id)}>
          <View className="bg-white rounded-full w-8 h-8 items-center flex justify-center ">
            <AntDesign name="delete" size={15} color="red" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Certified section  */}
      <View className="w-[100px] h-[37px] px-2 left-5 top-7 absolute bg-tertiary rounded-xl justify-around flex flex-row items-center">
        {data?.ownerProfilePicture ? (
          <Image
            source={{
              uri: data?.ownerProfilePicture,
            }}
            className="w-5 h-5 rounded-full"
          />
        ) : (
          <Ionicons
            name="person-circle-sharp"
            size={24}
            color="black"
            className="items-center"
          />
        )}

        <Text className="text-sm font-medium ">Certified</Text>
      </View>
      <View className=" top-[200px]  w-[92%] absolute ">
        <View className="relative flex flex-row justify-between">
          <View className="w-[100%]">
            <Text className="text-[15px] font-bold">
              {truncateString(data?.name, 45) || "N/A"}
            </Text>
          </View>
          {/* <View className="h-[22px] flex flex-row w-[40%] absolute right-0">
            <Image
              className="w-[22px] h-[22px] left-[36px] rounded-full border-gray-700 border"
              source={{ uri: "https://via.placeholder.com/22x22" }}
            />
            <Image
              className="w-[22px] h-[22px] rounded-full border-white left-[28px]"
              source={{ uri: "https://via.placeholder.com/22x22" }}
            />
            <Image
              className="w-[22px] h-[22px] rounded-full border-white left-[20px]"
              source={{ uri: "https://via.placeholder.com/22x22" }}
            />
            <Image
              className="w-[22px] h-[22px] rounded-full border-white left-[16px]"
              source={{ uri: "https://via.placeholder.com/22x22" }}
            />
          </View> */}
        </View>
        <View className="">
          <Text className="text-gray-600 py-2">
            {" "}
            {truncateString(data?.location, 40) || "N/A"}
          </Text>
        </View>
        <View className="flex flex-row justify-between">
          <Text className="text-[12px] font-[700]">
            {truncateString(data?.accessMethod, 30)}
          </Text>
          <View className="flex flex-row">
            <Text className="font-bold text-[16px]">
              ${data?.pricePerMonth}
            </Text>
            <Text className="text-sm text-gray-500">/month</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default EditStoreCard;
