import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import { Feather } from '@expo/vector-icons';
import DateRepresentor from '../components/DateComponent';
import Header from '../components/Header';
import MilestoneList from '../components/MilestoneList';
import MonthLabel from '../components/MonthLabel';
import { variables } from '../lib/variables/stylingVariables';
import { useIsFocused } from '@react-navigation/native';
import firebase from 'firebase';
import TimeContext from '../contexts/TimeContext';
import Memo from '../components/Memo';

function ToDo(props) {
  const { navigation } = props;
  const [now, setNow] = useState(new Date());
  const [list, setList] = useState([])
  const todoScreenIsFocused= useIsFocused()

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { currentUser } = firebase.auth();
    let unsubscribe = () => {};
    if(currentUser) {
      const db = firebase.firestore();
      const ref = db.collection(`users/${currentUser?.uid}/memo`).doc('memo');
      ref.get().then(doc => {
        setData(doc.data());
      })
    }
    return unsubscribe;
  }, [])

  useEffect(() => {
    if(data.length = 0 ) {
      setIsLoading(false)
    }
  }, [data])



  async function asyncFilter(array: [], today) {

    const filteredList = array.filter((element, index, self) =>
      self.findIndex(e =>
        e.id === element.id
      ) === index
    );
    const result = filteredList.filter(item => {
      return item.startForSort === today || item.endForSort === today || item.startForSort < today && item.endForSort > today
    })
    if(list !== undefined) setList(result);
  }
  useEffect(() => {

    setNow(new Date())
    const today = Math.floor(now.getTime() / 1000 / 60 / 60 / 24)

    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    const ref = db.collection(`users/${currentUser?.uid}/task`).orderBy('end', 'asc')
    let unsubscribe;
    const array: any = [];
    unsubscribe = ref.onSnapshot((snapshot) => {
      snapshot.forEach(async (doc) => {
        const checkStart = doc.data().start;
        const checkEnd = doc.data().start;

        const startForSort = checkStart !== null ? Math.floor(doc.data().start.seconds / 60 / 60 / 24) : null;
        const endForSort = checkStart !== null ? Math.floor(doc.data().end.seconds / 60 / 60 / 24) : null;
        const end = checkEnd !== null ? doc.data().end.seconds * 1000 : null;
        const start = checkEnd !== null ? doc.data().start.seconds * 1000 : null;
        await array.push({
          id: doc.id,
          title: doc.data().title,
          createdAt: doc.data().createdAt,
          start,
          end,
          startForSort,
          endForSort,
          achievement: doc.data().achievement,
        })
      })
      asyncFilter(array, today)
    })
    return unsubscribe;
  }, [todoScreenIsFocused]);

  return (
    <TimeContext.Provider value={now}>
      <View style={styles.container}>
      <Header displayLogout={false} displayBack={false} title="ToDo" fontSize={30} />
      <DateRepresentor />

      <ScrollView>
        <MonthLabel />{/* やることがここに入るのでコンポーネントの名前位を変更することを検討する  今日のやることとか？  */ }
        <MilestoneList navigation={navigation} list={list} />
        <View style={styles.todoTextContainer}>
          <Text style={styles.todoText}>その他やることメモ</Text>
            <TouchableOpacity
            onPress={() => navigation.navigate('ToDoEditor')}
            style={styles.editButton}
          >
              <Feather name="edit" size={25} color="#fff" style={styles.icon} />
            </TouchableOpacity>

        </View>
        <View style={styles.ToDoList}>
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
  ToDoList: {
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
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: variables.mainColor,
    borderRadius: 32,
    zIndex: 900,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    elevation: 8,
  },
});

export default ToDo;
