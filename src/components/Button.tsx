import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { func, shape, string } from 'prop-types';
import { variables } from '../lib/variables/stylingVariables';

function Button(props) {
  const { value, onPress, style } = props;

  return (
    <TouchableOpacity
      style={[styles.buttonContainer, style]}
      onPress={onPress}
    >
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
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  buttonLabel: {
    fontSize: 16,
    lineHeight: 32,
    paddingHorizontal: 32,
    paddingVertical: 8,
    color: '#fff',
  },
});

export default Button;
