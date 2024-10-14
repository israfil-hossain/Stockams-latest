import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { Ionicons } from "@expo/vector-icons";
import { useLanguage } from "../../../context/LanguageProvider";


export default function LanguageSelect() {
  const {  changeLanguage } = useLanguage(); // Local state for language

  const handleChangeLanguage = async (lang) => {
    await changeLanguage(lang); 
  };

  return (
    <View>
      <Menu>
        <MenuTrigger
          text={
            <View style={styles.Btn}>
              <Ionicons name="language-outline" size={20} />
            </View>
          }
        />
        <MenuOptions>
        <MenuOption onSelect={() => handleChangeLanguage('en')} text="🇬🇧  English" />
          <MenuOption onSelect={() => handleChangeLanguage('es')} text="🇪🇸  Spanish" />
          <MenuOption onSelect={() => handleChangeLanguage('fr')} text="🇫🇷  French" />
          <MenuOption onSelect={() => handleChangeLanguage('pl')} text="🇵🇱  Polish" />
        </MenuOptions>
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  Btn: {
    width: 30,
    height: 30,
    backgroundColor: "#FFFFFF",
    marginRight: 5,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 3, // Android Elevation
  },
});
