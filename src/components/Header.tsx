import React from 'react';
import firebase from 'firebase';
import { Feather } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { variables } from '../lib/variables/stylingVariables';
import { useNavigation } from '@react-navigation/native';

function Header(props: any) {
  const {displayLogout, displayBack, title, fontSize} = props;
  let logoutButtonStyle;
  let backButtonStyle;
  logoutButtonStyle = displayLogout ? styles.displayFlex : styles.displayNone;
  backButtonStyle = displayBack ? styles.displayFlex : styles.displayNone;

  const navigation = useNavigation();

  function handlePress() {
    firebase.auth().signOut()
      .then(() => {
        navigation.reset({index: 0, routes: [{name: 'LogIn'}]});
      })
      .catch((error) => {
        Alert.alert('ログアウトに失敗しました')
      })
  }

  return (
    <View style={styles.header}>
      <View style={styles.inner}>
        <Text style={[styles.screenTitle, {fontSize: fontSize}]}>{title}</Text>
      </View>
      <TouchableOpacity
        style={[styles.logoutContainer, logoutButtonStyle]}
        onPress={handlePress}
      >
        <Text style={styles.logout}>ログアウト</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backContainer, backButtonStyle]}
        onPress={() => navigation.goBack()}
      >
        <Feather name="arrow-left" color="#fff" size={25} />
        <Text style={styles.backText}>back</Text>
      </TouchableOpacity>
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
    fontSize: 14,
    lineHeight: 14,
  },
  logoutContainer: {
    position: 'absolute',
    right: 26,
    bottom: 0,
    padding: 14,
  },
  backContainer: {
    position: 'absolute',
    left: 24,
    bottom: 0,
    padding: 8,
    flexDirection: 'row',
  },
  backText: {
    color: '#fff',
    fontSize: 20,
  },
  displayNone: {
    display: 'none',
  },
  displayFlex: {
    display: 'flex',
  },
});

export default Header;
