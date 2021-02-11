import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { func, shape, string } from 'prop-types';
import { variables } from '../lib/variables/stylingVariables';

function Button(props) {
  const { value, onPress, style } = props;

  return (
    <TouchableOpacity style={[styles.buttonContainer, style]} onPress={onPress}>
      <Text style={styles.buttonLabel}>{value}</Text>
    </TouchableOpacity>
  );
}

Button.propTypes = {
  value: string.isRequired,
  onPress: func.isRequired,
  style: shape(),
};

Button.defaultProps = {
  style: null,
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
