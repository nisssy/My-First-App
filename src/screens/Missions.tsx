import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Date from '../components/DateRepresentor';
import Footer from '../components/Footer';

import Header from '../components/Header';
import MissionsList from '../components/MissionsList';

function Missions() {
  return (
    <View style={styles.container}>
      <Header />
      <Date />
      <MissionsList />
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

export default Missions;
