import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { variables } from '../utils/variables/stylingVariables';

type Props = {
  label: string;
  size?: number;
};

const ListLabel: React.FC<Props> = ({ label, size }: Props) => {
  return (
    <View style={styles.monthLabelContainer}>
      <View style={styles.monthLabelInner}>
        <Text style={[styles.monthLabel, { fontSize: size }]}>{label}</Text>
      </View>
    </View>
  );
};

ListLabel.defaultProps = {
  size: 24,
};

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
