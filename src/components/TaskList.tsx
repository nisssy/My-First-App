import React from 'react';
import { View, StyleSheet} from 'react-native';
import AddListItem from './AddListItem';
import TaskListItem from './TaskListItem';

function TaskList() {
  return (
    <View style={styles.taskList}>
      <TaskListItem />
      <TaskListItem />
      <AddListItem />
    </View>
  )
}

const styles = StyleSheet.create({
  taskList: {
  },
  taskListItem: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  taskListItemTextContainer: {
    marginLeft: 32,
    justifyContent: 'center',
  },
  taskListItemText: {
    color: '#000',
    fontSize: 20,
  },
  taskListItemDeleteButton: {
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

export default TaskList;
