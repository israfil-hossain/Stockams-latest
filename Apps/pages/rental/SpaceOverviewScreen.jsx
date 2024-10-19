import React, { Children, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Octicons,
} from "@expo/vector-icons";

import {
  View,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";

import BackHeader from "../../components/global/header/BackHeader";
import CustomButton from "../../components/global/common/ui/Button";

import { useRoute } from "@react-navigation/native";
import { API } from "../../../api/endpoints";
import { useGet } from "../../hooks";
import CommonBottomSheet from "../../components/modals/CommonBottomSheet";
import { useSharedValue } from "react-native-reanimated";
import BookingBottomCard from "../../components/host_rental_panel/components/BookingBottomCard";
import Banner from "../../components/host_rental_panel/booking/Banner";
import FeatureCard from "../../components/host_rental_panel/booking/Feature";
import Access from "../../components/host_rental_panel/booking/Access";
import CongratulationBottomCard from "../../components/host_rental_panel/components/CongratulationBottomCard";
import PackingBottomCard from "../../components/host_rental_panel/components/PackingBottomCard";
import PickupFormBottomCard from "../../components/host_rental_panel/components/PickupFormBottomCard";
import CostModal from "../../components/host_rental_panel/components/CostModal";

const SpaceOverviewScreen = () => {
  const navigation = useNavigation();
  const [isOpen, setIssOpen] = useState(true);

  const route = useRoute();
  const { id } = route.params;

  const issOpen = useSharedValue(false);
  const congratulationOpen = useSharedValue(false);
  const packingStufOpen = useSharedValue(false);
  const pickFormOpen = useSharedValue(false);
  const pickUpTimeOpen = useSharedValue(false); 
  const costOpen = useSharedValue(false);

  const toggleSheet = () => {
    issOpen.value = !issOpen.value;
  };

  const congratulationSheet = () => {
    congratulationOpen.value = !congratulationOpen.value;
  };
  const packStuffOpenSheet = () => {
    congratulationOpen.value = !congratulationOpen.value;
    packingStufOpen.value = !packOpen.packingStufOpen;
  };
  const pickFormOpenSheet = () => {
    // packOpen.value = !packOpen.value;
    pickFormOpen.value = !pickFormOpen.value;
  };
  const pickUpTimeOpenSheet = () => {
    pickUpTimeOpen.value = !pickUpTimeOpen.value; 
  }
  const costOpenSheet = () => {
    pickFormOpen.value = !pickFormOpen.value;
    costOpen.value = !costOpen.value;
  };

  const spaceOverViewAPI = `${API.GetSingleSpaceForRent}/${id}`;

  const {
    data: { data: spaceRentData = {} } = {},
    isLoading: spaceTypeLoading,
  } = useGet({ endpoint: spaceOverViewAPI });


  return (
    <View>
      <BackHeader Headertext="Back" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        // style={[{ backgroundColor: isOpen ? "transfarent" : "white" }]}
      >
        <View style={styles.container}>
          {/* For Banner and Image Section  */}
          <Banner spaceRentData={spaceRentData} />

          <View className="flex flex-row justify-between">
            <Text className="text-[15px] font-bold">
              {spaceRentData?.data?.name}
            </Text>
            <View className="flex flex-row items-center">
              <Text className="text-[18px] font-bold">
                ${spaceRentData?.data?.pricePerMonth}
              </Text>
              <Text className="text-[12px] font-normal text-gray-600">
                {" "}
                /month
              </Text>
            </View>
          </View>

          <View className="flex flex-row items-center space-x-1">
            <Octicons name="location" size={20} color="#757575" />
            <Text className="text-gray-600 py-2">
              {" "}
              {spaceRentData?.data?.location}
            </Text>
          </View>

          <Access data={spaceRentData?.data}/>
          <FeatureCard spaceRentData={spaceRentData} />

          <View className="flex flex-col mt-5 w-full h-auto mb-4 space-y-4">
            <View className="flex flex-row justify-between bg-white border-primary border rounded-lg w-full h-[48px] items-center p-2">
              <Text className="text-[#ABB0B6] text-[15px] font-normal">
                Insurance Coverage
              </Text>
              <Text className="text-[17px] font-bold">6 month left</Text>
            </View>
            <View className="flex flex-row justify-between bg-white border-primary border rounded-lg w-full h-[48px] items-center p-2">
              <Text className="text-[#ABB0B6] text-[15px] font-normal">
                Cancelation
              </Text>
              <Text className="text-[17px] font-bold">10%</Text>
            </View>
            <View className="flex flex-row justify-between bg-white border-primary border rounded-lg w-full h-[48px] items-center p-2">
              <Text className="text-[#ABB0B6] text-[15px] font-normal">
                Gate Access Hours
              </Text>
              <Text className="text-[17px] font-bold">24 Hours</Text>
            </View>
            <View className="items-center">
              <CustomButton
                text="View Review"
                size={"100%"}
                height={45}
                bg={Colors.white}
                onPress={() =>
                  navigation.navigate("spaceReview", {
                    id: `${spaceRentData?.data?._id}`,
                  })
                }
              />
            </View>
          </View>
        </View>

        <View className="w-full h-auto rounded-t-3xl drop-shadow-2xl shadow-black mb-20">
          <View className="m-4">
            {/* <Text className="text-[15px] font-normal">Select Space</Text> */}

            {/* <CustomDropDown
                title="8.5m2 111$ month including tax $75"
                data={options}
              /> */}

            <CustomButton
              text="Book Now"
              size={"100%"}
              height={45}
              bg={Colors.primary}
              onPress={pickUpTimeOpenSheet}
            />
          </View>
        </View>
        
        {/* Booking Modal  */}
        {/* <CommonBottomSheet isOpen={issOpen} toggleSheet={toggleSheet}>
          <BookingBottomCard data={spaceRentData?.data} toggleSheet={toggleSheet} congratulationSheet={congratulationSheet}/>
        </CommonBottomSheet> */}

        {/* Congratulation Modal  */}
        {/* <CommonBottomSheet
          isOpen={congratulationOpen}
          toggleSheet={congratulationSheet}
        >
          <CongratulationBottomCard  toggleSheet={packOpenSheet}/>
        </CommonBottomSheet> */}

        {/* Packing Stuff Modal  */}
        {/* <CommonBottomSheet
          isOpen={packOpen}
          toggleSheet={packOpenSheet}
        >
          <PackingBottomCard  toggleSheet={pickTimeOpenSheet}  />
        </CommonBottomSheet> */}

       {/* Pickup Form  Modal*/}
       <CommonBottomSheet
          isOpen={pickFormOpen}
          toggleSheet={pickFormOpenSheet} 
        >
          <PickupFormBottomCard  toggleSheet={""} />
        </CommonBottomSheet>

        {/* PickupTime  Form  Modal*/}
       <CommonBottomSheet
          isOpen={pickUpTimeOpen}
          toggleSheet={pickUpTimeOpenSheet} 
        >
          <PickupFormBottomCard  toggleSheet={""} />
        </CommonBottomSheet>


        {/* Cost  Modal  */}
       {/* <CommonBottomSheet
          isOpen={costOpen}
          toggleSheet={costOpenSheet}
        >
          <CostModal  toggleSheet={costOpenSheet}/>
        </CommonBottomSheet> */}

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: "auto",
    width: "100%",
  },
  banner: {
    width: "100%",
    height: 220, // Adjust the height as needed
    resizeMode: "cover",
    borderRadius: 15,
  },
  scrollContainer: {
    paddingVertical: 10,
    marginTop: 5,
  },
  thumbnailWrapper: {
    borderWidth: 1,
    borderRadius: 6,
    marginRight: 10,
    height: 52,
    width: 52,
  },
  thumbnail: {
    width: 50,
    height: 50,
    marginRight: 10,
    resizeMode: "cover",
    borderRadius: 5,
  },
  commonText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SpaceOverviewScreen;
