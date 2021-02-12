import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import AddListItem from './AddListItem';
import TaskListItem from './TaskListItem';

function TaskList(props) {
  const { list, flag } = props;
  const [dataSet, setDataSet] = useState(list);
  useEffect(() => {
    setDataSet(list);
  }, [list]);

  if (JSON.stringify(dataSet) !== undefined) {
    const list = dataSet.filter(
      (element, index, self) =>
        self.findIndex((e) => e.id === element.id) === index
    );
    list.sort(function (a, b) {
      if (a.createdAt < b.createdAt) return 1;
      if (a.createdAt > b.createdAt) return -1;
      return 0;
    });
    return (
      <View style={styles.taskList}>
        {dataSet.map((data, index) => (
          <TaskListItem
            data={data}
            key={index}
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
      <AddListItem flag={flag} dataSet={dataSet} setDataSet={setDataSet} />
    </View>
  );
}

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
});

export default TaskList;
