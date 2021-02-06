import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function DateRepresentor() {
  return (
    <View style={styles.yearContainer}>
      <Text style={styles.year}>
        2021
        <Text style={styles.yearKanji}>
          年
        </Text>
      </Text>
  </View>
  )
}

const styles = StyleSheet.create({
  yearContainer: {
    backgroundColor: '#fff',
    height: 72,
    justifyContent: 'center',
  },
  year: {
    marginLeft: 16,
    fontSize: 32,
  },
  yearKanji: {
    fontSize: 24,
  },
});

export default DateRepresentor;
