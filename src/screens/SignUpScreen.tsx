import React, { useState } from 'react';
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

const SignUpScreen: React.FC<Props> = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePress: () => void = () => {
    setIsLoading(true);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
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

  return (
    <View style={styles.container}>
      <Loading isLoading={isLoading} />
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
        <Button value="完了" onPress={handlePress} style={styles.button} />
        <View style={styles.footer}>
          <Text style={styles.footerText}>ご登録済みですか?</Text>
          <TouchableOpacity
            onPress={() => {
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
  button: {
    marginTop: 8,
    height: 48,
    alignSelf: 'flex-start',
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
