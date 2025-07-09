import React from 'react';
import { ScrollView, TouchableOpacity, Dimensions, StyleSheet, View, Text } from 'react-native';
import dayjs from 'dayjs';
import { ThemedCard } from '@/components/ThemedCard';
import I18nText from '@/components/I18nText';
import { getRTL } from '@/i18n';

const CARD_WIDTH = 70;
const SCREEN_WIDTH = Dimensions.get('window').width;

interface Lesson {
  id: string;
  lessonName: string;
  instructor: string;
  time: string;
  isRegistered: boolean;
}

interface LessonsByDate {
  id: string;
  date: string;
  lessons: Lesson[];
}

interface Props {
  monthDates: string[];
  selectedDate: string;
  today: string;
  scrollRef: React.RefObject<ScrollView>;
  handleSelectDate: (date: string) => void;
  lessonsData: LessonsByDate[];
  currentMonth: dayjs.Dayjs;
  onChangeMonth: (month: dayjs.Dayjs) => void;
}

const HorizontalDateScroll: React.FC<Props> = ({
  monthDates = [],
  selectedDate,
  today,
  scrollRef,
  handleSelectDate,
  lessonsData = [],
  currentMonth,
  onChangeMonth
}) => {
  const datesWithLessons = new Set(lessonsData.map(item => item.date));
  const isRTL = getRTL();

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => onChangeMonth(currentMonth.subtract(1, 'month'))}
        >
          <Text style={styles.arrowText}>{isRTL ? '‹' : '‹'}</Text>
        </TouchableOpacity>

        <View style={styles.monthTextWrapper}>
          <I18nText tKey={currentMonth.format('MMMM').toLowerCase()} style={styles.headerText} />
          <Text style={styles.headerText}> {currentMonth.format('YYYY')}</Text>
        </View>

        <TouchableOpacity
          onPress={() => onChangeMonth(currentMonth.add(1, 'month'))}
        >
          <Text style={styles.arrowText}>{isRTL ? '›' : '›'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        ref={scrollRef}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[{ paddingHorizontal: 10 }]}
        style={[styles.dateScroll, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}
      >
        {monthDates.map((date, index) => {
          const isToday = date === today;
          const isSelected = date === selectedDate;
          const hasLessons = datesWithLessons.has(date);
          const dayKey = [
            'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday',
          ][dayjs(date).day()];

          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleSelectDate(date)}
              onLayout={(e) => {
                if (date === today) {
                  const { x } = e.nativeEvent.layout;
                  scrollRef.current?.scrollTo({ x: x - SCREEN_WIDTH / 2 + CARD_WIDTH / 2, animated: true });
                }
              }}
            >
              <ThemedCard
                style={[styles.dateBox, isToday && styles.todayBox, isSelected && styles.selectedBox]}
              >
                <I18nText style={[styles.dateText, (isToday || isSelected) && styles.todayText]} tKey={dayKey} />
                <I18nText style={[styles.dateText, (isToday || isSelected) && styles.todayText]}>
                  {dayjs(date).format('D/M')}
                </I18nText>
                <View style={styles.dotWrapper}>
                  {hasLessons && <View style={styles.dot} />}
                </View>
              </ThemedCard>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  monthTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 50,
    color: '#2196F3',
    lineHeight: 40,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '800',
  },
  dateScroll: {
    maxHeight: 80,
  },
  dateBox: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginRight: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    width: CARD_WIDTH,
  },
  todayBox: {
    backgroundColor: '#2196F3',
  },
  selectedBox: {
    backgroundColor: '#90CAF9',
  },
  dotWrapper: {
    height: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2196F3',
  },
  dateText: {
    fontSize: 14,
  },
  todayText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HorizontalDateScroll;
