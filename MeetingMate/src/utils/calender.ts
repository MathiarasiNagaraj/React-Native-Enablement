import { PermissionsAndroid } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import * as AddCalendarEvent from 'react-native-add-calendar-event';

// import {
//    calendarPermitted,
//    calendarNotPermitted,
//    calendarFail,
//   } from './flashAlertMessage';

export const addToAndroidCal = async (
   title: string,
   startDate: any,
   endDate: any,
   location: string,
   url: string
  ) => {
   try {
      const granted = await PermissionsAndroid.request(
         PermissionsAndroid.PERMISSIONS.WRITE_CALENDAR,
           {
            title: 'Calendar Permission',
            message: 'This app needs calendar access to add events',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
           }
        );

  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
     showMessage({message:'success',type:'success'});
    } else {
     showMessage({message:'denied'});
     return; // Exit the function if permission is denied
    }

  const calendarEvent = {
     title: title,
     startDate: startDate.toISOString(),
     endDate: endDate.toISOString(),
     location: location,
     notes: title,
     url: url,
    };

  AddCalendarEvent.presentEventCreatingDialog(calendarEvent)
     .then(
      (eventInfo: {
         calendarItemIdentifier: string;
         eventIdentifier: string;
        }) => {
           // handle success - receives an object with `calendarItemIdentifier` and `eventIdentifier` keys, both of type string.
           // On Android, where they are both equal and represent the event id, also strings.
           // when { action: 'CANCELED' } is returned, the dialog is dismissed
           console.warn(JSON.stringify(eventInfo));
         }
       )
   .catch((error: string) => {
    showMessage({message:'Calender ',type:'danger'});
   });
 } catch (error) {
  console.warn('Error adding event to calendar:', error);
 }
};