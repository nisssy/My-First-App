import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { variables } from '../utils/variables/stylingVariables';

type Props = {
  name: 'arrow-left' | 'check' | 'edit';
  onPress: () => void;
  style?: {};
};

const CircleButton: React.FC<Props> = ({ name, onPress, style }: Props) => {
  return (
    <TouchableOpacity style={[styles.buttonContainer, style]} onPress={onPress}>
      <Feather name={name} size={25} color="#fff" />
    </TouchableOpacity>
  );
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

CircleButton.defaultProps = {
  style: {},
};

export default CircleButton;
