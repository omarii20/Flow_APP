import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import dayjs from 'dayjs';
import { Background } from '@react-navigation/elements';

type User = {
  id: number;
  lessonName: string;
  instructor: string;
  time: string;
  isRegistered: boolean;
};

const getWeekDates = (): string[] => {
  const start = dayjs().startOf('week'); // ראשון
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
        console.log(res.data)
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

  if (loading)
    return <ActivityIndicator size="large" style={styles.center} />;

  return (
    <View style={styles.container}>
      {/* Scroll Row for Week Dates */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroll}>
        {weekDates.map((date, index) => {
          const isToday = date === today;
          return (
            <View key={index} style={[styles.dateBox, isToday && styles.todayBox]}>
              <Text style={[styles.dateText, isToday && styles.todayText]}>
                {dayjs(date).format('dd')}
              </Text>
              <Text style={[styles.dateText, isToday && styles.todayText]}>
                {dayjs(date).format('D/M')}
              </Text>
            </View>
          );
        })}
      </ScrollView>

      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="חפש לפי שם משתמש..."
        value={searchText}
        onChangeText={handleSearch}
      />

      {/* Lessons today text */}
        <View style={styles.lessonsBox}>
          <Text style={styles.lessonsText}>שיעורים להיום</Text>
        </View>

      {/* Users List */}
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.userBox}>
              <View>
                <Text style={styles.name}>{item.instructor}</Text>
                <Text style={styles.phone}>{item.lessonName}</Text>
                <Text style={styles.phone}>{item.time}</Text>
              </View>
              <Image
                source={{ uri: `https://i.pravatar.cc/60?img=${item.id}` }}
                style={styles.avatar}
              />
            </View>
        
            <View style={styles.BtnBox}>
              {item.isRegistered ? (
                <>
                  <TouchableOpacity style={[styles.Btn, { backgroundColor: '#f44336' }]}>
                    <Text style={styles.registerText}>בטל</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity style={styles.Btn}>
                  <Text style={styles.registerText}>הרשמה</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
        
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, padding: 15, backgroundColor: '#fff' },

  dateScroll: { 
    maxHeight:50,
    marginTop:50,
    marginBottom: 20
  },
  dateBox: {
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 10,
    marginRight: 8,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  todayBox: {
    backgroundColor: '#2196F3',
  },
  dateText: {
    fontSize: 14,
    color: '#000',
  },
  todayText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 15,
  },

  lessonsBox:{
    alignItems: 'flex-end',
  },
  lessonsText:{
    fontSize: 24,
    fontWeight: 'bold',
  },
  card: {
    alignItems:'flex-start',
    padding: 5,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 40,
  },

  name: { fontSize: 16, fontWeight: 'bold' },
  phone: { fontSize: 14, color: '#555' },

  userBox:{
    flexDirection:'row',
    justifyContent: 'space-around',
    width:'100%',
    padding:1,
  },
  BtnBox:{
    flexDirection:'row-reverse', 
    justifyContent:'center',
    width:'60%',
  },
  Btn: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    margin:2
  },
  registerText: {
    color: '#fff',
    fontSize: 14,
  },
});
