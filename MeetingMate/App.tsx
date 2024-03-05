import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StackNavigator} from './src/navigators/StackNavigator';
import {SCREENS} from './src/constants/routeConstants';
import { ToastProvider } from 'react-native-toast-notifications'
import { COLORS } from './src/utils/colors';
import { commonStyle } from './src/styles/commonStyle';
import Geocoder from 'react-native-geocoding';

import { RecoilRoot } from "recoil";
/**
 * 
 * @description App component ,start of the app
 * @returns Stack Navigator screen 
 */
const App = () => {
  Geocoder.init('AIzaSyATfHuBIBrYjfgt61CACBrxo0yc6Bps370')

  // PushNotification.configure({
  //   onRegister: function (token) {
  //     console.log('TOKEN:', token);
  //   },
  
  //   onNotification: function (notification) {
  //     console.log('NOTIFICATION:', notification);
  
  //     notification.finish(PushNotificationIOS.FetchResult.NoData);
  //   },
  
  //   onPermissionRequest: function (status) {
  //     console.log('PERMISSION:', status);
  //   },
  
  //   requestPermissions: true,
  // });
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <ToastProvider placement="bottom"
        textStyle={commonStyle.toastText}
        >
          <RecoilRoot>
            <StackNavigator screenDetails={SCREENS} />
            </RecoilRoot>
          </ToastProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
