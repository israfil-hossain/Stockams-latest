import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import StoreCard from "../../components/global/Card/Card";

import CustomButton from "../../components/global/common/ui/Button";
import Colors from "../../constants/Colors";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import NodataFound from "../../components/global/common/ui/NodataFound";
import { useInfiniteQuery } from '@tanstack/react-query'
import fetchApi from "../../utils/fetchApi";


const NearMeScreen = () => {

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
    isFetchingNextPage,
    status,
    refetch
  } = useInfiniteQuery({
    queryKey: ['bookingData'],
    queryFn: ({ pageParam = 1 }) => fetchApi({ page: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.currentPage < lastPage.totalPages ? lastPage.currentPage + 1 : undefined;
    },
  })

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [])
  );

  console.log("Book Data : ", data)
  if (isLoading) return <ActivityIndicator size="large" color={Colors.primary} />;
  if (isError) return <Text>Error fetching data</Text>;

  const renderFooter = () => {
    if (isFetchingNextPage) {
      return <ActivityIndicator size="small" color={Colors.primary} />;
    }
    if (!hasNextPage) {
      return <Text style={{ padding: 10, color: Colors.black,textAlign:"center"  }}>Data is finished ... </Text>;
    }
    return null;
  };

  return (
    <View className="flex-col justify-start w-full  h-full items-center ">
     <FlatList
        className="px-3 mb-3"
        data={data?.pages.flatMap(page => page.data)}
        keyExtractor={(item, index) => item._id ? `${item._id}-${index}` : index.toString()} // Ensure uniqueness
        renderItem={({ item }) => (
          <StoreCard data={item} />
        )}
        onEndReached={hasNextPage ? fetchNextPage : null}
        onEndReachedThreshold={0.3}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default NearMeScreen;
