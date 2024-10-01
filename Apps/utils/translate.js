import axios from 'axios';

const translateText = async (text, targetLanguage) => {
  const apiKey = process.env.EXPO_GOOGLE_API;
  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
  
  try {
    const response = await axios.post(url, {
      q: text,
      target: targetLanguage
    });
    
    const translatedText = response.data.data.translations[0].translatedText;
    return translatedText;
  } catch (error) {
    console.error('Error translating text:', error);
    throw error;
  }
};

export default translateText;
