import notifee, {
    AndroidImportance,
    AndroidVisibility,
    TriggerType,
  } from '@notifee/react-native'
import { Meetings, User } from "../interfaces/commonInterface";
import { getNameById } from "./commonUtils";

export   async function scheduleNotification(meeting:Meetings,members:User[]) {
    const notificationDate = new Date();
    const notificationTimestamp = notificationDate.setHours(
     meeting.start.getHours(),
      meeting.start.getMinutes(),
      0,
      0,
    );
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
      vibration: true,
    });

    // Create a time-based trigger
    const trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: notificationTimestamp,
      importance: AndroidImportance.HIGH,
      visibility: AndroidVisibility.PUBLIC,
    };

    await notifee.displayNotification({
      title: meeting.title,
      body: `Organized by  ${getNameById( members,meeting.organizerId)}`,
      android: {
        channelId: 'default',
        loopSound: true,
        sound: 'Default',
        pressAction: {
          id: 'default',
        },
        vibrationPattern: [300, 500],
      },
    });

    await notifee.createTriggerNotification(
      {
        title: meeting.title,
        body: `Organized by  ${getNameById( members,meeting.organizerId)}`,
        android: {
          channelId: 'default',
          loopSound: true,
          sound: 'Default',
          vibrationPattern: [300, 500],
        },
      },
      trigger,
    );
  }