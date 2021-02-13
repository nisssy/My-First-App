import React, { useEffect, useState } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import firebase from 'firebase';
import Icon from './Icon';
import CheckboxForTarget from './CheckboxForTarget';
import { translateErrors } from '../utils/functions';
import { TargetMonth } from '../types/target';

type Props = {
  monthOrigin: string;
  dataSetForMonth: TargetMonth[];
};

function TargetListItem({ monthOrigin, dataSetForMonth }: Props) {
  const [data, setData] = useState<TargetMonth>();
  const [text, setText] = useState<string>();
  const [id, setId] = useState<string>('id');
  const [checked, setChecked] = useState<boolean>();
  const { currentUser } = firebase.auth();
  const db = firebase.firestore();
  const ref = db
    .collection(`users/${currentUser?.uid}/target/data/month`)
    .doc(id);

  const handlePress: () => void = () => {
    ref
      .update({
        month: monthOrigin,
        target: text,
      })
      .then(() => {})
      .catch((error) => {
        const errorMessage = translateErrors(error.code);
        Alert.alert(errorMessage.error, errorMessage.description);
      });
  };

  useEffect(() => {
    if (typeof dataSetForMonth === 'undefined') return;
    const newList = dataSetForMonth.filter(
      (item) => item.month === monthOrigin
    );
    if (typeof newList[0] !== 'undefined') {
      setData(newList[0]);
      setId(newList[0].id);
      setText(newList[0].target);
      setChecked(newList[0].achievement);
    }
  }, []);

  return (
    <View style={styles.missionListItem}>
      <View style={styles.missionListItemLeft}>
        <Text style={styles.missionListItemMonth}>{monthOrigin}</Text>
        <View style={styles.checkboxContainer}>
          <CheckboxForTarget
            size={30}
            data={data}
            checked={checked}
            setChecked={setChecked}
          />
        </View>
      </View>
      <View style={styles.listItemTextContainer}>
        <TextInput
          value={text}
          style={styles.targetListItemInput}
          onChangeText={(textInput) => setText(textInput)}
          autoCapitalize="none"
          keyboardType="default"
          placeholder="目標を入力！"
          onEndEditing={handlePress}
          multiline
        />
      </View>
      <TouchableOpacity
        style={styles.listItemDeleteButton}
        onPress={() => {
          ref.update({
            target: '',
            achievement: false,
          });
          setText('');
        }}
      >
        <Icon name="Delete" size={24} color="#ccc" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  missionListItem: {
    width: '100%',
    height: 104,
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    paddingLeft: 0,
  },
  missionListItemLeft: {
    height: '100%',
    width: 50,
    marginTop: 24,
    marginLeft: 19,
    alignItems: 'center',
  },
  missionListItemMonth: {
    lineHeight: 24,
    fontSize: 24,
    color: '#646464',
  },
  listItemTextContainer: {
    marginLeft: 24,
    justifyContent: 'center',
  },
  listItemDeleteButton: {
    position: 'absolute',
    width: 50,
    height: 50,
    right: 12,
    top: 40,
    alignItems: 'center',
  },
  checkboxContainer: {
    position: 'absolute',
    top: 16,
    width: 50,
    alignItems: 'center',
  },
  targetListItemInput: {
    position: 'relative',
    top: -4,
    width: 220,
    color: '#000',
    fontSize: 24,
    lineHeight: 32,
  },
});

export default TargetListItem;
