import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet, TextInput, Alert } from 'react-native';
import Icon from './Icon';
import firebase from 'firebase';

function TaskListItem(props) {
  const { data, dataSet, setDataSet, index } = props;
  const [text, setText] = useState(data.title)
  let keyForDelete;
  index == 0 ? keyForDelete = true : keyForDelete =false;
  console.log(keyForDelete)
  const { currentUser } = firebase.auth();
  const db = firebase.firestore();
  const ref = db.collection(`users/${currentUser?.uid}/task`).doc(data.id);

  function handlePress() {
      ref.update({
        title: text,
      })
        .then(() => {
          return;
        })
        .catch((error) => {
          console.log(error)
        })
  }
  function handlePressDelete(keyForDelete:boolean) {
    if(keyForDelete) {
      Alert.alert('一番目は削除できません')
    } else {
    ref.delete()
    .then(()=>{
      const newData = dataSet.filter(item => {
        return item.id !== data.id
      })
      setDataSet(newData)
    })
      .catch((error) => {
        console.log(error)
      })
    }
  }

  return (
    <View style={styles.taskListItem} key={data.id}>
      <View style={styles.taskListItemTextContainer}>
      <TextInput
          value={text}
          style={styles.taskListItemInput}
          onChangeText={(textInput) => setText(textInput)}
          onEndEditing={handlePress}
          autoCapitalize="none"
          keyboardType="default"
          placeholder="目標を入力！"
          multiline
        />
      </View>
      <TouchableOpacity
        style={styles.taskListItemDeleteButton}
        onPress={() => {handlePressDelete(keyForDelete)}}
      >
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
    fontSize: 20,
    width: 220,
  },
});

export default TaskListItem;
