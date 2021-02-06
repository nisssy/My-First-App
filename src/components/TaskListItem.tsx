import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Icon from './Icon';

function TaskListItem() {
  return (
    <View style={styles.taskListItem}>
      <View style={styles.taskListItemTextContainer}>
        <Text style={styles.taskListItemText}>
          ラ
        </Text>
      </View>
      <TouchableOpacity style={styles.taskListItemDeleteButton}>
        <Icon name="Delete" size={20} color="#ccc" />
      </TouchableOpacity>
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
    backgroundColor: "#fff",
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
    width: 48,
    height: 48,
    right: 24,
    top: 28,
    alignItems: 'center',
  },
});

export default TaskListItem;
