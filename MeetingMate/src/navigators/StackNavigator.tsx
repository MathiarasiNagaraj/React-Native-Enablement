import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import { COMPONENTS } from '../screens';



export const StackNavigator = ({screenDetails}) => {


  const Stack = createStackNavigator();
  const screen = screenDetails.map(details => (
    <Stack.Screen
      name={details.name}
      component={COMPONENTS[details.component]}
      key={details.name}
    />
  ));
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {screen}
    </Stack.Navigator>
  );
};
