import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { useEffect, useState } from 'react';
import { LogBox } from 'react-native';
import { loadLocale } from '@/i18n';

function AppContent() {
  const { theme } = useTheme();

  useEffect(() => {
    LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);
  }, []);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
    </>
  );
}

export default function RootLayout() {
  const [localeLoaded, setLocaleLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await loadLocale();
      setLocaleLoaded(true);
    })();
  }, []);

  if (!localeLoaded) return null;

  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
