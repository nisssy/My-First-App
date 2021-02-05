import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ScrollView} from 'react-native';
import { Feather } from '@expo/vector-icons';
import DateRepresentor from '../components/DateComponent';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MilestoneList from '../components/MilestoneList';
import MonthLabel from '../components/MonthLabel';
import { variables } from '../lib/variables/stylingVariables';

function TodayToDo() {
  return (
    <View style={styles.container}>
      <Header />
      <DateRepresentor />

      <ScrollView>
        <MonthLabel />{/* やることがここに入るのでコンポーネントの名前位を変更することを検討する */}
        <MilestoneList />{/* リストコンポーネントの中身を別にコンポーネント化する必要あり */}
        <MilestoneList />{/* リストコンポーネントの中身を別にコンポーネント化する必要あり */}
        <View style={styles.todoTextContainer}>
          <Text style={styles.todoText}>その他やることメモ</Text>
          <TouchableOpacity style={styles.editButton}>
            <View style={styles.editButtonOuter}>
              <Feather name="edit" size={25} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.todayToDoList}>
          <Text style={styles.todayToDoListItem}>・ご飯を食べる</Text>
          <Text style={styles.todayToDoListItem}>・洗濯をする</Text>
          <Text style={styles.todayToDoListItem}>・日本酒を買う</Text>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
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
    top: 24,
    right: 40,
  },
  editButtonOuter: {
    top:0,
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: variables.mainColor,
    borderRadius: 32,
  },
});

export default TodayToDo;
