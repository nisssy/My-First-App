import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import AddListItem from './AddListItem';
import ToDoListItem from './ToDoListItem';

function ToDoList() {
  return (
    <View style={styles.todoList}>
      <ToDoListItem />
      <ToDoListItem />
      <AddListItem />
    </View>
  )
}

const styles = StyleSheet.create({
  todoList: {
  },
  todoListItem: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  todoListItemTextContainer: {
    marginLeft: 32,
    justifyContent: 'center',
  },
  todoListItemText: {
    color: '#000',
    fontSize: 20,
  },
  todoListItemDeleteButton: {
    position: 'absolute',
    right: 24,
    top: '50%',
  },
  addListItem: {
    width: '100%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addListItemInner: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  addListItemAddButton: {
    color: '#646464',
  },
  addListItemTextContainer: {
    marginLeft: 8,
  },
  addListItemText: {
    fontSize: 20,
    color: '#646464',
  },
  changeBorederColor: {
    borderWidth: 1,
    borderColor: '#fff',
  },
});

export default ToDoList;
