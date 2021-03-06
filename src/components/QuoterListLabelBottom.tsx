import React, { useEffect, useState } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Alert,
  TextInput,
} from 'react-native';
import firebase from 'firebase';
import { variables } from '../utils/variables/stylingVariables';
import Icon from './Icon';
import { translateErrors } from '../utils/functions';
import { TargetQuoter } from '../types/target';

type Props = {
  quoter: number;
  dataSetForQuoter: TargetQuoter[];
  quoterAchievementRatio: number;
};

const QuoterLabelBottom = ({
  quoter,
  dataSetForQuoter,
  quoterAchievementRatio,
}: Props) => {
  const [grade, setGrade] = useState();
  const [text, setText] = useState<string>('');
  const [dataSet, setDataSet] = useState<any>({ id: 'id' });
  const [style, setStyle] = useState<object>({});
  const [id, setId] = useState<string>('id');
  const { currentUser } = firebase.auth();
  const db = firebase.firestore();
  const ref = db
    .collection(`users/${currentUser?.uid}/target/data/quoter`)
    .doc(id);

  function handlePress() {
    ref
      .update({
        target: text,
      })
      .then(() => {})
      .catch((error) => {
        const errorMessage = translateErrors(error.code);
        Alert.alert(errorMessage.error, errorMessage.description);
      });
  }

  useEffect(() => {
    if (typeof dataSet !== 'undefined') {
      setId(dataSet.id);
    }
  }, [dataSet]);

  useEffect(() => {
    if (typeof dataSetForQuoter === 'undefined') return;
    const newList = dataSetForQuoter.filter(
      (item) => item.quoter === `${quoter}Q`
    );
    setDataSet(newList[0]);
    if (typeof newList[0] !== 'undefined') {
      setText(newList[0].target);
    }
  }, [dataSetForQuoter]);

  useEffect(() => {
    ref
      .update({
        grade: quoterAchievementRatio,
      })
      .then()
      .catch((error) => {});
    if (quoterAchievementRatio === 0) {
      setGrade('C');
      setStyle({ color: variables.mainColor });
    } else if (quoterAchievementRatio === 1) {
      setGrade('B');
      setStyle({ color: variables.mainColor });
    } else if (quoterAchievementRatio === 2) {
      setGrade('A');
      setStyle({ color: 'red' });
    } else if (quoterAchievementRatio === 3) {
      setGrade('S');
      setStyle({ color: 'green' });
    } else {
      setGrade('?');
    }
  }, [quoterAchievementRatio]);

  return (
    <View style={styles.quoterContainerBottom}>
      <View style={styles.quoterInner}>
        <Text style={[styles.quoterAchievementRate, style]}>達成率</Text>
        <Text style={[styles.achievementScore, style]}>{grade}</Text>
      </View>
      <View style={styles.quoterTextContainer}>
        <TextInput
          value={text}
          style={styles.quoterText}
          onChangeText={(textInput) => setText(textInput)}
          autoCapitalize="none"
          keyboardType="default"
          placeholder="Qの目標を入力！"
          onEndEditing={handlePress}
          multiline
        />
      </View>
      <TouchableOpacity
        style={styles.listItemDeleteButton}
        onPress={() => {
          ref.update({
            target: '',
          });
          setText('');
        }}
      >
        <Icon name="Delete" size={24} color="#ccc" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  missionList: {
    flexDirection: 'row',
  },

  quoterContainerBottom: {
    height: 64,
    marginBottom: 40,
    backgroundColor: variables.subColor,
    flexDirection: 'row',
  },
  quoterInner: {
    width: 50,
    marginLeft: 16,
    marginTop: 12,
    alignItems: 'center',
  },
  quoterAchievementRate: {
    color: variables.mainColor,
    fontSize: 16,
  },
  achievementScore: {
    color: variables.mainColor,
    fontSize: 24,
    marginTop: 4,
  },
  quoterTextContainer: {
    marginLeft: 26,
    justifyContent: 'center',
  },
  quoterText: {
    width: 220,
    fontSize: 24,
    color: variables.mainColor,
  },
  listItemDeleteButton: {
    position: 'absolute',
    width: 50,
    height: 50,
    right: 12,
    top: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QuoterLabelBottom;
