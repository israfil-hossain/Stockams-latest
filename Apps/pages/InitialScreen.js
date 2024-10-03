import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { looper, initialIcon } from "../../assets/images";
import { useNavigation } from "@react-navigation/native";

import { t } from "../translation/i18n";
import { getStoredLanguage, setLanguage } from "../utils/language";
import RNPickerSelect from "react-native-picker-select"; // Import PickerSelect

const InitialScreen = () => {
  const navigation = useNavigation();
  const [language, setLang] = useState("en"); // Local state for language

  // Load the language from AsyncStorage when the component mounts
  useEffect(() => {
    const loadLanguage = async () => {
      const storedLang = await getStoredLanguage();
      setLang(storedLang);
    };
    loadLanguage();
  }, []);

  const handleChangeLanguage = async (lang) => {
    await setLanguage(lang); // Update the global language state
    setLang(lang); // Update local state
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundImageContainer}>
        <Image source={looper} style={styles.backgroundImage} />
      </View>
      <View className="flex justify-center items-center mt-16 w-full">
        <Image
          source={initialIcon}
          className="w-[70%] h-[270px] object-contain"
          style={styles.logo}
        />
      </View>

      <View className=" w-full items-start flex-col h-[40%] justify-between mt-10 px-6">
        <View>
        <Text className="font-[outfit-medium] text-[22px] mb-4">
          {t('select_country')}
        </Text>
        <View className="border border-gray-300 rounded-xl  px-4 w-80 bg-white">
          <RNPickerSelect
            onValueChange={(value) => handleChangeLanguage(value)}
            items={[
              { label: "🇬🇧 English", value: "en" },
              { label: "🇪🇸 Spanish", value: "es" },
              { label: "🇫🇷 French", value: "fr" },
              { label: "🇵🇱 Polish", value: "pl" },
            ]}
            style={pickerSelectStyles.inputAndroid}
           
            placeholder={{ label: "🇬🇧 English", value: null }}
          />
        </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("AuthTabs")}
          className="flex flex-row justify-center items-center w-full"
        >
          <View className="rounded-full bg-primary p-4 ">
            <AntDesign name="arrowright" size={24} color="black" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
 
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  placeholder: {
    color: "#999",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBFAE6",
    position: "relative",
  },
  backgroundImageContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  logo: {
    marginTop: 5,
    alignItems: "center",
    resizeMode: "contain",
  },
});

export default InitialScreen;
