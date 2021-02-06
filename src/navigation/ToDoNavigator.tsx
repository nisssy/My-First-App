import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ToDoEditorScreen from '../screens/ToDoEditorScreen';
import ToDoScreen from '../screens/ToDoScreen';
import MilestoneEditorScreen from '../screens/MilestoneEditorScreen';

const Stack = createStackNavigator();

function ToDoNavigator() {
  return (
      <Stack.Navigator>
        <Stack.Screen
          name="ToDo"
          component={ToDoScreen}
          options={{headerStyle: {
            height: 0,
          }}}
        />
        <Stack.Screen
          name="ToDoEditor"
          component={ToDoEditorScreen}
          options={{headerStyle: {
            height: 0,
          }}}
        />
        <Stack.Screen
          name="MilestoneEditor"
          component={MilestoneEditorScreen}
          options={{headerStyle: {
            height: 0,
          }}}
        />
      </Stack.Navigator>
  );
}

export default ToDoNavigator;
