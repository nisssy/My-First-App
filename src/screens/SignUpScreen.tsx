import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  // Alert,
} from 'react-native';
// import firebase from 'firebase';
import { shape } from 'prop-types';
import Button from '../components/Button';

function SignUpScreen(props) {
  const { navigation } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handlePress() {
    navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
    /* firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        navigation.reset({ index: 0, routes: [{ name: 'List' }] });
      })
      .catch(() => {
        Alert.alert('無効なメールアドレスです');
      }); */
  }
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <View>
          <Text style={styles.title}>登録画面</Text>
        </View>
        <TextInput
          value={email}
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Email Address"
          textContentType="emailAddress"
        />
        <TextInput
          value={password}
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <Button
          value="完了"
          onPress={handlePress}
        />
        <View style={styles.footer}>
          <Text style={styles.footerText}>ご登録済みですか?</Text>
          <TouchableOpacity onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'LogIn' }],
            });
          }}
          >
            <Text style={styles.footerLink}>ログインはこちら.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

SignUpScreen.propTypes = {
  navigation: shape().isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  inner: {
    paddingVertical: 24,
    paddingHorizontal: 27,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    fontSize: 16,
    height: 48,
    borderColor: '#ddd',
    borderWidth: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
  },
  footerText: {
    fontSize: 14,
    lineHeight: 24,
    marginRight: 8,
  },
  footerLink: {
    fontSize: 14,
    lineHeight: 24,
    color: '#467fd3',
  },
});

export default SignUpScreen;
