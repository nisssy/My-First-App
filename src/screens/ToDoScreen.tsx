import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import { Feather } from '@expo/vector-icons';
import DateRepresentor from '../components/DateComponent';
import Header from '../components/Header';
import MilestoneList from '../components/MilestoneList';
import MonthLabel from '../components/MonthLabel';
import { variables } from '../lib/variables/stylingVariables';

function TodayToDo(props) {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <Header displayLogout={false} displayBack={false} title="ToDo" fontSize={30} />
      <DateRepresentor />

      <ScrollView>
        <MonthLabel />{/* やることがここに入るのでコンポーネントの名前位を変更することを検討する  今日のやることとか？  */ }
        <MilestoneList navigation={navigation} />{/* リストコンポーネントの中身を別にコンポーネント化する必要あり */}
        <MilestoneList navigation={navigation} />{/* リストコンポーネントの中身を別にコンポーネント化する必要あり */}
        <View style={styles.todoTextContainer}>
          <Text style={styles.todoText}>その他やることメモ</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('ToDoEditor')}
          >
              <Feather name="edit" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.todayToDoList}>
          <Text style={styles.todayToDoListItem}>・ご飯を食べる</Text>
          <Text style={styles.todayToDoListItem}>・洗濯をする</Text>
          <Text style={styles.todayToDoListItem}>・日本酒を買う</Text>
        </View>
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
  todoTextContainer: {
    marginLeft: 24,
    marginTop: 16,
  },
  todoText: {
    fontSize: 24,
    lineHeight: 48,
    color: variables.mainColor,
  },
  todayToDoList: {
    flex: 1,
    marginLeft: 48,
  },
  todayToDoListItem: {
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
  },
});

export default TodayToDo;
