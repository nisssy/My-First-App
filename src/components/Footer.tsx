import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Footer() {
  return (
    <View style={styles.footer}>
      <View style={styles.footerList}>
        <Text style={styles.footerListItem}>■</Text>
        <Text style={styles.footerListItem}>■</Text>
        <Text style={styles.footerListItem}>■</Text>
        <Text style={styles.footerListItem}>■</Text>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    height: 80,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    borderColor: '#fff',
    borderTopColor: '#ccc',
    borderWidth: 1,
  },
  footerList: {
    flexDirection: 'row',
  },
  footerListItem: {

  },
});

export default Footer;
