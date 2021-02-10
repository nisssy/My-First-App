import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity, View, Text, StyleSheet, ScrollView, TextInput} from 'react-native';
import Header from '../components/Header';
import { variables } from '../lib/variables/stylingVariables';
import KeyboardSafeView from '../components/KeyboardSafeView';
import firebase from 'firebase';

function ToDoEditor(props) {
  const [text, setText] = useState()
  const { navigation } = props;



  function handlePress() {
    if(text === undefined) return navigation.goBack();
    const { currentUser } = firebase.auth();
    navigation.reset({index: 0, routes: [{name: 'ToDo'}]})
    const db = firebase.firestore();
      const ref = db.collection(`/users/${currentUser?.uid}/memo`).doc('memo');
      ref.set({
        memo: text,
        updatedAt: new Date(),
      }, { merge: true })
        .then(() => {
          navigation.reset({index: 1, routes: [{name: 'ToDo'}]});
        })
        .catch((error) => {
          Alert.alert(error.code);
        });
  }
  return (
    <KeyboardSafeView style={styles.container}>
        <Header displayLogout={false} displayBack title="ToDo" fontSize={30} navigation={navigation}/>
        <View style={styles.textContainer}>
          <TextInput
            value={text}
            multiline
            style={styles.input}
            onChangeText={(textInput) => setText(textInput)}
            autoFocus
          />
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={handlePress}
        >
          <View style={styles.editButtonOuter}>
            <Feather name="check" size={25} color="#fff" />
          </View>
        </TouchableOpacity>
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
  button: {
    position: 'absolute',
    bottom: 120,
    right: 40,
    marginTop: 32,
    backgroundColor: variables.mainColor,
    alignSelf: 'flex-start',
  },
  buttonLabel: {
    lineHeight: 32,
    padding: 5,
    paddingRight: 42,
    paddingLeft: 42,
    fontSize: 16,
    color: '#fff',
  },
  editButton: {
    position: 'absolute',
    bottom: 120,
    right: 40,
  },
  editButtonOuter: {
    top:0,
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: variables.mainColor,
    borderRadius: 32,
  },
});

export default ToDoEditor;
