import React from 'react';
import { FlatList, Image, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedCard } from '@/components/ThemedCard';
import { ThemedButton } from '@/components/ThemedButton';
import I18nText from '@/components/I18nText';
import i18n, { getRTL } from '@/i18n';

interface Lesson {
  id: string;
  lessonName: string;
  instructor: string;
  time: string;
  isRegistered: boolean;
}

interface Props {
  lessons: Lesson[];
}

const LessonsList: React.FC<Props> = ({ lessons }) => {
  if (lessons.length === 0) {
    return (
      <ThemedView style={styles.noLessonsBox}>
        <I18nText style={styles.noLessonsText} tKey="no_lessons_today" />
      </ThemedView>
    );
  }

  return (
    <FlatList
      data={lessons}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ThemedCard style={{ marginBottom: 10 }}>
          <ThemedView style={[styles.userBox, getRTL() && { flexDirection: 'row' }]}>
            <ThemedView>
              <I18nText style={styles.name}>{item.lessonName}</I18nText>
              <I18nText style={styles.phone}>{item.instructor}</I18nText>
              <I18nText style={styles.phone}>{item.time}</I18nText>
            </ThemedView>
            <Image
              source={{ uri: `https://i.pravatar.cc/60?img=${item.id}` }}
              style={styles.avatar}
            />
          </ThemedView>

          <ThemedView style={styles.BtnBox}>
            {item.isRegistered ? (
              <ThemedButton title={i18n.t('cancel')} style={{ backgroundColor: '#f44336' }} />
            ) : (
              <ThemedButton title={i18n.t('register')} />
            )}
          </ThemedView>
        </ThemedCard>
      )}
    />
  );
};

const styles = StyleSheet.create({
  userBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 1,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 40,
  },
  name: { fontSize: 16, fontWeight: 'bold' },
  phone: { fontSize: 14 },
  BtnBox: {
    justifyContent: 'center',
    width: '50%',
  },
  noLessonsBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  noLessonsText: {
    fontSize: 18,
    color: '#999',
  },
});

export default LessonsList;
