import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ScrollView} from 'react-native';
import DateRepresentor from '../components/DateRepresentor';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MilestoneList from '../components/MilestoneList';
import MonthLabel from '../components/MonthLabel';
import { variables } from '../lib/stylingVariables/stylingVariables';

function Milestone() {
  return (
    <View style={styles.container}>
      <Header />
      <DateRepresentor />

      <ScrollView>
        <MonthLabel />{/* 今月 */}
        <MilestoneList />
        <MonthLabel />{/* 来月 */}
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
