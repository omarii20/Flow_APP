import React from 'react';
import { ScrollView, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import dayjs from 'dayjs';
import { ThemedCard } from '@/components/ThemedCard';
import I18nText from '@/components/I18nText';
import { getRTL } from '@/i18n';

const CARD_WIDTH = 70;
const SCREEN_WIDTH = Dimensions.get('window').width;

interface Props {
  monthDates: string[];
  selectedDate: string;
  today: string;
  scrollRef: React.RefObject<ScrollView>;
  handleSelectDate: (date: string) => void;
}

const HorizontalDateScroll: React.FC<Props> = ({ monthDates, selectedDate, today, scrollRef, handleSelectDate }) => {
  return (
    <ScrollView
      horizontal
      ref={scrollRef}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[{ paddingHorizontal: 10 },getRTL() && { flexDirection: 'row-reverse' }]}
      style={styles.dateScroll}
    >
      {monthDates.map((date, index) => {
        const isToday = date === today;
        const isSelected = date === selectedDate;
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
              style={[
                styles.dateBox,
                isToday && styles.todayBox,
                isSelected && styles.selectedBox,
              ]}
            >
              <I18nText style={[styles.dateText, (isToday || isSelected) && styles.todayText]} tKey={dayKey} />
              <I18nText style={[styles.dateText, (isToday || isSelected) && styles.todayText]}>
                {dayjs(date).format('D/M')}
              </I18nText>
            </ThemedCard>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dateScroll: {
    maxHeight: 80,
    marginTop: 40,
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
  dateText: {
    fontSize: 14,
  },
  todayText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HorizontalDateScroll;
