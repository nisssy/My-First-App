import React, {useEffect, useState} from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Alert } from 'react-native';
import DatePicker from '../components/DatePicker';
import { utcToZonedTime } from 'date-fns-tz';
import Header from '../components/Header';
import { variables } from '../lib/variables/stylingVariables';
import { format } from 'date-fns';
import firebase from 'firebase';

function MilestoneEditor(props) {
  const { navigation, route } = props;
  const { data } = route.params;
  const [now, setNow] = useState(new Date());
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [due, setDue] = useState('');
  const [left, setLeft] = useState(0);

  useEffect(() => {
    setNow(new Date());
    const jstNow = utcToZonedTime(now, 'Asia/Tokyo').getTime();
    const jstEnd = utcToZonedTime(end, 'Asia/Tokyo').getTime();
    const left = jstEnd - jstNow;
    const leftDay = Math.floor(left / 1000 / 60 / 60 / 24) + 1;
    setLeft(leftDay)

    const endString = format(end, 'yyyy年MM月dd日');
    setDue(endString);
  },[end])
  function handlePress() {
    // firebaseの更新
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    const ref = db.collection(`users/${currentUser?.uid}/task`).doc(data.id)
    ref.update({
      start,
      end,
    })
      .then(() => {
        navigation.goBack();
      }
      ).catch((error) => {
        Alert.alert(error);
      })
  }

  return (
    <View style={styles.container}>
      <Header displayLogout={false} displayBack title="マイルストーン" fontSize={26} navigation={navigation} />
      <View style={styles.itemsContainer}>
        <DatePicker start={start} setStart={setStart} end={end} setEnd={setEnd} />
        <View style={styles.textContainer} >
          <Text style={styles.textTitle}>{data.title}</Text>
          <Text style={styles.text}>〆切：{due}</Text>
          <Text style={styles.text}>残り：{`${left}日`}</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handlePress}
        >
            <Text style={styles.buttonLabel}>設定完了</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonCancel}
          onPress={() => navigation.goBack()}
        >
            <Text style={styles.buttonLabelCancel}>キャンセル</Text>
        </TouchableOpacity>
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
    backgroundColor: variables.mainColor,
  },
  buttonCancel:{
    width: 145,
    marginTop: 24,
    backgroundColor: '#ccc',
    alignItems: 'center',
  },
  buttonLabel: {
    lineHeight: 32,
    padding: 5,
    paddingRight: 42,
    paddingLeft: 42,
    fontSize: 16,
    color: '#fff',
  },
  buttonLabelCancel: {
    lineHeight: 32,
    padding: 5,
    fontSize: 16,
    color: '#fff',
  },
});

export default MilestoneEditor;
