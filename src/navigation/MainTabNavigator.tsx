import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Milestone from '../screens/Milestone';
import Missions from '../screens/Missions';
import TodayToDo from '../screens/TodayToDo';
import ToDo from '../screens/ToDo';
import Icon from '../components/Icon';
import { variables } from '../lib/variables/stylingVariables';
import MilestoneNavigator from './MilestoneNavigator';
import ToDoNavigator from './ToDoNavigator';

const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        tabBarOptions={{
          activeTintColor: variables.mainColor,
          inactiveTintColor: '#646464',
          showLabel: 'false',
        }}
        name="Missions"
        component={Missions}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="Star" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        tabBarOptions={{
          activeTintColor: variables.mainColor,
          inactiveTintColor: '#646464',
          showLabel: 'false',
        }}
        name="Tasks"
        component={ToDo}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="List" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        tabBarOptions={{
          activeTintColor: variables.mainColor,
          inactiveTintColor: '#646464',
          showLabel: 'false',
        }}
        name="Milestone"
        component={MilestoneNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="MileStone" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        tabBarOptions={{
          activeTintColor: variables.mainColor,
          inactiveTintColor: '#646464',
          showLabel: 'false',
        }}
        name="ToDo"
        component={ToDoNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="ToDo" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;
