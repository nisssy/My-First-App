import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TodayToDoEditor from '../screens/TodayToDoEditor';
import TodayToDo from '../screens/TodayToDo';

const Stack = createStackNavigator();

function ToDoNavigator() {
  return (
      <Stack.Navigator>
        <Stack.Screen
          name="TodayToDo"
          component={TodayToDo}
          options={{headerStyle: {
            height: 0,
          }}}
        />
        <Stack.Screen
          name="TodayToDoEditor"
          component={TodayToDoEditor}
          options={{headerStyle: {
            height: 0,
          }}}
        />
      </Stack.Navigator>
  );
}

export default ToDoNavigator;
