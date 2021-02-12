import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import firebase from 'firebase';
import Icon from './Icon';
import Checkbox from './Checkbox';
import { translateErrors } from '../lib/functions';

function TaskListItem(props) {
  const { data, dataSet, setDataSet } = props;
  const [text, setText] = useState(data.title);
  const [checked, setChecked] = useState(data.achievement);
  const [id, setId] = useState('id');
  const { currentUser } = firebase.auth();
  const db = firebase.firestore();
  const ref = db.collection(`users/${currentUser?.uid}/task`).doc(id);

  useEffect(() => {
    if (typeof data.id !== 'undefined') {
      setId(data.id);
    }
  }, [data]);

  function handlePress() {
    ref
      .update({
        title: text,
      })
      .then(() => {})
      .catch((error) => {
        const errorMessage = translateErrors(error.code);
        Alert.alert(errorMessage.error, errorMessage.description);
      });
  }
  function handlePressDelete() {
    ref
      .delete()
      .then(() => {
        const newData = dataSet.filter((item) => {
          return item.id !== data.id;
        });
        setDataSet(newData);
      })
      .catch((r) => {
        console.log(r);
      });
    // }
  }

  return (
    <View style={styles.taskListItem} key={data.id}>
      <View style={styles.successButton}>
        <Checkbox
          size={25}
          data={data}
          checked={checked}
          setChecked={setChecked}
        />
      </View>
      <TextInput
        value={text}
        style={styles.taskListItemInput}
        onChangeText={(textInput) => setText(textInput)}
        onEndEditing={handlePress}
        autoCapitalize="none"
        keyboardType="default"
        placeholder="目標のためにやること"
        multiline
      />
      <TouchableOpacity
        style={styles.taskListItemDeleteButton}
        onPress={handlePressDelete}
      >
        <Icon name="Delete" size={20} color="#ccc" />
      </TouchableOpacity>
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
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  taskListItemTextContainer: {
    marginLeft: 32,
    justifyContent: 'center',
    alignItems: 'center',
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
    position: 'absolute',
    top: 24,
    left: 72,
    fontSize: 20,
    lineHeight: 22,
    width: 220,
    height: 22,
    padding: 0,
  },
  successButton: {
    width: 50,
    marginLeft: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TaskListItem;
