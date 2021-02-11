import React, { useState } from 'react';

import { View, StyleSheet, TextInput, Alert } from 'react-native';
import firebase from 'firebase';
import Header from '../components/Header';
import KeyboardSafeView from '../components/KeyboardSafeView';
import CircleButton from '../components/CircleButton';

function ToDoEditor(props) {
  const [text, setText] = useState();
  const { navigation } = props;

  function handlePress() {
    if (text === undefined) return navigation.goBack();
    const { currentUser } = firebase.auth();
    navigation.reset({ index: 0, routes: [{ name: 'ToDo' }] });
    const db = firebase.firestore();
    const ref = db.collection(`/users/${currentUser?.uid}/memo`).doc('memo');
    ref
      .set(
        {
          memo: text,
          updatedAt: new Date(),
        },
        { merge: true }
      )
      .then(() => {
        navigation.reset({ index: 1, routes: [{ name: 'ToDo' }] });
      })
      .catch((error) => {
        Alert.alert(error.code);
      });
  }

  return (
    <KeyboardSafeView style={styles.container}>
      <Header
        displayLogout={false}
        displayBack
        title="ToDo"
        fontSize={30}
        navigation={navigation}
      />
      <View style={styles.textContainer}>
        <TextInput
          value={text}
          multiline
          style={styles.input}
          onChangeText={(textInput) => setText(textInput)}
          autoFocus
        />
      </View>
      <CircleButton
        name="check"
        onPress={handlePress}
        style={styles.checkButton}
      />
    </KeyboardSafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  textContainer: {
    padding: 32,
    flex: 1,
  },
  input: {
    fontSize: 16,
    lineHeight: 32,
  },
  checkButton: {
    position: 'absolute',
    bottom: 120,
    right: 40,
  },
});

export default ToDoEditor;
