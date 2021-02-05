// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Milestone from './src/screens/Milestone';
import TodayToDoEditor from './src/screens/TodayToDoEditor';
import Missions from './src/screens/Missions';
import TodayToDo from './src/screens/TodayToDo';
import MilestoneEditor from './src/screens/MilestoneEditor';
import ToDo from './src/screens/ToDo';
import LogInScreen from './src/screens/LogInScreen';
import SignUpScreen from './src/screens/SignUpScreen';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Missions /> */}
      {/* <ToDo /> */}
      {/* <Milestone /> */}
      {/* <TodayToDo /> */}
      {/* <MilestoneEditor /> */}
      {/* <TodayToDoEditor /> */}
      {/* <LogInScreen /> */}
      {/* <SignUpScreen /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
