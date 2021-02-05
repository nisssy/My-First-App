import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ScrollView} from 'react-native';

import { variables } from '../lib/stylingVariables/stylingVariables';

function MonthLabel() {
  return (
    <View style={styles.monthLabelContainer}>
      <View style={styles.monthLabelInner}>
        <Text style={styles.monthLabel}>1月</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  monthLabelContainer:{
    height: 64,
    backgroundColor: variables.subColor,
    justifyContent: 'center',
  },
  monthLabelInner: {
    width: 50,
    marginLeft: 16,
    alignItems: 'center',
  },
  monthLabel: {
    fontSize: 24,
    color: variables.mainColor,
  },
});

export default MonthLabel;
