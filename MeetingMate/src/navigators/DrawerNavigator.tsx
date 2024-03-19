import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MeetingRoomBookingScreen } from '../screens/MeetingRoomBookingScreen';
import { MeetingRoomDetailScreen } from '../screens/MeetingRoomDetailScreen';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
    return (
      <NavigationContainer>
<Drawer.Navigator>
      <Drawer.Screen name="Feed" component={MeetingRoomDetailScreen} />
      <Drawer.Screen name="Article" component={MeetingRoomBookingScreen} />
            </Drawer.Navigator>
            </NavigationContainer>
  )
}

export default DrawerNavigator