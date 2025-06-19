import { Tabs } from 'expo-router';
import React from 'react';
import i18n from '../../i18n';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: i18n.t('home'),
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={22} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: i18n.t('settings'),
          tabBarIcon: ({ color }) => (
            <AntDesign name="setting" size={22} color="black" />
          ),
        }}
      />
    </Tabs>
  );
}
