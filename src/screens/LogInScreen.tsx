import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import firebase from 'firebase';
import { StackNavigationProp } from '@react-navigation/stack';
import Button from '../components/Button';
import { translateErrors } from '../utils/functions';
import Loading from '../components/Loading';
import { RootStackParamList } from '../types/navigation';

type Props = {
  navigation: StackNavigationProp<RootStackParamList>;
};

const LogInScreen: React.FC<Props> = ({ navigation }: Props) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handlePress: () => void = () => {
    setIsLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
      })
      .catch((error) => {
        const errorMessage = translateErrors(error.code);
        Alert.alert(errorMessage.error, errorMessage.description);
      })
      .then(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
      } else {
        setIsLoading(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Loading isLoading={isLoading} />
      <View style={styles.inner}>
        <View>
          <Text style={styles.title}>ログイン画面</Text>
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
        <Button value="ログイン" onPress={handlePress} style={styles.button} />
        <View style={styles.footer}>
          <Text style={styles.footerText}>ご登録済みですか？</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'SignUp' }],
              });
            }}
          >
            <Text style={styles.footerLink}>サインアップはこちら！</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
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
  button: {
    marginTop: 8,
    height: 48,
    alignSelf: 'flex-start',
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

export default LogInScreen;
