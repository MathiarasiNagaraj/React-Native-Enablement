import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {COMPONENTS} from '../screens';


interface Type{
  name: string,
  component:string
}
interface StackNavigatorProps{
  screenDetails:Type[]
}

/**
 * @description Stack Navigator 
 * @param ScreenDetails Screen details component
 * @returns Stack Navigation 
 */
export const StackNavigator :React.FC<StackNavigatorProps>= ({screenDetails}) => {
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
