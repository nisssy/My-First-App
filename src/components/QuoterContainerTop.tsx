import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { variables } from '../lib/variables/stylingVariables';

function QuoterContainerTop(props) {
  const { quoter } = props;
  return (
    <View style={styles.quoterContainerTop}>
      <View style={styles.quoterContainerTopInner}>
        <Text style={styles.quoterText}>{quoter}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  quoterContainerTop: {
    height: 64,
    backgroundColor: variables.subColor,
    justifyContent: 'center',
  },
  quoterContainerTopInner: {
    width: 50,
    marginLeft: 16,
    alignItems: 'center',
  },
  quoterText: {
    fontSize: 24,
    color: variables.mainColor,
  },
});

export default QuoterContainerTop;
