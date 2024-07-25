import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import RentalsHeader from "../../components/admin/header/RentalsHeader";
import { API } from "../../../api/endpoints";
import { useGet } from "../../hooks";
import NodataFound from "../../components/global/common/ui/NodataFound";
import EditStoreCard from "../../components/admin/components/EditStoreCard";
import BookedCard from "../../components/admin/components/BookedCard";
import StoreCard from "../../components/global/Card/Card";
import CommonProgress from "../../components/global/progress/CommonProgress";
import useBookingData from "../../hooks/useBookingData";
import CustomButton from "../../components/global/common/ui/Button";
import Colors from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";
const RentalsScreen = () => {
  const navigation = useNavigation();
  const [tab, setTab] = useState("all");
  const spaceRentEndpoint = `${API.GetSpaceForRent}`;

  // const { data: { data: spaceRentData } = {}, isLoading: spaceRentLoading } =
  //   useGet({ endpoint: spaceRentEndpoint });

  const {
    bookingData,
    hasNextPage,
    hasPreviousPage,
    loadNextPage,
    loadPreviousPage,
    isLoading : spaceRentLoading,
    isFetching,
    isError,
    error,
    refetch,
    updateFilters,
  } = useBookingData((endpoint = spaceRentEndpoint));

  useEffect(() => {
    refetch();
  }, []);

  return (
    <View style={{ height: "100%" }}>
      <RentalsHeader tab={tab} setTab={setTab} />

      <View style={styles.container}>
        {tab === "all" && (
          <View className="h-[86%] items-center">
            {spaceRentLoading ? (
              <CommonProgress />
            ) : (
              <>
                {bookingData?.length > 0 ? (
                  <View className=" items-center relative">
                    <FlatList
                      className="mb-5 relative h-[100%]"
                      // Key extractor for efficient rendering
                      data={bookingData}
                      key={bookingData?._id}
                      renderItem={({ item }) => (
                        <EditStoreCard
                          data={item}
                          refetch={refetch}
                          navigation={navigation}
                        />
                      )}
                      ListEmptyComponent={() => (
                        <Text>No booking data found.</Text>
                      )} //
                    />
                    <View className="flex-row w-full px-5 justify-between items-center ">
                      {hasPreviousPage && (
                        <View className="items-center flex-row justify-end">
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

                      {hasNextPage && (
                        <View className="items-center ">
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
              </>
            )}
          </View>
        )}
        {tab === "booked" && <BookedCard />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width * 0.97,
    //height:Dimensions.get('window').height,
    margin: 4,
    marginBottom: 20,
    height: "100%",
  },
});

export default RentalsScreen;
