import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ScrollView} from 'react-native';
import DateRepresentor from '../components/DateComponent';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MilestoneList from '../components/MilestoneList';
import MonthLabel from '../components/MonthLabel';

function Milestone(props) {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <Header displayLogout={false} displayBack={false} title="マイルストーン" fontSize={26} />
      <DateRepresentor />
      <ScrollView>
        <MonthLabel />
        <MilestoneList navigation={navigation} />
        <MonthLabel />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
  },
});

export default Milestone;
