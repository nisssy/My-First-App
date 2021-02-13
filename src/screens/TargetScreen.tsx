import React from 'react';
import { View, StyleSheet } from 'react-native';
import DateComponent from '../components/DateComponent';
import Header from '../components/Header';

import TargetList from '../components/TargetList';

const TargetScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Header displayLogout displayBack={false} title="目標" fontSize={30} />
      <DateComponent displayYear displayMonth={false} displayDate={false} />
      <TargetList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});

export default TargetScreen;
