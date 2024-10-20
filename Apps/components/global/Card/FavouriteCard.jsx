import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { favourite } from "../../../../assets/images";
import { AntDesign, Ionicons, Octicons } from "@expo/vector-icons";
import { useToast } from "react-native-toast-notifications";
import { adminAPI } from "../../../../api";
import { API } from "../../../../api/endpoints";
import { useNavigation } from "@react-navigation/native";

const FavouriteCard = ({ data, refetch }) => {
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(data?.isFavorite || false);
  const toast = useToast();

  const toggleFavorite = async () => {
    try {
      const response = await adminAPI.patch(API.AddFavorite, {
        SpaceId: data?._id,
      });

      if (response.status === 200) {
        setIsFavorite(!isFavorite); // Toggle favorite state
        toast.show(
          `Item has been ${
            isFavorite ? "removed from" : "added to"
          } favorites.`,
          { type: "success" }
        );
        refetch();
      } else {
        toast.show("Something went wrong. Please try again later.", {
          type: "danger",
        });
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.show("Failed to update favorite status.", { type: "danger" });
    }
  };
  return (
    <View className=" w-[100%]  h-[180px] rounded-2xl bg-white mt-5 shadow-lg shadow-gray-500 px-2 py-2">
      <View className="flex flex-col  space-y-2 w-[100%]">
        <View className="flex flex-row justify-start space-x-4  w-[100%]">
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
              navigation.navigate("spaceOverview", { id: `${data?._id}` })
            }
            className="w-[22%] h-[63px]"
          >
            {data?.coverImage ? (
              <>
                <Image
                  className="h-[63px] rounded-xl w-full"
                  source={{
                    uri: data?.coverImage,
                  }}
                />
              </>
            ) : (
              <Image
                className="h-[63px] rounded-xl w-full"
                source={favourite}
              />
            )}
          </TouchableOpacity>

          <View className="flex flex-col w-[78%]">
            <View className="flex flex-row space-x-2 justify-between">
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() =>
                  navigation.navigate("spaceOverview", { id: `${data?._id}` })
                }
              >
                <Text className="font-[outfit-medium] text-[16px] text-gray-600">
                  {data?.name}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleFavorite} className="pr-5">
                <Ionicons
                  name={isFavorite ? "heart" : "heart-outline"}
                  size={27}
                  color="#FF7354"
                />
              </TouchableOpacity>
            </View>
            <View className="flex flex-row items-center space-x-1 ">
              <Octicons name="location" size={18} color="#757575" />
              <Text className="text-gray-600 py-1 text-[12px] font-[outfit] text-wrap px-2">
                {data?.location}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-row justify-between items-center w-[100%] px-4">
          <Text className="text-[14px] font-[600] font-[outfit]">
            Access 24/7
          </Text>
          <View className="flex flex-row items-center ">
            <Text className="text-[18px] font-[outfit-medium]">
              $ {data?.pricePerMonth}
            </Text>
            <Text className="text-[12px] font-normal text-gray-600 font-[outfit]">
              {" "}
              /month
            </Text>
          </View>
        </View>

        <View className="flex-row justify-between space-x-2 items-center  w-[100%] px-3 ">
          <View className="h-[22px] flex flex-row">
            {data?.favoriteUsers?.slice(0, 6).map((item, index) => (
              <View
                key={index}
                className="w-[24px] h-[24px] -ml-2 z-5 bg-white items-center flex flex-row justify-center rounded-full border border-gray-300 p-[1px] overflow-hidden"
              >
                {item?.profilePicture ? (
                  <Image
                    className="w-full h-full pl-5 "
                    source={{
                      uri: item?.profilePicture,
                    }}
                    width={30}
                    height={30}
                  />
                ) : (
                  <Ionicons
                    name="person-circle-sharp"
                    color="black"
                    size={20}
                    className="w-[22px] h-[22px]"
                  />
                )}
              </View>
            ))}
          </View>

          <View className="  px-2 w-[32%] py-1 bg-tertiary rounded-xl justify-around flex flex-row items-center">
            {data?.ownerProfilePicture ? (
              <>
                <Image
                  source={{
                    uri: data?.ownerProfilePicture,
                  }}
                  className="w-5 h-5 rounded-full "
                />
              </>
            ) : (
              <Ionicons
                name="person-circle-sharp"
                size={22}
                color="black"
                className="items-center"
              />
            )}

            <Text className="text-sm font-[outfit]">Certified</Text>
          </View>

          <View className=" w-[40%] p-2  bg-white rounded-lg justify-between flex flex-row items-center border-gray2 border">
            <AntDesign name="staro" size={18} color="orange" />
            <Text className="text-md font-medium">{data?.averageRating}</Text>
            <Text className="text-[10px] text-gray-400">
              {data?.reviewCount} reviews
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FavouriteCard;
