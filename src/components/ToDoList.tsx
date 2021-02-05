import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet} from 'react-native';

function ToDoList() {
  return (
    <View style={styles.todoList}>
          <View style={styles.todoListItem}>
            <View style={styles.todoListItemTextContainer}>
              <Text style={styles.todoListItemText}>
                ラ
              </Text>
            </View>
            <TouchableOpacity style={styles.todoListItemDeleteButton}>
              <Text>✖️</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.todoListItem}>
            <View style={styles.todoListItemTextContainer}>
              <Text style={styles.todoListItemText}>
                ランサーズに登録
              </Text>
            </View>
            <TouchableOpacity style={styles.todoListItemDeleteButton}>
              <Text>✖️</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.todoListItem}>
            <View style={styles.todoListItemTextContainer}>
              <Text style={styles.todoListItemText}>
                ランサーズに登録
              </Text>
            </View>
            <TouchableOpacity style={styles.todoListItemDeleteButton}>
              <Text>✖️</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.addListItem}>
            <View style={styles.addListItemInner}>
              <View style={styles.addListItemAddButton}>
                <Text>●</Text>
              </View>
              <View style={styles.addListItemTextContainer}>
                <Text style={styles.addListItemText}>
                  リストを追加する
                </Text>
              </View>
            </View>
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
