import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet, TextInput } from 'react-native';
import Icon from './Icon';

function TaskListItem() {
  const [text, setText] = useState('')
  // function handlePress() {}

  return (
    <View style={styles.taskListItem}>
      <View style={styles.taskListItemTextContainer}>
      {/* <TextField
        fullWidth={true}
        onChange={(e)=>{setText(e.target.value)}}
        onKeyDown={(e)=>{
            const text = e.target.value;
            if(!text)return;
            if (isComposed)return;
            if(e.key === 'Enter' ){
                setText(text);
            }
        }}

        value={text}
      /> */}
      <TextInput
          value={text}
          style={styles.taskListItemInput}
          onChangeText={(textInput) => setText(textInput)}
          autoCapitalize="none"
          keyboardType="default"
          placeholder="目標を入力！"
        />
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
  taskListItemInput: {

  },
});

export default TaskListItem;
