/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Alert, View, Text } from 'react-native';
import firebase from 'firebase';
import InputScrollView from 'react-native-input-scroll-view';
import Button from './Button';
import TargetListQuoter from './TargetListQuoter';
import { translateErrors } from '../utils/functions';
import Loading from './Loading';
import { TargetMonth, TargetQuoter } from '../types/target';

const TargetList: React.FC = () => {
  const [dataSetForMonth, setDataSetForMonth] = useState<TargetMonth[]>([]);
  const [dataSetForQuoter, setDataSetForQuoter] = useState<TargetQuoter[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [initialized, setInitialized] = useState<boolean>(false);
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
      const arrayMonth: TargetMonth[] = [];
      unsubscribe = refForMonth.onSnapshot(
        (snapshot) => {
          snapshot.forEach((doc) => {
            arrayMonth.push({
              id: doc.id,
              month: doc.data().month,
              target: doc.data().target,
              achievement: doc.data().achievement,
              belongQuoter: doc.data().belongQuoter,
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
      const arrayQuoter: TargetQuoter[] = [];
      unsubscribe = refForQuoter.onSnapshot(
        (snapshot) => {
          snapshot.forEach((doc) => {
            arrayQuoter.push({
              id: doc.id,
              quoter: doc.data().quoter,
              target: doc.data().target,
              grade: doc.data().grade,
            });
          });
          if (arrayQuoter.length > 3) setDataSetForQuoter(arrayQuoter);
        },
        (error) => {
          const errorMessage = translateErrors(error);
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
            for (let i = 1; i <= 12; i += 1) {
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
            for (let i = 1; i <= 4; i += 1) {
              refForQuoter
                .add({
                  quoter: `${i}Q`,
                  target: '',
                  grade: 0,
                })
                .then(() => setInitialized(true));
            }
          }}
        />
      </View>
    );
  }

  return (
    <InputScrollView keyboardOffset={250}>
      <View style={styles.container}>
        <TargetListQuoter
          dataSetForMonth={dataSetForMonth}
          dataSetForQuoter={dataSetForQuoter}
          quoter={1}
        />
        <TargetListQuoter
          dataSetForMonth={dataSetForMonth}
          dataSetForQuoter={dataSetForQuoter}
          quoter={2}
        />
        <TargetListQuoter
          dataSetForMonth={dataSetForMonth}
          dataSetForQuoter={dataSetForQuoter}
          quoter={3}
        />
        <TargetListQuoter
          dataSetForMonth={dataSetForMonth}
          dataSetForQuoter={dataSetForQuoter}
          quoter={4}
        />
        <View style={styles.footer} />
      </View>
    </InputScrollView>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#fff',
    height: 80,
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
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
