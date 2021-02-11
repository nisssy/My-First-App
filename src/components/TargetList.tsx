import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Alert, View, Text } from 'react-native';
import firebase from 'firebase';
import TargetListItem from './TargetListItem';
import QuoterContainerBottom from './QuoterContainerBottom';
import QuoterContainerTop from './QuoterContainerTop';
import Button from './Button';

function TargetList() {
  const [dataSet, setDataSet] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { currentUser } = firebase.auth();
    let unsubscribe = () => {};
    if (currentUser) {
      const db = firebase.firestore();
      const ref = db.collection(`users/${currentUser?.uid}/target`);
      const array = [];
      unsubscribe = ref.onSnapshot(
        (snapshot) => {
          snapshot.forEach((doc) => {
            array.push({
              id: doc.id,
              month: doc.data().month,
              target: doc.data().target,
              achievement: doc.data().achievement,
            });
          });
          if (array.length > 2) setDataSet(array);
        },
        () => {
          Alert.alert('データの読み込みに失敗');
        }
      );
    }
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (dataSet.length > 2) {
      setIsLoading(false);
    }
  }, [dataSet]);

  if (isLoading) {
    return (
      <View>
        <Text>最初のインプットをしよう</Text>
        <Button
          value="スタート"
          onPress={() => {
            const { currentUser } = firebase.auth();
            const db = firebase.firestore();
            const ref = db.collection(`users/${currentUser?.uid}/target`);
            ref.add({
              month: '1月',
              target: '',
              achievement: false,
            });
            ref.add({
              month: '2月',
              target: '',
              achievement: false,
            });
            ref
              .add({
                month: '3月',
                target: '',
                achievement: false,
              })
              .then(() => {})
              .catch((error) => {});
          }}
        />
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <QuoterContainerTop />
      <TargetListItem monthOrigin="1月" dataSet={dataSet} />
      <TargetListItem monthOrigin="2月" dataSet={dataSet} />
      <TargetListItem monthOrigin="3月" dataSet={dataSet} />
      <QuoterContainerBottom />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});

export default TargetList;
