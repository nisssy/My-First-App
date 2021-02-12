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
  const { navigation } = props;
  const [list, setList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [now, setNow] = useState(new Date());
  const isFocused = useIsFocused();

  useEffect(() => {
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

        array.push({
          id: doc.id,
          title: doc.data().title,
          createdAt: doc.data().createdAt,
          start,
          end,
          achievement: doc.data().achievement,
        });
      });
      if (array.length > 0) setList(array);
    });
    return unsubscribe;
  }, [isFocused]);

  useEffect(() => {
    if (typeof list !== 'undefined') {
      setIsLoading(false);
    }
  }, [list]);

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
          title="マイルストーン"
          fontSize={26}
        />
        <DateRepresentor />
        <ScrollView>
          <ListLabel />
          <MilestoneList navigation={navigation} list={list} />
          <ListLabel />
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
});

export default Milestone;
