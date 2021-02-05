import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ScrollView} from 'react-native';
import DateRepresentor from '../components/DateComponent';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MonthLabel from '../components/MonthLabel';
import ToDoList from '../components/ToDoList';
import { variables } from '../lib/variables/stylingVariables';

function ToDo() {
  return (
    <View style={styles.container}>
      <Header />
      <DateRepresentor />
      <ScrollView>
        <MonthLabel />
        <ToDoList />
        <MonthLabel />
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
});

export default ToDo;
