import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ScrollView} from 'react-native';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { variables } from '../lib/stylingVariables/stylingVariables';

function MilestoneEditor() {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
        <View style={styles.textContainer}>
          <Text style={styles.text}>・ご飯を食べる</Text>
          <Text style={styles.text}>・買い物に行く</Text>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonLabel}>+</Text>
      </TouchableOpacity>
      <Footer />
    </View>
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
});

export default MilestoneEditor;
