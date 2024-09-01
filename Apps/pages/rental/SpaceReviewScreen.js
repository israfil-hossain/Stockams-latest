import { View, Text, FlatList } from "react-native";
import React, { useMemo } from "react";
import { useRoute } from "@react-navigation/native";
import BackHeader from "../../components/global/header/BackHeader";
import { API } from "../../../api/endpoints";
import { useGet } from "../../hooks";
import { Image } from "react-native";
import { starbroken } from "../../../assets/images";
import Feather from "@expo/vector-icons/Feather";
import CommonProgress from "../../components/global/progress/CommonProgress";
import { calculateDaysAgo } from "../../utils/commonFunction";

const SpaceReviewScreen = () => {
  const route = useRoute();
  const { id } = route.params; // Destructure the 'id' param
  const spaceReviewAPI = `${API.GetSpaceReviewByID}/${id}`;
  const { data: { data: reviewData = {} } = {}, isLoading: ReviewLoading } =
    useGet({ endpoint: spaceReviewAPI });
  console.log("Review Data : =>>>> ", reviewData);

  const totalRating = useMemo(() => {
    return reviewData?.data?.reduce((acc, item) => acc + item.rating, 0);
  }, [reviewData]);

  const averageRating = useMemo(() => {
    return totalRating / reviewData?.data?.length;
  }, [totalRating]);

  // Initialize a count object to store the occurrences of each rating
  const ratingCount = reviewData?.data?.reduce((acc, review) => {
    // Increment the count for the current rating
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, {});

  if (ReviewLoading) {
    return <CommonProgress />;
  }
  return (
    <View>
      <BackHeader Headertext="Back" />
      <View className="pt-5 flex flex-row justify-center space-x-2 items-center">
        <Image source={starbroken} style={{ width: 20, height: 20 }} />
        <Text className="text-[20px]  font-[outfit-medium]">{averageRating}</Text>
      </View>
      <Text className="text-center py-2 text-[16px] font-[outfit] ">
        Based on {totalRating} reviews
      </Text>
      <View className="border-2 mx-3 border-primary rounded-xl px-5 py-5">
        <View className="pb-3 flex flex-row justify-start items-center space-x-3">
          <View className="w-[50px] flex-row space-x-2 items-center">
            <Text className="text-[14px] font-[outfit-medium] w-[10px]">5</Text>
            <Image source={starbroken} className="w-[20px] h-[20px]" />
          </View>
          <View className="flex-row justify-between items-center">
            <View className="h-[10px] bg-primary rounded-xl w-[75%]"></View>
            <Text className="w-[50px] font-[outfit-medium]">{ratingCount[5] || 0}</Text>
          </View>
        </View>
        <View className="pb-3 flex flex-row justify-start items-center space-x-3">
          <View className="w-[50px] flex-row space-x-2 items-center">
            <Text className="text-[14px] font-[outfit-medium] w-[10px]">4</Text>
            <Image source={starbroken} className="w-[20px] h-[20px]" />
          </View>
          <View className="flex-row justify-between items-center">
            <View className="h-[10px] bg-primary rounded-xl w-[65%]"></View>
            <Text className="w-[50px] font-[outfit-medium]">{ratingCount[4] || 0}</Text>
          </View>
        </View>
        <View className="pb-3 flex flex-row justify-start items-center space-x-3">
          <View className="w-[50px] flex-row space-x-2 items-center">
            <Text className="text-[14px] font-[outfit-medium] w-[10px]">3</Text>
            <Image source={starbroken} className="w-[20px] h-[20px]" />
          </View>
          <View className="flex-row justify-between items-center ">
            <View className="h-[10px] bg-primary rounded-xl w-[55%]"></View>
            <Text className="w-[50px] font-[outfit-medium]">{ratingCount[3] || 0}</Text>
          </View>
        </View>
        <View className="pb-3 flex flex-row justify-start items-center space-x-3">
          <View className="w-[50px] flex-row space-x-2 items-center">
            <Text className="text-[14px] font-[outfit-medium] w-[10px]">2</Text>
            <Image source={starbroken} className="w-[20px] h-[20px]" />
          </View>
          <View className="flex-row justify-between items-center">
            <View className="h-[10px] bg-primary rounded-xl w-[45%]"></View>
            <Text className="w-[50px] font-[outfit-medium]">{ratingCount[2] || 0}</Text>
          </View>
        </View>
        <View className="pb-3 flex flex-row justify-start items-center space-x-3">
          <View className="w-[50px] flex-row space-x-2 items-center">
            <Text className="text-[14px] font-[outfit-medium] w-[10px]">1</Text>
            <Image source={starbroken} className="w-[20px] h-[20px]" />
          </View>
          <View className="flex-row justify-between items-center ">
            <View className="h-[10px] bg-primary rounded-xl w-[35%]"></View>
            <Text className="w-[50px] font-[outfit-medium]">{ratingCount[1] || 0}</Text>
          </View>
        </View>
      </View>
      <FlatList
        className="px-3 mb-5"
        data={reviewData?.data}
        key={reviewData?._id}
        renderItem={({ item }) => (
          <View className="mx-2 mt-5 px-2 py-2">
            <View className="flex-row justify-between">
              <View className="flex-row space-x-3">
                {item?.reviewer?.profilePicture ? (
                  <View className="rounded-full border w-10 h-10 p-2">
                    <Image
                      source={item?.reviewer?.profilePicture}
                      className="w-10 h-10 object-fill"
                    />
                  </View>
                ) : (
                  <View className="rounded-full border w-10 h-10 p-2 ">
                    <Feather name="user" size={24} color="black" />
                  </View>
                )}
                <View className="">
                  <Text className="font-[outfit-medium] text-[16px] capitalize">{item?.reviewer?.fullName}</Text>
                  <Text className="font-[outfit] text-gray-400">{calculateDaysAgo(item?.createdAt) + " day ago"}</Text>
                </View>
              </View>
              <View className="w-[50px] flex-row space-x-2 items-center">
                <Image source={starbroken} className="w-[20px] h-[20px]" />
                <Text className="text-[14px]  w-[10px] font-[outfit-medium]">5</Text>
              </View>
            </View>
            <Text className="pt-2 text-[16px] font-[outfit] text-gray-500">{item?.comment}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default SpaceReviewScreen;
