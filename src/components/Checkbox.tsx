import React, { useEffect } from 'react';
import { CheckBox } from 'react-native-elements';
import firebase from 'firebase';
import { Alert } from 'react-native';
import { translateErrors } from '../utils/functions';
import { Task } from '../types/task';

type Props = {
  data: Task;
  size?: number;
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
};

const Checkbox: React.FC<Props> = ({
  data,
  size,
  checked,
  setChecked,
}: Props) => {
  const { currentUser } = firebase.auth();
  const db = firebase.firestore();

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
          const errorMessage = translateErrors(error.code);
          Alert.alert(errorMessage.error, errorMessage.description);
        });
    } else {
      setChecked(true);
      ref
        .update({
          achievement: true,
        })
        .then(() => {})
        .catch((error) => {
          const errorMessage = translateErrors(error.code);
          Alert.alert(errorMessage.error, errorMessage.description);
        });
    }
  }

  useEffect(() => {
    setChecked(checked);
  }, []);

  useEffect(() => {
    setChecked(data.achievement);
  }, [data.achievement]);

  return (
    <CheckBox
      center
      size={size}
      checked={checked}
      checkedColor="green"
      onPress={() => handlePress()}
    />
  );
};

Checkbox.defaultProps = {
  size: 25,
};

export default Checkbox;
