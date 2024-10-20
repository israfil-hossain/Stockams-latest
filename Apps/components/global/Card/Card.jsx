import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { noimage } from "../../../../assets/images";
import { truncateString } from "../../../utils/commonFunction";
import { useNavigation } from "@react-navigation/native";

const StoreCard = ({ data, type }) => {
  const navigation = useNavigation();
  
  if (!data) {
    return <Text>Loading...</Text>;
  }

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate("spaceOverview", { id: `${data?._id}` })
      }
      className={`w-[320px]  shadow-lg shadow-gray-400 ${
        type === "booking" ? "h-[360px]" : "h-[300px]"
      } bg-white border-primary border  rounded-xl mt-5 relative flex justify-center items-center `}
    >
      <View className="w-[94%] h-44 absolute top-4 items-center justify-center flex bg-white rounded-3xl shadow ">
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
      <View className="w-32 h-[37px] p-2 right-5 top-8 absolute bg-white rounded-lg justify-between flex flex-row items-center ">
        <AntDesign name="staro" size={18} color="orange" />
        <Text className="text-sm  font-[outfit-medium]">
          {data?.averageRating}
        </Text>
        <Text className="text-[10px] text-gray-400 font-[outfit-medium]">
          {data?.reviewCount} reviews
        </Text>
      </View>
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
          <View className="w-[60%]">
            <Text className="text-[15px] font-[outfit-bold]">
              {" "}
              {truncateString(data?.name, 45) || "N/A"}
            </Text>
          </View>
          <View className="flex flex-row gap-4">
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
            <Ionicons name={ data?.favoriteUsers?.length > 0 ?  'heart' : 'heart-outline'} size={27} color="#FF7354" />
          </View>
        </View>
        <View className="">
          <Text className="text-gray-600 py-2 font-[outfit]">
            {" "}
            {truncateString(data?.location, 40) || "N/A"}
          </Text>
        </View>
        <View className="flex flex-row justify-between ">
          <Text className="text-[12px] font-[outfit-medium]">
            {" "}
            {truncateString(data?.accessMethod, 30) || "Access 24/7"}
          </Text>
          <View className="flex flex-row">
            <Text className="font-[outfit-bold] text-[16px]">
              ${data?.pricePerMonth}
            </Text>
            <Text className="text-sm text-gray-500">/month</Text>
          </View>
        </View>

        {type === "booking" && (
          <View className="">
            <View
              style={{
                borderBottomColor: "#e3e3e3",
                borderBottomWidth: 1,
                marginVertical: 10, // Adjust the margin as needed
              }}
            ></View>
            <View className="flex-row justify-between items-center ">
              <Text className="font-[outfit] text-[12px] text-gray-400">
                Start date
              </Text>
              <Text className="font-[outfit] text-[12px] text-gray-400">
                End date
              </Text>
              <Text className="font-[outfit] text-[12px] text-gray-400">
                Duration
              </Text>
            </View>
            <View className="flex-row justify-between items-center mt-1">
              <Text className="font-[outfit-medium] text-[12px] ">
                12 Mar 2023
              </Text>
              <Text className="font-[outfit-medium] text-[12px] ">
                12 Mar 2023
              </Text>
              <Text className="font-[outfit-medium] text-[12px] ">2 Moths</Text>
            </View>
            <View></View>
            {/* <View className="flex flex-row justify-between py-2">
              <CustomButton
                text="Reject"
                size={140}
                bg={Colors.white}
                onPress={() => Alert.alert("Reject")}
              />
              <CustomButton
                bg={Colors.primary}
                size={140}
                text="Approve"
                onPress={() => Alert.alert("Button clicked")}
              />
            </View> */}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default StoreCard;
