import React from 'react';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity, View, Text, StyleSheet, ScrollView} from 'react-native';
import Header from '../components/Header';
import { variables } from '../lib/variables/stylingVariables';
import KeyboardSafeView from '../components/KeyboardSafeView';

function ToDoEditor(props) {
  const { navigation } = props;
  return (
    <KeyboardSafeView style={styles.container}>
        <Header displayLogout={false} displayBack title="ToDo" fontSize={30} navigation={navigation}/>
        <View style={styles.textContainer}>
          <Text style={styles.text}>・ご飯を食べる</Text>
          <Text style={styles.text}>・買い物に行く</Text>
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.goBack()}
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
  text: {
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
