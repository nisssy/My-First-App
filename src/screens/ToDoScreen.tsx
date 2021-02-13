import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import firebase from 'firebase';
import { StackNavigationProp } from '@react-navigation/stack';
import DateRepresentor from '../components/DateComponent';
import Header from '../components/Header';
import MilestoneList from '../components/MilestoneList';
import ListLabel from '../components/ListLabel';
import { variables } from '../utils/variables/stylingVariables';
import TimeContext from '../contexts/TimeContext';
import Memo from '../components/Memo';
import CircleButton from '../components/CircleButton';
import { ToDoTabParamList } from '../types/navigation';
import { TaskForMilestone, TaskForToDo } from '../types/task';

type Props = {
  navigation: StackNavigationProp<ToDoTabParamList, 'ToDo'>;
};

const ToDo: React.FC<Props> = ({ navigation }: Props) => {
  const [now, setNow] = useState<Date>(new Date());
  const [list, setList] = useState<TaskForMilestone[]>([]);
  const [memo, setMemo] = useState<any>();
  const todoScreenIsFocused = useIsFocused();

  const asyncFilter = (array: TaskForToDo[], today: number) => {
    const filteredList = array.filter(
      (element, index, self) =>
        self.findIndex((e) => e.id === element.id) === index
    );
    const result: any = filteredList.filter((item) => {
      return (
        item.startFilter === today ||
        item.endFilter === today ||
        (item.startFilter < today && item.endFilter > today)
      );
    });
    if (typeof list !== 'undefined') setList(result);
  };

  useEffect(() => {
    const { currentUser } = firebase.auth();
    const unsubscribe = () => {};
    if (currentUser) {
      const db = firebase.firestore();
      const ref = db.collection(`users/${currentUser?.uid}/memo`).doc('memo');
      ref.get().then((doc): any => {
        setMemo(doc.data());
      });
    }
    return unsubscribe;
  }, []);

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
        const startFilter =
          checkStart !== null
            ? Math.floor(doc.data().start.seconds / seconds / minutes / hour)
            : null;
        const endFilter =
          checkStart !== null
            ? Math.floor(doc.data().end.seconds / seconds / minutes / hour)
            : null;
        const end = checkEnd !== null ? doc.data().end.seconds * mm : null;
        const start = checkEnd !== null ? doc.data().start.seconds * mm : null;
        await array.push({
          id: doc.id,
          title: doc.data().title,
          changed: doc.data().changed,
          start,
          end,
          startFilter,
          endFilter,
          achievement: doc.data().achievement,
        });
      });
      asyncFilter(array, today);
    });
    return unsubscribe;
  }, [todoScreenIsFocused]);

  return (
    <TimeContext.Provider value={now}>
      <View style={styles.container}>
        <Header
          displayLogout={false}
          displayBack={false}
          title="ToDo"
          fontSize={30}
        />
        <DateRepresentor displayYear displayMonth displayDate />
        <ScrollView>
          <ListLabel label="やることリスト" />
          {list.length === 0 && (
            <View style={styles.messageContainer}>
              <Text style={styles.message}>
                Milestoneタブで〆切を設定すると
              </Text>
              <Text style={styles.message}>
                今日やることがここに表示されます！
              </Text>
            </View>
          )}
          {list.length !== 0 && (
            <MilestoneList navigation={navigation} list={list} />
          )}

          <View style={styles.todoTextContainer}>
            <Text style={styles.todoText}>その他やることメモ</Text>
            <CircleButton
              name="edit"
              onPress={() => navigation.navigate('ToDoEditor')}
              style={styles.editButton}
            />
          </View>
          <View style={styles.ToDoMemo}>
            <Memo data={memo} />
          </View>
        </ScrollView>
      </View>
    </TimeContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
  todoTextContainer: {
    marginLeft: 24,
    marginTop: 56,
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
  messageContainer: {
    height: 64,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  message: {
    fontSize: 16,
    lineHeight: 24,
    color: '#646464',
  },
});

export default ToDo;
