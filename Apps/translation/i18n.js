import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';
import { en, es, fr, pl } from '.';

// Set the key-value pairs for the different languages you want to support.
const translations = {
  en,
  fr,
  es, 
  pl
};

// Create the i18n instance
const i18n = new I18n(translations);

// Set the locale once at the beginning of your app.
i18n.locale = getLocales()[0].languageCode ?? 'en';

// Enable fallback when a value is missing in a language.
i18n.enableFallback = true;

// Export both i18n and the translation function (t)
const t = (key, options = {}) => i18n.t(key, options);

const changeLanguage = (languageCode) => {
    i18n.locale = languageCode; // Change the locale dynamically
  };

  console.log("lang : ", i18n.locale);

export { i18n, t, changeLanguage};
