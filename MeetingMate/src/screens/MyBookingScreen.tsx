import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {LinearGradientContainer} from '../containers/LinearGradientContainer';

import ScreenHeader from '../components/ScreenHeader';
import MyMeetingCard from '../components/MyMeetingCard';
import {useRecoilState} from 'recoil';
import {Room} from '../store/atom/roomAtom';
import {getNameById} from '../utils/commonUtils';
import {ASYNC_STORE_KEY, SCREEN_NAMES} from '../constants/appConstant';
import {TITLE} from '../messages/appMessage';
import {getLocalDataByKey} from '../services/LocalStorageServices';
import {
  readAllPreviousMeetingByUser,
  readAllUsers,
} from '../services/MeetingServices';
import {MyMeetingsContainer} from '../containers/MyMeetingsContainer';
import {COLORS} from '../utils/colors';

export const MyBookingScreen = () => {
  const [rooms, setRooms] = useRecoilState(Room);
  const [previousMeeting, setPreviousMeeting] = useState([]);
  const [users, setUsers] = useState([]);

  const getPreviousData = async () => {
    const user = await getLocalDataByKey(ASYNC_STORE_KEY.USER);
    const data = await readAllPreviousMeetingByUser(user.id);
    setPreviousMeeting(data);
  };
  const getAllUsers = async () => {
    const data = await readAllUsers();
    setUsers(data);
  };

  useEffect(() => {
    getAllUsers();
    getPreviousData();
  }, []);
  const updatedData = previousMeeting?.map(meeting => {
    return {
      ...meeting,
      organizerId: getNameById(users, meeting.organizerId),
      roomName: getNameById(rooms, meeting.roomId),
    };
  });

  const myPreviousBookings = (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={updatedData}
      contentContainerStyle={styles.container}
      ItemSeparatorComponent={() => <View style={{width: 15}} />}
      renderItem={item => (
        <MyMeetingCard
          style={'wrapper'}
          data={item.item}
          isChangeable={false}
        />
      )}
    />
  );
  return (
    <LinearGradientContainer>
      <ScreenHeader title={SCREEN_NAMES.MY_BOOKING}
          style={'wrapper'}
          iconStyle={'icon'}    
      />
      <Text style={styles.title}>{TITLE.MY_UPCOMING_MEETING}</Text>
      <MyMeetingsContainer style="wrapper" isHorizontal={true} />
      <Text style={styles.title}>{TITLE.PREVIOUS_MEETING}</Text>
      {myPreviousBookings}
    </LinearGradientContainer>
  );
};

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    height: 250,
  },
  title: {
    fontSize: 23,
    color: COLORS.primaryDark,
    fontWeight: '600',
    margin: 20,
  },
});
