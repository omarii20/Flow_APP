import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';
import { translations } from './translations';

const i18n = new I18n(translations);
i18n.enableFallback = true;

// שומר את שפת הממשק
let currentLocale = Localization.locale || 'en';
i18n.locale = currentLocale;

// מחזיר true אם צריך להיות RTL לפי השפה הנוכחית
export const getRTL = (): boolean => {
  return ['he', 'ar'].includes(currentLocale.split('-')[0]);
};

// טוען את השפה השמורה ומעדכן את i18n
export const loadLocale = async () => {
  const storedLocale = await AsyncStorage.getItem('appLang');
  currentLocale = storedLocale || Localization.locale || 'en';
  i18n.locale = currentLocale;
};

// משנה שפה ומעדכן את currentLocale
export const changeLocale = async (locale: 'en' | 'he' | 'ar') => {
  currentLocale = locale;
  i18n.locale = locale;
  await AsyncStorage.setItem('appLang', locale);
};

export default i18n;
