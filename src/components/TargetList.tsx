/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Alert, View, Text } from 'react-native';
import firebase from 'firebase';
import Button from './Button';
import TargetListQuoter from './TargetListQuoter';

function TargetList() {
  const [dataSetForMonth, setDataSetForMonth] = useState([]);
  const [dataSetForQuoter, setDataSetForQuoter] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = firebase.auth();
  const db = firebase.firestore();

  const refForMonth = db.collection(
    `users/${currentUser?.uid}/target/data/month`
  );
  const refForQuoter = db.collection(
    `users/${currentUser?.uid}/target/data/quoter`
  );

  useEffect(() => {
    let unsubscribe = () => {};
    if (currentUser) {
      const arrayMonth = [];
      unsubscribe = refForMonth.onSnapshot(
        (snapshot) => {
          snapshot.forEach((doc) => {
            arrayMonth.push({
              id: doc.id,
              month: doc.data().month,
              target: doc.data().target,
              achievement: doc.data().achievement,
              belong: doc.data().belong,
            });
          });
          if (arrayMonth.length > 11) setDataSetForMonth(arrayMonth);
        },
        () => {
          Alert.alert('データの読み込みに失敗');
        }
      );
    }
    return unsubscribe;
  }, []);

  useEffect(() => {
    let unsubscribe = () => {};
    if (currentUser) {
      const arrayQuoter = [];
      unsubscribe = refForQuoter.onSnapshot(
        (snapshot) => {
          snapshot.forEach((doc) => {
            arrayQuoter.push({
              id: doc.id,
              quoter: doc.data().quoter,
              target: doc.data().target,
            });
          });
          if (arrayQuoter.length > 3) setDataSetForQuoter(arrayQuoter);
        },
        () => {
          Alert.alert('データの読み込みに失敗');
        }
      );
    }
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (dataSetForMonth.length > 11) {
      setIsLoading(false);
    }
  }, [dataSetForMonth, dataSetForQuoter]);

  if (isLoading) {
    return (
      <View>
        <Text>最初のインプットをしよう</Text>
        <Button
          value="スタート"
          onPress={() => {
            for (let i = 1; i <= 12; i++) {
              const belong =
                i > 0 && i <= 3
                  ? '1Q'
                  : i > 3 && i <= 6
                    ? '2Q'
                    : i > 6 && i <= 9
                      ? '3Q'
                      : '4Q';
              refForMonth
                .add({
                  month: `${i}月`,
                  target: '',
                  achievement: false,
                  belongQuoter: belong,
                })
                .then(() => setIsLoading(false));
            }
            for (let i = 1; i <= 4; i++) {
              refForQuoter
                .add({
                  quoter: `${i}Q`,
                  target: '',
                })
                .then(() => setIsLoading(false));
            }
          }}
        />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <TargetListQuoter
        dataSetForMonth={dataSetForMonth}
        dataSetForQuoter={dataSetForQuoter}
        quoter="1Q"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});

export default TargetList;
