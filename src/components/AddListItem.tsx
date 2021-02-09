import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Alert} from 'react-native';
import Icon from './Icon';
import firebase from 'firebase';

function AddListItem(props) {
  const { dataSet, setDataSet } = props;
  const { currentUser } = firebase.auth();
  const db = firebase.firestore();
  const ref = db.collection(`users/${currentUser?.uid}/task`);
  let array: any;
  dataSet === undefined ?  array = [] :  array = dataSet;
  function handleState(array) {
    const result = array.filter((element, index, self) =>
      self.findIndex(e =>
        e.id === element.id
      ) === index
    );
    if(setDataSet) {
      setDataSet(result);
    }
  }

  return (
    <TouchableOpacity
      style={styles.addListItem}
      onPress={() => {
        const createdAt = new Date();
        ref.add({
          title: '',
          start: null,
          end: null,
          achievement: false,
          createdAt: createdAt,
        })
          .then(() => {
              let id: string;
              ref.orderBy("createdAt", "desc").limit(1).get().then(docs => {
              docs.forEach(doc => {
                id =doc.id;
              })
              array.push({
                id,
                title: '',
              })
              handleState(array)
            })
          })
          .catch((error) => {
            Alert.alert(error)
          })
      }}
    >
      <View style={styles.addListItemInner}>
        <Icon name="Plus" size={20} color="#646464" />
        <View style={styles.addListItemTextContainer}>
          <Text style={styles.addListItemText}>
            リストを追加する
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
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
});

export default AddListItem;
