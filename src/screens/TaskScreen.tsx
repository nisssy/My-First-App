import React from 'react';
import { View, StyleSheet, ScrollView} from 'react-native';
import DateRepresentor from '../components/DateComponent';
import Header from '../components/Header';
import MonthLabel from '../components/MonthLabel';
import TaskList from '../components/TaskList';

function Task() {
  return (
    <View style={styles.container}>
      <Header displayLogout={false} displayBack={false} title="やること" fontSize={28} />
      <DateRepresentor />
      <ScrollView>
        <MonthLabel />
        <TaskList />
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
