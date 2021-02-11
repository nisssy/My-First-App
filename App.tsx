import React from 'react';
import firebase from 'firebase';
import AppNavigator from './src/navigation/AppNavigator';
import { firebaseConfig } from './src/lib/env.variables/firebase';

require('firebase/firestore');

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}



export default function App() {
  return <AppNavigator />;
}
