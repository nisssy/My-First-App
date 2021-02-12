import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { variables } from '../lib/variables/stylingVariables';

function ListLabel(props) {
  const { label, size = 24 } = props;
  return (
    <View style={styles.monthLabelContainer}>
      <View style={styles.monthLabelInner}>
        <Text style={[styles.monthLabel, { fontSize: size }]}>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  monthLabelContainer: {
    height: 64,
    backgroundColor: variables.subColor,
    justifyContent: 'center',
  },
  monthLabelInner: {
    width: 250,
    marginLeft: 16,
    alignItems: 'flex-start',
  },
  monthLabel: {
    fontSize: 23,
    color: variables.mainColor,
  },
});

export default ListLabel;
