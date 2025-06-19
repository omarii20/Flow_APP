// ✅ SettingsScreen.tsx עם Dropdown לבחירת שפה ותמיכה ב־RTL ושמירת שפה בזיכרון
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Switch,
  View,
  I18nManager,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as Updates from 'expo-updates';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n, { getRTL, changeLocale } from '../../i18n';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import { useTheme } from '../../contexts/ThemeContext';

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [selectedLang, setSelectedLang] = useState(i18n.locale.split('-')[0]);

  useEffect(() => {
    const loadLang = async () => {
      const storedLang = await AsyncStorage.getItem('appLang');
      if (storedLang === 'en' || storedLang === 'he' || storedLang === 'ar') {
        setSelectedLang(storedLang);
      }
    };
    loadLang();
  }, []);

  const switchToLanguage = async (lang: 'en' | 'he' | 'ar') => {
    if (lang === selectedLang) return;
  
    const shouldBeRTL = ['he', 'ar'].includes(lang);
    const needRestart = I18nManager.isRTL !== shouldBeRTL || lang !== i18n.locale;
  
    await changeLocale(lang); // משנה את השפה ושומר ב־AsyncStorage
    setSelectedLang(lang);
  
    if (needRestart) {
      I18nManager.forceRTL(shouldBeRTL);
  
      if (!__DEV__) {
        await Updates.reloadAsync();
      } else {
        console.warn('יש להפעיל את האפליקציה מחדש כדי להחיל את שינוי השפה');
      }
    }
  };
  

  const handleProfilePress = () => {
    alert(i18n.t('profile_screen'));
  };

  return (
    <ThemedView style={[styles.container]}>
      <ThemedText type="title" style={styles.title}>
        {i18n.t('settings')}
      </ThemedText>

      {/* 🧑 כפתור לפרופיל */}
      <TouchableOpacity style={[styles.row, getRTL() && { flexDirection: 'row-reverse' }]} onPress={handleProfilePress}>
        <ThemedText style={styles.label}>{i18n.t('profile')}</ThemedText>
      </TouchableOpacity>

      {/* 🌗 מצב כהה */}
      <ThemedView style={[styles.row , getRTL() && { flexDirection: 'row-reverse' }]}>
        <ThemedText style={styles.label}>{i18n.t('dark_mode')}</ThemedText>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </ThemedView>

      {/* 🔤 Dropdown לבחירת שפה */}
      <ThemedView style={styles.dropDwon}>
      <ThemedText style={[styles.label, { textAlign: getRTL() ? 'right' : 'left', alignSelf: getRTL() ? 'flex-end' : 'flex-start' }]}>
        {i18n.t('choose_language')}
      </ThemedText>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedLang}
            style={styles.picker}
            onValueChange={(itemValue) => switchToLanguage(itemValue as 'en' | 'he' | 'ar')}
          >
            <Picker.Item label="עברית" value="he" />
            <Picker.Item label="English" value="en" />
            <Picker.Item label="العربية" value="ar" />
          </Picker>
        </View>
        {/* {__DEV__ && (
          <ThemedText style={{ color: 'orange', marginTop: 10, fontSize: 14 }}>
            שינוי כיוון (RTL) יופעל רק לאחר בנייה לגרסת הפקה.
          </ThemedText>
        )} */}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  label: {
    fontSize: 18,
  },
  dropDwon:{
    marginTop: 30
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginTop: 10,
  },
  picker: {
    height: 60,
    width: '100%',
  },
});
