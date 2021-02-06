import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MilestoneScreen from '../screens/MilestoneScreen';
import MilestoneEditorScreen from '../screens/MilestoneEditorScreen';

const Stack = createStackNavigator();

function MilestoneNavigator() {
  return (
      <Stack.Navigator>
        <Stack.Screen
          name="Milestone"
          component={MilestoneScreen}
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

export default MilestoneNavigator;
