import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { variables } from '../lib/stylingVariables/stylingVariables';

function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.inner}>
        <Text style={styles.screenTitle}>目標</Text>
        <Text style={styles.logout}>ログアウト</Text>
      </View>
  </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 104,
    backgroundColor: variables.mainColor,
    justifyContent: 'flex-end',
  },
  inner: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  screenTitle: {
    color: '#fff',
    fontSize: 30,
    lineHeight: 30,
    marginBottom: 8,
  },
  logout: {
    color: '#fff',
    position: 'absolute',
    right: 48,
    fontSize: 14,
    lineHeight: 14,
    bottom: 14,
  },
});

export default Header;
