import { Text, View, FlatList } from "react-native";
import React from "react";

import { useState, useEffect } from "react";
import { Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "@/components/global/common/ui/Button";
import Colors from "@/constants/Colors";
import { getImageFileData } from "@/utils/getFileType";

interface CustomInputProps {
  onSubmit?: any;
  prevStep?: any;
  data?: any;
  setFormData?: any;
}

const AddImages: React.FC<CustomInputProps> = ({
  onSubmit,
  prevStep,
  data,
  setFormData,
}) => {
  // const [imagelist, setSpaceImages] = useState<any>([]); // State to store both URI and file type
  const [isError, setIsError] = useState(false);
  const [msgerror, setMsgError] = useState("");
  console.log("Data images : ", data?.spaceImages)

  useEffect(() => {
    if (data?.spaceImages?.length <= 0) {
      setIsError(true);
      setMsgError("* You must select at least one space image");
    } else if (data?.spaceImages?.length > 5) {
      setIsError(true);
      setMsgError(
        "* Maximum number of spaceImages is reached. You can select maximum 5 images."
      );
    } else {
      setIsError(false);
      setMsgError("");
    }
  }, [data?.spaceImages]);

  const handleSubmit = async () => {
    if (data?.spaceImages?.length <= 0) {
      setIsError(true);
      setMsgError("* You must select at least one space image");
    } else {
      
      onSubmit();
     
    }
  };

  const pickImage = async () => {
    if (data?.spaceImages?.length === 5) {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [5, 6],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result?.assets[0]?.uri;

      setFormData((prevFormData: any) => ({
        ...prevFormData,
        spaceImages: [...prevFormData.spaceImages, uri],
      }));
    }
  };

  const removeImage = (index: number) => {
    const updatedSpaceImages = data?.spaceImages.filter(
      (_: any, i: any) => i !== index
    );
    setFormData("spaceImages", updatedSpaceImages);
  };

  return (
    <View className="px-4 w-full">
      <View
        style={{ alignItems: "center", justifyContent: "center" }}
        className="h-[84%] w-full"
      >
        {isError && (
          <Text className="py-3 text-red-500 text-md font-medium">
            {msgerror}
          </Text>
        )}
        <TouchableOpacity onPress={pickImage}>
          <View className="flex flex-row items-center justify-between w-[300px] rounded-lg border-primary border-2 py-3 px-4 bg-yellow-100">
            <Text className="text-black text-sm font-medium">
              Select File from
            </Text>
            <Ionicons name="cloud-upload-outline" size={24} color="black" />
          </View>
        </TouchableOpacity>

        <FlatList
          data={data?.spaceImages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View className="rounded-lg relative my-3 w-full mt-2 px-2">
              <Image
                source={{ uri: item }}
                style={{ width: 300, height: 250 }}
                className="rounded-lg"
                resizeMode="cover"
              />

              <View className="absolute top-2 right-4">
                <TouchableOpacity
                  onPress={() => removeImage(index)}
                  className="flex flex-row justify-center space-x-1 items-center bg-gray-700 border-2 border-gray-200 px-2 rounded-lg py-1"
                >
                  <Ionicons name="close" size={24} color="gray" />
                  <Text className="text-white text-sm font-normal">Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          horizontal={false}
        />
      </View>
      <View className="flex flex-row justify-between mt-5 py-2 px-4">
        <CustomButton
          bg={Colors.primary}
          size={120}
          text={"Prev"}
          height={40}
          onPress={prevStep}
          showIcon={true}
          icon={"arrow-back-circle-sharp"}
        />
        <CustomButton
          bg={Colors.primary}
          size={120}
          text={"Next"}
          height={40}
          onPress={handleSubmit}
          disabled={isError}
          rightIcon={true}
          icon={"arrow-forward-circle-sharp"}
        />
      </View>
    </View>
  );
};

export default AddImages;
