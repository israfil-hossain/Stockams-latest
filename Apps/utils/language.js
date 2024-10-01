// utils/language.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { i18n } from '../translation/i18n';

// Function to get the stored language
export const getStoredLanguage = async () => {
  const language = await AsyncStorage.getItem('language');
  return language || 'en'; // Default to 'en' if no language is stored
};

// Function to set the language
export const setLanguage = async (lang) => {
  i18n.locale = lang; // Set the new language for i18n
  await AsyncStorage.setItem('language', lang); // Persist language in AsyncStorage
};
