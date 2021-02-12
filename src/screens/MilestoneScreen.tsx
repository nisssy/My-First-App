import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import firebase from 'firebase';
import DateRepresentor from '../components/DateComponent';
import Header from '../components/Header';
import MilestoneList from '../components/MilestoneList';
import ListLabel from '../components/ListLabel';
import TimeContext from '../contexts/TimeContext';

function Milestone(props) {
  const [listThisMonth, setListThisMonth] = useState([]);
  const [listNextMonth, setListNextMonth] = useState([]);
  const [thisMonth, setThisMonth] = useState(1);
  const [nextMonth, setNextMonth] = useState(1);
  const { navigation } = props;
  const [list, setList] = useState();
  const [now, setNow] = useState(new Date());
  const isFocused = useIsFocused();

  function arrayFilter(list: []) {
    const filteredList = list.filter(
      (element, index, self) =>
        self.findIndex((e) => e.id === element.id) === index
    );
    const setJSMonthToRealMonth = 1;
    const arrayThisMonth = filteredList.filter(
      (item) =>
        item.startFilter.getMonth() + setJSMonthToRealMonth === thisMonth ||
        item.endFilter.getMonth() + setJSMonthToRealMonth === thisMonth ||
        (item.startFilter.getMonth() + setJSMonthToRealMonth < thisMonth &&
          item.startFilter.getMonth() + setJSMonthToRealMonth > nextMonth)
    );
    const arrayNextMonth = filteredList.filter(
      (item) => item.startFilter.getMonth() + setJSMonthToRealMonth >= nextMonth
    );
    setListThisMonth(arrayThisMonth);
    setListNextMonth(arrayNextMonth);
  }
  useEffect(() => {
    if (typeof list !== 'undefined') {
      arrayFilter(list);
    }
  }, [list]);
  useEffect(() => {
    const thisMonthRaw = new Date().getMonth() + 1;
    const nextMonthRaw = thisMonthRaw + 1;
    setThisMonth(thisMonthRaw);
    setNextMonth(nextMonthRaw);
    setNow(new Date());
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    const ref = db
      .collection(`users/${currentUser?.uid}/task`)
      .orderBy('end', 'asc');
    const array: any = [];
    const unsubscribe = ref.onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        const checkStart = doc.data().start;
        const checkEnd = doc.data().start;
        const timeFirestoreToTimeJS = 1000;
        const start =
          checkStart !== null
            ? doc.data().start.seconds * timeFirestoreToTimeJS
            : null;
        const end =
          checkEnd !== null
            ? doc.data().end.seconds * timeFirestoreToTimeJS
            : null;
        const mm = 1000;
        const fixr = 1.00001;
        array.push({
          id: doc.id,
          title: doc.data().title,
          changed: doc.data().changed,
          startFilter: new Date(doc.data().start.seconds * (mm * fixr)),
          endFilter: new Date(doc.data().start.seconds * (mm * fixr)),
          start,
          end,
          achievement: doc.data().achievement,
        });
      });
      if (typeof array !== 'undefined') setList(array);
    });
    return unsubscribe;
  }, [isFocused]);

  if (listThisMonth.length === 0 && listNextMonth.length === 0) {
    return (
      <View style={styles.container}>
        <Header
          displayLogout={false}
          displayBack={false}
          title="マイルストーン"
          fontSize={26}
        />
        <DateRepresentor displayYear displayMonth />
        <ScrollView>
          <ListLabel />
          <View style={styles.textContainer}>
            <Text style={styles.text}>Taskタブにリストを追加して</Text>
            <Text style={styles.text}>マイルストーンを表示しよう！</Text>
          </View>
          <ListLabel />
        </ScrollView>
      </View>
    );
  }

  return (
    <TimeContext.Provider value={now}>
      <View style={styles.container}>
        <Header
          displayLogout={false}
          displayBack={false}
          title="マイルストーン"
          fontSize={26}
        />
        <DateRepresentor displayYear displayMonth />
        <ScrollView>
          <ListLabel label="今月" />
          <MilestoneList navigation={navigation} list={listThisMonth} />
          <ListLabel label="来月" />
          <MilestoneList navigation={navigation} list={listNextMonth} />
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
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 24,
  },
  text: {
    fontSize: 19,
    lineHeight: 30,
    color: '#646464',
  },
});

export default Milestone;
