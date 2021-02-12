import React, { useContext, useEffect, useState } from 'react';
import { CheckBox } from 'react-native-elements';
import firebase from 'firebase';
import { Alert } from 'react-native';
import QuoterAchievementRatioContext from '../contexts/QuoterAchievementRatioContext';
import { translateErrors } from '../lib/functions';

function CheckboxForTarget(props: any) {
  const { data, size, checked, setChecked } = props;
  const { currentUser } = firebase.auth();
  const db = firebase.firestore();
  const value = useContext(QuoterAchievementRatioContext);
  const { quoterAchievementRatio, setQuoterAchievementRatio } = value;

  useEffect(() => {
    setChecked(checked);
    if (checked) {
      const count = quoterAchievementRatio + 1;
      setQuoterAchievementRatio(count);
    }
  }, []);

  function handlePress() {
    const ref = db
      .collection(`users/${currentUser?.uid}/target/data/month`)
      .doc(data.id);
    if (checked) {
      setChecked(false);
      const count = quoterAchievementRatio - 1;
      setQuoterAchievementRatio(count);
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
      const count = quoterAchievementRatio + 1;
      setQuoterAchievementRatio(count);
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

export default CheckboxForTarget;
