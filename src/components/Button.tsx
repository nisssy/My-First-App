import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { variables } from '../utils/variables/stylingVariables';

type Props = {
  value: string;
  onPress: () => void;
  style?: {};
};

const Button: React.FC<Props> = ({ value, onPress, style }: Props) => {
  return (
    <TouchableOpacity style={[styles.buttonContainer, style]} onPress={onPress}>
      <Text style={styles.buttonLabel}>{value}</Text>
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  style: '#fff',
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: variables.mainColor,
    borderRadius: 4,
    paddingRight: 42,
    paddingLeft: 42,
    marginBottom: 24,
    justifyContent: 'center',
    lineHeight: 32,
    padding: 8,
    fontSize: 16,
    color: '#fff',
  },
  buttonLabel: {
    fontSize: 16,
    lineHeight: 24,
    color: '#fff',
  },
});

export default Button;
