import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ScrollView} from 'react-native';
import DateRepresentor from '../components/DateRepresentor';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MonthLabel from '../components/MonthLabel';
import ToDoList from '../components/ToDoList';
import { variables } from '../lib/stylingVariables/stylingVariables';

function ToDo() {
  return (
    <View style={styles.container}>
      <Header />
      <DateRepresentor />
      <ScrollView>
        <MonthLabel /> {/* ここが今月で表示される */}
        <ToDoList />
        <MonthLabel /> {/* 来月のところを記入する */}
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
  header: {
    height: 104,
    backgroundColor: variables.mainColor,
    justifyContent: 'flex-end',
  },
  inner: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  screenTitle: {
    color: '#fff',
    fontSize: 30,
    lineHeight: 30,
    marginBottom: 8,
  },
  logout: {
    color: '#fff',
    position: 'absolute',
    right: 48,
    fontSize: 14,
    lineHeight: 14,
    bottom: 14,
  },
  yearContainer: {
    height: 72,
    justifyContent: 'center',
  },
  year: {
    marginLeft: 16,
    fontSize: 32,
  },
  yearKanji: {
    fontSize: 24,
  },


  footer: {
    width: '100%',
    height: 80,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    borderColor: '#fff',
    borderTopColor: '#ccc',
    borderWidth: 1,
  },
  footerList: {
    flexDirection: 'row',
  },
  footerListItem: {
  },
});

export default ToDo;
