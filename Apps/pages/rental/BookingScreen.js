import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import StoreCard from "../../components/global/Card/Card";
import { useQuery } from "@tanstack/react-query";
import adminAPI from "../../../api/adminAPI";
import { API } from "../../../api/endpoints";
import useBookingData from "../../hooks/useBookingData";
import CustomButton from "../../components/global/common/ui/Button";
import Colors from "../../constants/Colors";
import CommonProgress from "../../components/global/progress/CommonProgress";

const BookingScreen = () => {
  const {
    bookingData,
    hasNextPage,
    hasPreviousPage,
    loadNextPage,
    loadPreviousPage,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useBookingData();

  useEffect(() => {
    refetch();
  }, []);
  const [tab, setTab] = useState("Active");

  return (
    <View className="flex-col justify-start w-full  h-full items-center">
      <View className="flex flex-row justify-start pt-4 pb-3">
        <CustomButton
          bg={tab === "Active" ? Colors.akcent : Colors.gray2}
          size={140}
          text="Active Booking"
          height={45}
          // icon={renter}
          showIcon={true}
          onPress={() => setTab("Active")}
          // type="image"
          className={` ${tab === "Active" ? "bg-primary" : "bg-gray-200"} w-36 font-[outfit] rounded-l-lg`}
        />
        <CustomButton
          bg={tab === "Request" ? Colors.akcent : Colors.gray2}
          size={150}
          text="Space Owner"
          height={45}
          // icon={space_owner}
          showIcon={true}
          onPress={() => setTab("Request")}
          // type="image"
          className={` ${tab === "Request" ? "bg-primary" : "bg-gray-200"} w-36 font-[outfit] rounded-r-lg`}
        />
      </View>
      {isFetching || isLoading ? (
        <CommonProgress />
      ) : (
        bookingData?.length > 0 && (
          <View className="mb-5">
            <FlatList
              className="px-3 mb-5"
              data={bookingData}
              key={bookingData?._id}
              renderItem={({ item }) => (
                <StoreCard data={item} type="booking" />
              )}
            />
            <View className="flex-row justify-between items-center">
              <View>
                {hasPreviousPage && (
                  <View className="h-8 items-center ">
                    <CustomButton
                      bg={Colors.primary}
                      size={60}
                      text="Prev"
                      height={30}
                      // icon={renter}
                      showIcon={false}
                      onPress={() => loadPreviousPage()}
                    />
                  </View>
                )}
              </View>

              {hasNextPage && (
                <View className="h-8 items-center ">
                  <CustomButton
                    bg={Colors.primary}
                    size={60}
                    text="Next"
                    height={30}
                    // icon={renter}
                    showIcon={false}
                    onPress={() => loadNextPage()}
                  />
                </View>
              )}
            </View>
          </View>
        )
      )}
    </View>
  );
};

export default BookingScreen;
