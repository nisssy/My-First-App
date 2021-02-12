import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { utcToZonedTime } from 'date-fns-tz';
import { format } from 'date-fns';
import firebase from 'firebase';
import DatePicker from '../components/DatePicker';
import Header from '../components/Header';
import Button from '../components/Button';

function MilestoneEditor(props) {
  const { navigation, route } = props;
  const { data } = route.params;
  const [now, setNow] = useState(new Date());
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [due, setDue] = useState('');
  const [left, setLeft] = useState(0);

  useEffect(() => {
    const hour = 24;
    const minutes = 60;
    const seconds = 60;
    const mm = 1000;
    setNow(new Date());
    const jstNow = utcToZonedTime(now, 'Asia/Tokyo').getTime();
    const jstEnd = utcToZonedTime(end, 'Asia/Tokyo').getTime();
    const leftTime = jstEnd - jstNow;
    const leftDay = Math.ceil(leftTime / mm / seconds / minutes / hour);
    setLeft(leftDay);

    const endString = format(end, 'yyyy年MM月dd日');
    setDue(endString);
  }, [end]);
  function handlePress() {
    // firebaseの更新
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    const ref = db.collection(`users/${currentUser?.uid}/task`).doc(data.id);
    ref
      .update({
        start,
        end,
        changed: true,
      })
      .then(() => {
        navigation.reset({ index: 0, routes: [{ name: 'Milestone' }] });
      })
      .catch((error) => {
        Alert.alert(error);
      });
  }

  return (
    <View style={styles.container}>
      <Header
        displayLogout={false}
        displayBack
        title="マイルストーン"
        fontSize={26}
        navigation={navigation}
      />
      <View style={styles.itemsContainer}>
        <DatePicker
          start={start}
          setStart={setStart}
          end={end}
          setEnd={setEnd}
        />
        <View style={styles.textContainer}>
          <Text style={styles.textTitle}>{data.title}</Text>
          <Text style={styles.text}>
            〆切：
            {due}
          </Text>
          <Text style={styles.text}>
            残り：
            {`${left}日`}
          </Text>
        </View>
        <Button value="設定完了" onPress={handlePress} style={styles.button} />
        <Button
          value="設定完了"
          onPress={handlePress}
          style={styles.buttonCancel}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  itemsContainer: {
    alignItems: 'center',
    marginTop: 32,
  },
  textTitle: {
    alignSelf: 'center',
    marginTop: 32,
    fontSize: 20,
    lineHeight: 32,
    color: '#000',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#646464',
  },
  textContainer: {
    marginTop: 32,
  },
  button: {
    marginTop: 72,
  },
  buttonCancel: {
    backgroundColor: '#ccc',
  },
});

export default MilestoneEditor;
