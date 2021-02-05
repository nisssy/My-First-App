import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ScrollView} from 'react-native';
import DateRepresentor from '../components/DateComponent';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MilestoneList from '../components/MilestoneList';
import MonthLabel from '../components/MonthLabel';

function Milestone() {
  return (
    <View style={styles.container}>
      <Header />
      <DateRepresentor />

      <ScrollView>
        <MonthLabel />
        <MilestoneList />
        <MonthLabel />
      </ScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});

export default Milestone;
