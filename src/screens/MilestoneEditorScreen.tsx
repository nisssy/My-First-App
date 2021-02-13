import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { utcToZonedTime } from 'date-fns-tz';
import { format } from 'date-fns';
import firebase from 'firebase';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import DatePicker from '../components/DatePicker';
import Header from '../components/Header';
import Button from '../components/Button';
import { MilestoneTabParamList, RootStackParamList } from '../types/navigation';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'LogIn'>;
  route: RouteProp<MilestoneTabParamList, 'Milestone'>;
};

const MilestoneEditor: React.FC<Props> = ({ navigation, route }: Props) => {
  const { data } = route.params;
  const [now, setNow] = useState<Date>(new Date());
  const [start, setStart] = useState<Date>(new Date());
  const [end, setEnd] = useState<Date>(new Date());
  const [due, setDue] = useState<string>('');
  const [left, setLeft] = useState<number>(0);

  const handlePress: () => void = () => {
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
  };

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

  return (
    <View style={styles.container}>
      <Header
        displayLogout={false}
        displayBack
        title="マイルストーン"
        fontSize={26}
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
};

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
