import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "../../components/global/common/ui/Button";
import useBookingData from "../../hooks/useBookingData";
import CommonProgress from "../../components/global/progress/CommonProgress";
import StoreCard from "../../components/global/Card/Card";
import { useGet } from "../../hooks";
import { API } from "../../../api/endpoints";
import NodataFound from "../../components/global/common/ui/NodataFound";
import SearchBar from "../../components/global/common/SearchBar";

const SearchScreen = () => {
  const [nameFilter, setNameFilter] = useState("");
  const [spaceFilter, setSpaceFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const spaceTypeEndpoint = `${API.GetSpaceType}`;

  const {
    data: { data: spaceTypeData = {} } = {},
    isLoading: spaceTypeLoading,
  } = useGet({ endpoint: spaceTypeEndpoint });

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
    updateFilters,
  } = useBookingData({
    Name: nameFilter,
    Location: locationFilter,
  });

  useEffect(() => {
    refetch();
  }, []);

  return (
    <View className="flex-col justify-start w-full  h-full items-center">
      {spaceFilter && (
        <Text className="text-[10px] font-[outfit] ">
          Your Search filter is : {spaceFilter}
        </Text>
      )}
      <View className="h-10 mx-5 my-2">
        <SearchBar updateFilters={updateFilters} text={"Search for a store"} />
      </View>
      {spaceTypeLoading ? (
        <CommonProgress />
      ) : (
        <View className="h-12  mt-2 mb-2 ">
          <ScrollView horizontal={true} className="py-2 ">
            {
              <>
                <TouchableOpacity
                  onPress={() => {
                    setSpaceFilter("");
                    updateFilters({}); // Replace with your filter update logic
                  }}
                  className=" bg-gray-500 rounded-lg mx-2 w-16 h-8 flex-row justify-center items-center"
                >
                  <Text className="text-white font-[outfit] ">All</Text>
                </TouchableOpacity>
                {spaceTypeData?.data?.map((item) => (
                  <TouchableOpacity
                    key={item?._id}
                    onPress={() => {
                      const selectedName = item?._id;
                      setSpaceFilter(item?.name);
                      updateFilters({ SpaceType: selectedName });
                    }}
                    className=" bg-black rounded-lg  mx-2 w-16 h-8 flex-row justify-center items-center"
                  >
                    <Text className="text-white font-[outfit] ">
                      {item?.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </>
            }
          </ScrollView>
        </View>
      )}

      {isFetching || isLoading ? (
        <CommonProgress />
      ) : bookingData?.length > 0 ? (
        <View className="h-[86%]">
          <FlatList
            className="px-3 mb-0"
            data={bookingData}
            key={bookingData?._id}
            renderItem={({ item }) => <StoreCard data={item} />}
            ListEmptyComponent={() => <Text>No booking data found.</Text>} //
          />
          <View className="flex-row justify-between items-start h-16 mt-2 mb-2">
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
      ) : (
        <NodataFound />
      )}
    </View>
  );
};

export default SearchScreen;
