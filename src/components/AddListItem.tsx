import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Alert } from 'react-native';
import firebase from 'firebase';
import Icon from './Icon';

function AddListItem(props) {
  const { flag, dataSet, setDataSet } = props;
  const { currentUser } = firebase.auth();
  const db = firebase.firestore();
  const ref = db.collection(`users/${currentUser?.uid}/task`);
  let array: any;
  array = typeof dataSet === 'undefined' ? (array = []) : (array = dataSet);
  function handleState(array) {
    const result = array.filter(
      (element, index, self) =>
        self.findIndex((e) => e.id === element.id) === index
    );
    if (setDataSet) {
      setDataSet(result);
    }
  }

  function handlePress() {
    const initialDate = flag
      ? new Date()
      : new Date(new Date().setMonth(new Date().getMonth() + 1));
    ref
      .add({
        title: '',
        start: initialDate,
        end: initialDate,
        achievement: false,
        changed: false,
        createdAt: new Date(),
      })
      .then(() => {
        let id: string;
        ref
          .orderBy('createdAt', 'desc')
          .limit(1)
          .get()
          .then((docs) => {
            docs.forEach((doc) => {
              id = doc.id;
            });
            array.push({
              id,
              title: '',
            });
            handleState(array);
          });
      })
      .catch((error) => {
        Alert.alert(error);
      });
  }

  return (
    <TouchableOpacity style={styles.addListItem} onPress={handlePress}>
      <View style={styles.addListItemInner}>
        <Icon name="Plus" size={20} color="#ccc" />
        <View style={styles.addListItemTextContainer}>
          <Text style={styles.addListItemText}>リストを追加する</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  addListItem: {
    width: '100%',
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
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
    color: '#ccc',
  },
});

export default AddListItem;
