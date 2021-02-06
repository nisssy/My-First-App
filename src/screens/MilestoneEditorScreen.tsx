import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ScrollView} from 'react-native';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { variables } from '../lib/variables/stylingVariables';

function MilestoneEditor(props) {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <Header displayLogout={false} displayBack title="マイルストーン" fontSize={26} navigation={navigation} />

      <View style={styles.itemsContainer}>
        <Text style={styles.text}>開始予定日：2021/1/15</Text>
        <Text style={styles.text}>終了予定日：2021/1/20</Text>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonLabel}>設定完了</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonCancel}
          onPress={() => navigation.goBack()}
        >
            <Text style={styles.buttonLabelCancel}>キャンセル</Text>
        </TouchableOpacity>
      </View>
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
  buttonCancel:{
    width: 145,
    marginTop: 24,
    backgroundColor: '#ccc',
    alignItems: 'center',
  },
  buttonLabel: {
    lineHeight: 32,
    padding: 5,
    paddingRight: 42,
    paddingLeft: 42,
    fontSize: 16,
    color: '#fff',
  },
  buttonLabelCancel: {
    lineHeight: 32,
    padding: 5,
    fontSize: 16,
    color: '#fff',
  },
});

export default MilestoneEditor;
