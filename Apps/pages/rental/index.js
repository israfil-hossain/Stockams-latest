import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import StoreCard from "../../components/global/Card/Card";

import { API } from "../../../api/endpoints";
import useBookingData from "../../hooks/useBookingData";
import CustomButton from "../../components/global/common/ui/Button";
import Colors from "../../constants/Colors";
import { useFocusEffect } from "@react-navigation/native";

const NearMeScreen = () => {
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

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [])
  );

  return (
    <View className="flex-col justify-start w-full  h-full items-center">
      {isFetching || isLoading ? (
        <View className="flex flex-col justify-center items-center h-full ">
          <ActivityIndicator size={"large"} color={Colors.primary} />
        </View>
      ) : (
        bookingData?.length > 0 && (
          <View className="mb-5">
            <FlatList
              className="px-3 mb-5"
              data={bookingData}
              key={bookingData?._id}
              renderItem={({ item }) => <StoreCard data={item} />}
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

export default NearMeScreen;
