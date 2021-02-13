import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Task } from '../types/task';
import AddListItem from './AddListItem';
import TaskListItem from './TaskListItem';

type Props = {
  list: Task[] | undefined;
  flag: boolean;
};

const TaskList = ({ list, flag }: Props) => {
  const [dataSet, setDataSet] = useState<Task[] | undefined>(list);
  useEffect(() => {
    setDataSet(list);
  }, [list]);

  if (typeof dataSet !== 'undefined') {
    const array = dataSet.filter(
      (element, index, self) =>
        self.findIndex((e) => e.id === element.id) === index
    );
    array.sort((a, b) => {
      if (a.createdAt < b.createdAt) return 1;
      if (a.createdAt > b.createdAt) return -1;
      return 0;
    });
    return (
      <View style={styles.taskList}>
        {dataSet.map((data) => (
          <TaskListItem
            data={data}
            key={data.id}
            dataSet={dataSet}
            setDataSet={setDataSet}
          />
        ))}
        <AddListItem flag={flag} dataSet={dataSet} setDataSet={setDataSet} />
      </View>
    );
  }

  return (
    <View style={styles.taskList}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>目標に向けてやることを追加しよう！</Text>
      </View>
      <AddListItem flag={flag} dataSet={dataSet} setDataSet={setDataSet} />
    </View>
  );
};

const styles = StyleSheet.create({
  taskList: {},
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
  text: {
    fontSize: 16,
    lineHeight: 48,
    color: '#646464',
  },
  textContainer: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
});

export default TaskList;
