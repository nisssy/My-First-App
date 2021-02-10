import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView} from 'react-native';
import DateRepresentor from '../components/DateComponent';
import Header from '../components/Header';
import MonthLabel from '../components/MonthLabel';
import TaskList from '../components/TaskList';
import firebase from 'firebase';

function Task() {
  const [list, setList] = useState()
  function arrayFilter(array: []) {
    const filteredList = array.filter((element, index, self) =>
      self.findIndex(e =>
        e.id === element.id
      ) === index
    );
        setList(filteredList)
    }
  useEffect(() => {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    const ref = db.collection(`users/${currentUser?.uid}/task`).orderBy('end', 'asc');
    let unsubscribe;
    const array: any = [];
    unsubscribe = ref.onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        array.push({
          id: doc.id,
          title: doc.data().title,
          createdAt: doc.data().createdAt,
        })
      })
      if(array !== undefined)arrayFilter(array);
    })
    return unsubscribe;
  }, [])

  return (
    <View style={styles.container}>
      <Header displayLogout={false} displayBack={false} title="やること" fontSize={28} />
      <DateRepresentor />
      <ScrollView>
        <MonthLabel />
        <TaskList list={list} />
        <MonthLabel />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
});

export default Task;
