import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import Icon from './Icon';

function ToDoListItem() {
  return (
    <View style={styles.todoListItem}>
      <View style={styles.todoListItemTextContainer}>
        <Text style={styles.todoListItemText}>
          ラ
        </Text>
      </View>
      <TouchableOpacity style={styles.todoListItemDeleteButton}>
        <Icon name="Delete" size={20} color="#ccc" />
      </TouchableOpacity>
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
    width: 48,
    height: 48,
    right: 24,
    top: 28,
    alignItems: 'center',
  },
});

export default ToDoListItem;
