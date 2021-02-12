/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Alert, View, Text } from 'react-native';
import firebase from 'firebase';
import Button from './Button';
import TargetListQuoter from './TargetListQuoter';
import { translateErrors } from '../lib/functions';
import Loading from './Loading';

function TargetList() {
  const [dataSetForMonth, setDataSetForMonth] = useState([]);
  const [dataSetForQuoter, setDataSetForQuoter] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
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
          setIsLoading(false);
          if (arrayMonth.length > 11) {
            setDataSetForMonth(arrayMonth);
            setInitialized(true);
          }
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
        (error) => {
          const errorMessage = translateErrors(error.code);
          Alert.alert(errorMessage.error, errorMessage.description);
        }
      );
    }
    return unsubscribe;
  }, []);

  if (isLoading) {
    return <Loading isLoading={isLoading} />;
  }

  if (!initialized) {
    return (
      <View style={styles.containerInit}>
        <View style={styles.textInitContainer}>
          <Text style={styles.textInit}>月ごとの目標を</Text>
          <Text style={styles.textInit}>決めよう！</Text>
        </View>

        <Button
          value="はじめる"
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
              refForMonth.add({
                month: `${i}月`,
                target: '',
                achievement: false,
                belongQuoter: belong,
              });
            }
            for (let i = 1; i <= 4; i++) {
              refForQuoter
                .add({
                  quoter: `${i}Q`,
                  target: '',
                })
                .then(() => setInitialized(true));
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
  containerInit: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 150,
  },
  textInit: {
    fontSize: 20,
    lineHeight: 32,
  },
  textInitContainer: {
    marginBottom: 24,
    alignItems: 'center',
  },
});

export default TargetList;
