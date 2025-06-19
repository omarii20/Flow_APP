// ✅ index.tsx (מעודכן עם תמיכה ב־i18n ו־RTL)
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ScrollView,
  Image,
  I18nManager,
} from 'react-native';
import axios from 'axios';
import dayjs from 'dayjs';
import i18n, { getRTL } from '../../i18n';
import I18nText from '../../components/I18nText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedInput } from '@/components/ThemedInput';
import { ThemedCard } from '@/components/ThemedCard';
import { ThemedButton } from '@/components/ThemedButton';


type User = {
  id: number;
  lessonName: string;
  instructor: string;
  time: string;
  isRegistered: boolean;
};

const getWeekDates = (): string[] => {
  const start = dayjs().startOf('week');
  return Array.from({ length: 7 }, (_, i) =>
    start.add(i, 'day').format('YYYY-MM-DD')
  );
};

export default function HomeScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  const today = dayjs().format('YYYY-MM-DD');
  const weekDates = getWeekDates();

  useEffect(() => {
    axios
      .get<User[]>('https://685162198612b47a2c09d36e.mockapi.io/INFO-LESSONS')
      .then((res) => {
        setUsers(res.data);
        setFilteredUsers(res.data);
      })
      .catch((err) => {
        console.error('Error loading users:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (text: string) => {
    setSearchText(text);
    setFilteredUsers(
      users.filter((user) =>
        user.lessonName.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  if (loading) return <ActivityIndicator size="large" style={styles.center} />;

  return (
    <ThemedView style={[styles.container, getRTL() && { direction: 'rtl' }]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[styles.dateScroll, getRTL() && { flexDirection: 'row-reverse' }]}
      >
        {weekDates.map((date, index) => {
          const isToday = date === today;
          const dayKey = [
            'sunday',
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
          ][dayjs(date).day()];

          return (
            <ThemedCard key={index} style={[styles.dateBox, isToday && styles.todayBox]}>
              <I18nText style={[styles.dateText, isToday && styles.todayText]} tKey={dayKey} />
              <I18nText style={[styles.dateText, isToday && styles.todayText]}>
                {dayjs(date).format('D/M')}
              </I18nText>
            </ThemedCard>
          );
        })}
      </ScrollView>

      <ThemedInput
        style={{ textAlign: getRTL() ? 'right' : 'left', marginBottom: 10 }}
        placeholder={i18n.t('search_placeholder')}
        value={searchText}
        onChangeText={handleSearch}
      />

      <ThemedView style={[styles.lessonsBox, getRTL() && { flexDirection: 'row' }]}>
        <I18nText style={styles.lessonsText} tKey="lessons_today" />
      </ThemedView>

      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ThemedCard style={{ marginBottom: 10 }}>
            <ThemedView style={[styles.userBox, getRTL() && { flexDirection: 'row' }]}>
              <ThemedView>
                <I18nText style={styles.name}>{item.instructor}</I18nText>
                <I18nText style={styles.phone}>{item.lessonName}</I18nText>
                <I18nText style={styles.phone}>{item.time}</I18nText>
              </ThemedView>
              <Image
                source={{ uri: `https://i.pravatar.cc/60?img=${item.id}` }}
                style={styles.avatar}
              />
            </ThemedView>

            <ThemedView style={[styles.BtnBox]}>
              {item.isRegistered ? (
                <ThemedButton
                  title={i18n.t('cancel')}
                  style={{ backgroundColor: '#f44336' }}
                />
              ) : (
                <ThemedButton title={i18n.t('register')} />
              )}
            </ThemedView>
          </ThemedCard>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, padding: 15 },
  dateScroll: {
    maxHeight: 50,
    marginTop: 50,
    marginBottom: 20,
  },
  dateBox: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginRight: 8,
    borderRadius: 5,
  },
  todayBox: {
    backgroundColor: '#2196F3',
  },
  dateText: {
    fontSize: 14,
  },
  todayText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  lessonsBox: {
    marginBottom: 10,
  },
  lessonsText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 40,
  },
  name: { fontSize: 16, fontWeight: 'bold' },
  phone: { fontSize: 14 },
  userBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 1,
  },
  BtnBox: {
    justifyContent: 'center',
    width: '50%',
  },
});
