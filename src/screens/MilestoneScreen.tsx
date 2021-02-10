import React, {useEffect, useState} from 'react';
import { View, StyleSheet, ScrollView, Text} from 'react-native';
import DateRepresentor from '../components/DateComponent';
import Header from '../components/Header';
import MilestoneList from '../components/MilestoneList';
import MonthLabel from '../components/MonthLabel';
import {useIsFocused} from '@react-navigation/native';
import firebase from 'firebase';
import TimeContext from '../contexts/TimeContext';
import { utcToZonedTime } from 'date-fns-tz';

function Milestone(props) {
  const { navigation } = props;
  const [list, setList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [now, setNow] =useState(new Date())
  const isFocused = useIsFocused()

  useEffect(() => {
    setNow(new Date())
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    const ref = db.collection(`users/${currentUser?.uid}/task`).orderBy('end', 'asc')
    let unsubscribe;
    const array: any = [];
    unsubscribe = ref.onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        const checkStart = doc.data().start;
        const checkEnd = doc.data().start;
        const start = checkStart !== null ?  doc.data().start.seconds * 1000 : null ;
        const end = checkEnd !== null ?  doc.data().end.seconds * 1000 : null ;

        array.push({
          id: doc.id,
          title: doc.data().title,
          createdAt: doc.data().createdAt,
          start: start,
          end: end,
          achievement: doc.data().achievement,
        })
      })
      if(array.length > 0) setList(array);

    })
    return unsubscribe;
  }, [isFocused]);


  useEffect(() => {
    if(list !== undefined) {
      setIsLoading(false);
    }
  }, [list])

  if(isLoading) {
    return (
      <View><Text>Nowloading</Text></View>
    )
  }

  return (
    <TimeContext.Provider value={now}>
      <View style={styles.container}>
      <Header displayLogout={false} displayBack={false} title="マイルストーン" fontSize={26} />
      <DateRepresentor />
      <ScrollView>
        <MonthLabel />
        <MilestoneList navigation={navigation} list={list} />
        <MonthLabel />
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
