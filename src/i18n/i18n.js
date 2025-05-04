import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector) // Автоматическое определение языка
  .use(initReactI18next) // Интеграция с React
  .init({
    fallbackLng: 'en', // Язык по умолчанию
    debug: true,
    interpolation: {
      escapeValue: false, // React уже экранирует значения
    },
    resources: {
      en: {
        translation: require('./locales/en/translation.json')
      },
      ru: {
        translation: require('./locales/ru/translation.json')
      },
      kz: {
        translation: require('./locales/kz/translation.json')
      }
    }
  });

export default i18n;
