import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Milestone from '../screens/Milestone';
import MilestoneEditor from '../screens/MilestoneEditor';

const Stack = createStackNavigator();

function MilestoneNavigator() {
  return (
      <Stack.Navigator>
        <Stack.Screen
          name="Milestone"
          component={Milestone}
          options={{headerStyle: {
            height: 0,
          }}}
        />
        <Stack.Screen
          name="MilestoneEditor"
          component={MilestoneEditor}
          options={{headerStyle: {
            height: 0,
          }}}
        />
      </Stack.Navigator>
  );
}

export default MilestoneNavigator;
