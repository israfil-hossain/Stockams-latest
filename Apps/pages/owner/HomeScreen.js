import {
  View,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";

import ExploreHeader from "../../components/admin/header/ExploreHeader";

import useBookingData from "../../hooks/useBookingData";
import CommonProgress from "../../components/global/progress/CommonProgress";
import StoreCard from "../../components/global/Card/Card";
import CustomButton from "../../components/global/common/ui/Button";
import Colors from "../../constants/Colors";
import { API } from "../../../api/endpoints";

const HomeScreen = () => {

  const spaceTypeEndpoint = `${API.GetSpaceType}`;

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
  } = useBookingData(
    endpoint = spaceTypeEndpoint
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <View className="flex-col justify-start w-full   items-center">
      <ExploreHeader />
      {
        (isFetching || isLoading) ? (<CommonProgress />) : 

      (bookingData?.length === 0 && (
        <View className="mb-5 bg-red-500 w-full h-full">
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
      ))}
    </View>
  );
};


export default HomeScreen;
