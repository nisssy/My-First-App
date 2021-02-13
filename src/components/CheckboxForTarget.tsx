import React, { useContext, useEffect } from 'react';
import { CheckBox } from 'react-native-elements';
import firebase from 'firebase';
import { Alert } from 'react-native';
import QuoterAchievementRatioContext from '../contexts/QuoterAchievementRatioContext';
import { translateErrors } from '../utils/functions';
import { TargetMonth } from '../types/target';

type Props = {
  data: TargetMonth | undefined;
  size?: number;
  checked: boolean | undefined;
  setChecked: React.Dispatch<React.SetStateAction<boolean | undefined>>;
};

const CheckboxForTarget: React.FC<Props> = ({
  data,
  size,
  checked = false,
  setChecked,
}: Props) => {
  const { currentUser } = firebase.auth();
  const db = firebase.firestore();
  const value = useContext(QuoterAchievementRatioContext);
  const { quoterAchievementRatio, setQuoterAchievementRatio }: any = value;

  function handlePress() {
    const ref = db
      .collection(`users/${currentUser?.uid}/target/data/month`)
      .doc(data?.id);
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
          const errorMessage = translateErrors(error.code);
          Alert.alert(errorMessage.error, errorMessage.description);
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

  useEffect(() => {
    setChecked(checked);
    if (checked) {
      const count = quoterAchievementRatio + 1;
      setQuoterAchievementRatio(count);
    }
  }, []);

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

CheckboxForTarget.defaultProps = {
  size: 30,
};

export default CheckboxForTarget;
