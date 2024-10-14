import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStoredLanguage, setLanguage } from '../utils/language';
import { changeLanguage } from '../translation/i18n';

const LanguageContext = createContext();

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLang] = useState('en'); // Default language

  // Load stored language when the app loads
  useEffect(() => {
    const loadLanguage = async () => {
      const storedLang = await getStoredLanguage();
      setLang(storedLang);
      setLanguage(storedLang);
    };
    loadLanguage();
  }, []);

  // Function to update language dynamically
  const handleChangeLanguage = async (lang) => {
    await setLanguage(lang); 
    setLang(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage: handleChangeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
