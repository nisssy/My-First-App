import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { func, shape, string } from 'prop-types';
import { Feather } from '@expo/vector-icons';
import { variables } from '../lib/variables/stylingVariables';

function CircleButton(props) {
  const { name, onPress, style } = props;

  return (
    <TouchableOpacity style={[styles.buttonContainer, style]} onPress={onPress}>
      <Feather name={name} size={25} color="#fff" />
    </TouchableOpacity>
  );
}

CircleButton.propTypes = {
  name: string.isRequired,
  onPress: func.isRequired,
  style: shape(),
};

CircleButton.defaultProps = {
  style: null,
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: variables.mainColor,
    borderRadius: 32,
    zIndex: 900,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    elevation: 8,
  },
  buttonLabel: {
    fontSize: 16,
    lineHeight: 32,
    color: '#fff',
  },
});

export default CircleButton;
