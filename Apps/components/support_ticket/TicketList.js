import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";

const TicketList = ({ ticket }) => {
  return (
    <View>
      <ScrollView>
        {ticket?.map((item, id) => (
          <TouchableOpacity
            // onPress={() => {
            //   router.push({
            //     pathname: "/(main)/(home)/(modals)/massagePage",
            //     params: { id: id, image: item.image, name: item.name },
            //   });
            // }}
            key={id}
          >
            <View className="flex flex-row p-3 mt-2 w-96 h-[75px]  justify-between">
              <Image
                className="w-[50px] h-[50px] rounded-3xl"
                source={{ uri: item.image }}
              />
              <View className="flex flex-col justify-between">
                <View className="flex flex-row justify-between">
                  <Text className="text-[17px] font-medium right-[55px]">
                    {item.name}
                  </Text>
                  <Text className="text-[#ABB0B6] text-[13px]">9:41 am</Text>
                </View>
                <Text className="text-[#ABB0B6] right-[55px]">
                  {item.lastMassage}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default TicketList;
