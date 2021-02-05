import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ScrollView} from 'react-native';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { variables } from '../lib/stylingVariables/stylingVariables';

function MilestoneEditor() {
  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.itemsContainer}>
        <Text style={styles.text}>開始予定日：2021/1/15</Text>
        <Text style={styles.text}>終了予定日：2021/1/20</Text>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonLabel}>設定完了</Text>
        </TouchableOpacity>
      </View>
      <Footer />
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
    marginTop: 64,
  },
  text: {
    fontSize: 16,
    lineHeight: 32,
  },
  button: {
    marginTop: 32,
    backgroundColor: variables.mainColor,
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
