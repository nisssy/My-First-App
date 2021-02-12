import React, { useEffect } from 'react';
import { CheckBox } from 'react-native-elements';
import firebase from 'firebase';

function Checkbox(props: any) {
  const { data, size, checked, setChecked } = props;
  const { currentUser } = firebase.auth();
  const db = firebase.firestore();

  useEffect(() => {
    setChecked(checked);
  }, []);
  useEffect(() => {
    setChecked(data.achievement);
  }, [data.achievement]);

  function handlePress() {
    const ref = db.collection(`users/${currentUser?.uid}/task`).doc(data.id);
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
