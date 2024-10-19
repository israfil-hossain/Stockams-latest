import { View, Text, ActivityIndicator, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "../../components/global/common/ui/Button";
import Colors from "../../constants/Colors";
import NodataFound from "../../components/global/common/ui/NodataFound";
import adminAPI from "../../../api/adminAPI";
import { API } from "../../../api/endpoints";
import BookingCard from "../../components/global/Card/BookingCard";

const BookingScreen = () => {
  const [tab, setTab] = useState("BookingApproved");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await adminAPI.get(
        API.GetAllSpaceBooking + `?Page=1&PageSize=100&BookingStatus=${tab}`
      );
      setData(res?.data?.data || []);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [tab]);


  return (
    <View className="flex-col justify-start w-full h-full items-center">
      <View className="flex flex-row justify-start pt-4 pb-3">
        <CustomButton
          bg={tab === "BookingApproved" ? Colors.akcent : Colors.gray2}
          size={140}
          text="Active Booking"
          height={45}
          showIcon={true}
          onPress={() => setTab("BookingApproved")}
          className={` ${
            tab === "BookingApproved" ? "bg-primary" : "bg-gray-200"
          } w-36 font-[outfit] rounded-l-lg`}
        />
        <CustomButton
          bg={tab === "PendingActions" ? Colors.akcent : Colors.gray2}
          size={150}
          text="Booking Request"
          height={45}
          showIcon={true}
          onPress={() => setTab("PendingActions")}
          className={` ${
            tab === "PendingActions" ? "bg-primary" : "bg-gray-200"
          } w-40 font-[outfit] rounded-r-lg`}
        />
      </View>

      {isLoading ? (
        <ActivityIndicator size={"large"} color={Colors.primary}/>
      ) : (
        <View className="mb-16">
          {data && data.length > 0 ? (
            <FlatList
              className="px-3 mb-5"
              data={data}
              key={data?._id}
              renderItem={({ item }) => <BookingCard data={item} />}
            />
          ) : (
            <NodataFound />
          )}
        </View>
      )}
    </View>
  );
};

export default BookingScreen;
