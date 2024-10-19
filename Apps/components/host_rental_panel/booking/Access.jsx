import { View, Text } from "react-native";
import React, { useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { adminAPI } from "../../../../api";
import { API } from "../../../../api/endpoints";
import { useToast } from "react-native-toast-notifications";
const Access = ({data}) => {
  const [isFavorite, setIsFavorite] = useState(data?.isFavorite ||  false);
  const toast = useToast();
  
  const toggleFavorite = async () => {
    try {
      const response = await adminAPI.patch(API.AddFavorite, {
        SpaceId: data._id,
      });
      
      if (response.status === 200) {
        setIsFavorite(!isFavorite); // Toggle favorite state
        toast.show(`Item has been ${isFavorite ? 'removed from' : 'added to'} favorites.`, { type: "success" });
      } else {
        toast.show('Something went wrong. Please try again later.', {type: "danger"})
      }
    } catch (error) {
      console.error('API Error:', error);
      toast.show('Failed to update favorite status.', {type: "danger"})
    }
  };

  return (
    <View>
      <View className="flex flex-row justify-between items-center ">
        <Text className="text-[14px] font-[600]">{data?.accessMethod || "Access 24/7"}</Text>
        <TouchableOpacity onPress={toggleFavorite}>
          <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={27} color="#FF7354" />
        </TouchableOpacity>
      </View>
      <View className="w-full flex flex-row justify-between items-center p-1 mt-3 space-x-2">
        <TouchableOpacity>
          <View className="bg-white w-[105px] h-[80px] border-primary border  rounded-xl shadow-lg flex flex-col items-center justify-center space-y-2">
            <View className="bg-primary h-[30px] w-[30px] justify-center rounded-3xl items-center">
              <MaterialCommunityIcons
                name="shield-lock-outline"
                size={20}
                color="#2D2D2A"
              />
            </View>
            <Text className="text-[12px] font-bold">Secure Center</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View className="bg-white w-[105px] h-[80px] border-tertiary border  rounded-xl shadow-sm flex flex-col items-center justify-center space-y-2">
            <View className="bg-tertiary h-[30px] w-[30px] justify-center rounded-3xl items-center">
              <Ionicons name="key-outline" size={20} color="#2D2D2A" />
            </View>
            <Text className="text-[12px] font-bold">key Handover</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View className="bg-white w-[105px] h-[80px] border-secondary border  rounded-xl shadow-sm flex flex-col items-center justify-center space-y-2">
            <View className="bg-secondary h-[30px] w-[30px] justify-center rounded-3xl items-center">
              <MaterialCommunityIcons
                name="home-modern"
                size={20}
                color="#2D2D2A"
              />
            </View>
            <Text className="text-[12px] font-bold">Individual Space</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className="w-full mt-4 flex flex-col space-y-3">
        <Text className="text-[18px] font-[outfit-medium]">Description</Text>
        <Text className="text-[14px] font-[300] text-justify font-[outfit]">
         {data?.description}
        </Text>
        
      </View>
    </View>
  );
};

export default Access;
