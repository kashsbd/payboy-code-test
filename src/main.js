import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './screen/homeScreen';
import CreateUserScreen from './screen/createUserScreen';

const Tab = createBottomTabNavigator();

function Main() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Create User" component={CreateUserScreen} />
    </Tab.Navigator>
  );
}

export default Main;