import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import firebase from 'firebase';
import DateRepresentor from '../components/DateComponent';
import Header from '../components/Header';
import MilestoneList from '../components/MilestoneList';
import MonthLabel from '../components/MonthLabel';
import { variables } from '../lib/variables/stylingVariables';
import TimeContext from '../contexts/TimeContext';
import Memo from '../components/Memo';
import CircleButton from '../components/CircleButton';

function ToDo(props) {
  const { navigation } = props;
  const [now, setNow] = useState(new Date());
  const [list, setList] = useState([]);
  const todoScreenIsFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState([]);
  const [data, setData] = useState([]);

  async function asyncFilter(array: [], today) {
    const filteredList = array.filter(
      (element, index, self) =>
        self.findIndex((e) => e.id === element.id) === index
    );
    const result = filteredList.filter((item) => {
      return (
        item.startForSort === today ||
        item.endForSort === today ||
        (item.startForSort < today && item.endForSort > today)
      );
    });
    if (typeof list !== 'undefined') setList(result);
  }

  useEffect(() => {
    const { currentUser } = firebase.auth();
    const unsubscribe = () => {};
    if (currentUser) {
      const db = firebase.firestore();
      const ref = db.collection(`users/${currentUser?.uid}/memo`).doc('memo');
      ref.get().then((doc) => {
        setData(doc.data());
      });
    }
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (typeof data !== 'undefined') {
      setIsLoading(false);
    }
  }, [data]);

  useEffect(() => {
    const hour = 24;
    const minutes = 60;
    const seconds = 60;
    const mm = 1000;
    setNow(new Date());
    const today = Math.floor(now.getTime() / mm / seconds / minutes / hour);
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    const ref = db
      .collection(`users/${currentUser?.uid}/task`)
      .orderBy('end', 'asc');
    const array: any = [];
    const unsubscribe = ref.onSnapshot((snapshot) => {
      snapshot.forEach(async (doc) => {
        const checkStart = doc.data().start;
        const checkEnd = doc.data().start;
        const startForSort =
          checkStart !== null
            ? Math.floor(doc.data().start.seconds / seconds / minutes / hour)
            : null;
        const endForSort =
          checkStart !== null
            ? Math.floor(doc.data().end.seconds / seconds / minutes / hour)
            : null;
        const end = checkEnd !== null ? doc.data().end.seconds * mm : null;
        const start = checkEnd !== null ? doc.data().start.seconds * mm : null;
        await array.push({
          id: doc.id,
          title: doc.data().title,
          createdAt: doc.data().createdAt,
          start,
          end,
          startForSort,
          endForSort,
          achievement: doc.data().achievement,
        });
      });
      asyncFilter(array, today);
    });
    return unsubscribe;
  }, [todoScreenIsFocused]);

  if (isLoading) {
    return (
      <View>
        <Text>Nowloading</Text>
      </View>
    );
  }

  return (
    <TimeContext.Provider value={now}>
      <View style={styles.container}>
        <Header
          displayLogout={false}
          displayBack={false}
          title="ToDo"
          fontSize={30}
        />
        <DateRepresentor />
        <ScrollView>
          <MonthLabel />
          <MilestoneList navigation={navigation} list={list} />
          <View style={styles.todoTextContainer}>
            <Text style={styles.todoText}>その他やることメモ</Text>
            <CircleButton
              name="edit"
              onPress={() => navigation.navigate('ToDoEditor')}
              style={styles.editButton}
            />
          </View>
          <View style={styles.ToDoMemo}>
            <Memo data={data} />
          </View>
        </ScrollView>
      </View>
    </TimeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
  todoTextContainer: {
    marginLeft: 24,
    marginTop: 16,
  },
  todoText: {
    fontSize: 24,
    lineHeight: 48,
    color: variables.mainColor,
  },
  ToDoMemo: {
    flex: 1,
    marginTop: 64,
    marginLeft: 40,
  },
  ToDoListItem: {
    fontSize: 16,
    lineHeight: 32,
  },
  editButton: {
    position: 'absolute',
    top: 12,
    right: 40,
  },
});

export default ToDo;
