import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import firebase from 'firebase';
import { useIsFocused } from '@react-navigation/native';
import InputScrollView from 'react-native-input-scroll-view';
import DateRepresentor from '../components/DateComponent';
import Header from '../components/Header';
import ListLabel from '../components/ListLabel';
import TaskList from '../components/TaskList';
import { Task } from '../types/task';

const TaskScreen: React.FC = () => {
  const [listThisMonth, setListThisMonth] = useState<Task[]>();
  const [listNextMonth, setListNextMonth] = useState<Task[]>();
  const [list, setList] = useState<Task[]>();
  const [thisMonth, setThisMonth] = useState<number>(0);
  const [nextMonth, setNextMonth] = useState<number>(0);
  const taskScreenIsFocused = useIsFocused();
  const flagThisMonth = true;
  const flagNextMonth = false;

  useEffect(() => {
    if (typeof list !== 'undefined') {
      arrayFilter(list);
    }
  }, [list]);
  const arrayFilter = (array: Task[]) => {
    const filteredList = array.filter(
      (element, index, self) =>
        self.findIndex((e) => e.id === element.id) === index
    );
    const setJSMonthToRealMonth = 1;
    const arrayThisMonth = filteredList.filter(
      (item) =>
        item.start.getMonth() + setJSMonthToRealMonth === thisMonth ||
        item.end.getMonth() + setJSMonthToRealMonth === thisMonth ||
        (item.start.getMonth() + setJSMonthToRealMonth < thisMonth &&
          item.start.getMonth() + setJSMonthToRealMonth > nextMonth)
    );
    const arrayNextMonth = filteredList.filter(
      (item) => item.start.getMonth() + setJSMonthToRealMonth >= nextMonth
    );
    setListThisMonth(arrayThisMonth);
    setListNextMonth(arrayNextMonth);
  };

  useEffect(() => {
    const thisMonthRaw = new Date().getMonth() + 1;
    const nextMonthRaw = thisMonthRaw + 1;
    setThisMonth(thisMonthRaw);
    setNextMonth(nextMonthRaw);
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    const ref = db
      .collection(`users/${currentUser?.uid}/task`)
      .orderBy('end', 'asc');
    const array: any = [];
    const unsubscribe = ref.onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        const mm = 1000;
        const fixError = 1.00001;
        array.push({
          id: doc.id,
          title: doc.data().title,
          start: new Date(doc.data().start.seconds * (mm * fixError)),
          end: new Date(doc.data().start.seconds * (mm * fixError)),
          achievement: doc.data().achievement,
          createdAt: doc.data().createdAt,
        });
      });

      if (array.length !== 0) {
        setList(array);
      }
    });
    return unsubscribe;
  }, [taskScreenIsFocused]);

  return (
    <View style={styles.container}>
      <Header
        displayLogout={false}
        displayBack={false}
        title="やること"
        fontSize={28}
      />
      <DateRepresentor displayYear displayMonth displayDate={false} />
      <InputScrollView keyboardOffset={250}>
        <ListLabel label="今月" />
        <TaskList list={listThisMonth} flag={flagThisMonth} />
        <ListLabel label="来月" />
        <TaskList list={listNextMonth} flag={flagNextMonth} />
        <View style={styles.footer} />
      </InputScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  footer: {
    height: 80,
  },
});

export default TaskScreen;
