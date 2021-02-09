import React, { useEffect, useState } from 'react';
import { CheckBox } from 'react-native-elements';
import firebase from 'firebase';

function Checkbox(props: any) {
  const {data, size, checked, setChecked} = props;
  useEffect(() => {
    setChecked(checked);
  }, [])

  const { currentUser } = firebase.auth();
  const db = firebase.firestore();
  const ref = data.target ?  db.collection(`users/${currentUser?.uid}/target`).doc(data.id) :  db.collection(`users/${currentUser?.uid}/task`).doc(data.id);
  function handlePress() {
    if (checked) {
      setChecked(false);
      ref.update({
        achievement: false,
      })
        .then(()=>{
          return;
        }).catch((error) => {
          console.log(error)
        })
    } else {
      setChecked(true);
      ref.update({
        achievement: true,
      })
        .then(()=>{
          return;
        }).catch((error) => {
          console.log(error)
        })
    }
  }
  return (
        <CheckBox
          center
          size={size}
          checked={checked}
          checkedColor='green'
          onPress={() => handlePress()}
        />
  )
}

export default Checkbox;
