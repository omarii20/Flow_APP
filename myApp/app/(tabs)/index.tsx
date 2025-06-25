import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import dayjs from 'dayjs';
import i18n, { getRTL } from '../../i18n';
import I18nText from '../../components/I18nText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedInput } from '@/components/ThemedInput';
import HorizontalDateScroll from '@/components/HorizontalDateScroll';
import LessonsList from '@/components/LessonsList';
import axios from 'axios';

interface LessonsPerDate {
  date: string;
  lessons: {
    id: string;
    lessonName: string;
    instructor: string;
    time: string;
    isRegistered: boolean;
  }[];
}

const CARD_WIDTH = 70;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function HomeScreen() {
  const [lessons, setLessons] = useState<Record<string, LessonsPerDate['lessons']>>({});
  const [filteredLessons, setFilteredLessons] = useState<LessonsPerDate['lessons']>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));

  const scrollRef = useRef<ScrollView>(null) as React.RefObject<ScrollView>;

  const today = dayjs().format('YYYY-MM-DD');
  const daysInMonth = dayjs().daysInMonth();
  const monthDates = Array.from({ length: daysInMonth }, (_, i) =>
    dayjs().startOf('month').add(i, 'day').format('YYYY-MM-DD')
  );

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await axios.get<LessonsPerDate[]>('https://68597c89138a18086dfe9925.mockapi.io/month-lessons');
        const map: Record<string, LessonsPerDate['lessons']> = {};
        res.data.forEach(entry => {
          const dateKey = dayjs(entry.date).format('YYYY-MM-DD');
          map[dateKey] = entry.lessons;
        });
        setLessons(map);
        const initial = map[selectedDate] || [];
        setFilteredLessons(initial);
      } catch (err) {
        console.error('Error loading lessons:', err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchLessons();
  }, []);
  

  const handleSearch = (text: string) => {
    setSearchText(text);
    const list = lessons[selectedDate] || [];
    setFilteredLessons(
      list.filter((lesson) =>
        lesson.lessonName.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const handleSelectDate = (date: string) => {
    setSelectedDate(date);
    setFilteredLessons(lessons[date] || []);
  };

  if (loading) return <ActivityIndicator size="large" style={styles.center} />;

  return (
    <ThemedView style={[styles.container, getRTL() && { direction: 'rtl' }]}>      
      <HorizontalDateScroll
        monthDates={monthDates}
        selectedDate={selectedDate}
        today={today}
        scrollRef={scrollRef}
        handleSelectDate={handleSelectDate}
      />

      <ThemedInput
        style={{ textAlign: getRTL() ? 'right' : 'left', marginBottom: 10 }}
        placeholder={i18n.t('search_placeholder')}
        value={searchText}
        onChangeText={handleSearch}
      />

      <ThemedView style={[styles.lessonsBox, getRTL() && { flexDirection: 'row' }]}>
        <I18nText style={styles.lessonsText} tKey="lessons_today" />
      </ThemedView>

      <LessonsList lessons={filteredLessons} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, padding: 10 },
  lessonsBox: {
    marginBottom: 10,
  },
  lessonsText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
