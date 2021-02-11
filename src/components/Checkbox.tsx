import React, { useEffect, useState } from 'react';
import { CheckBox } from 'react-native-elements';
import firebase from 'firebase';

function Checkbox(props: any) {
  const { data, size, checked, setChecked } = props;
  const { currentUser } = firebase.auth();
  const db = firebase.firestore();

  useEffect(() => {
    setChecked(checked);
  }, []);

  function handlePress() {
    const ref =
      typeof data.target === 'string'
        ? db.collection(`users/${currentUser?.uid}/target`).doc(data.id)
        : db.collection(`users/${currentUser?.uid}/task`).doc(data.id);
    if (checked) {
      setChecked(false);
      ref
        .update({
          achievement: false,
        })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    } else {
      setChecked(true);
      ref
        .update({
          achievement: true,
        })
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <CheckBox
      center
      size={size}
      checked={checked}
      checkedColor="green"
      onPress={() => handlePress()}
    />
  );
}

export default Checkbox;
