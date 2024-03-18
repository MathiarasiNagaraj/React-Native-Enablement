import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, { useEffect } from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useRecoilState} from 'recoil';
import RoomListItem from '../components/RoomListItem';
import ScreenHeader from '../components/ScreenHeader';
import {SCREEN_NAMES} from '../constants/appConstant';
import {LinearGradientContainer} from '../containers/LinearGradientContainer';
import {Meetings, Rooms} from '../interfaces/commonInterface';
import { Meeting } from '../store/atom/meetingAtom';
import {Room} from '../store/atom/roomAtom';

export const MeetingRoomListScreen = () => {
  const [rooms, setRooms] = useRecoilState(Room);
  const navigate = useNavigation<StackNavigationProp<any>>();
  const onPressHandler = (room: Rooms) => {
    navigate.navigate(SCREEN_NAMES.ROOM_QR_BOOKING, {room: room});
  };

  const [meetings, setMeetings] = useRecoilState<Meetings[]>(Meeting);

  //function for updating room availablity status
  const updateRoomStatus = () => {

    meetings.length > 0 &&
      meetings?.forEach(async (meeting: Meetings) => {
        const startTime = new Date(meeting?.start);
        const endTime = new Date(meeting?.end);
        const currentTime = new Date();
        const room: Rooms | undefined = rooms.find(
          (room: Rooms) => room.id === meeting.roomId,
        );

        if (room) {
          if (currentTime < endTime) {
            const isMeetingOngoing =
              currentTime >= startTime && currentTime <= endTime;
            const newAvailability = !isMeetingOngoing;

            if (newAvailability !== room.availability) {
              const updatedRoom = {...room, availability: newAvailability};

              setRooms((prevRooms: Rooms[]) =>
                prevRooms.map(prevRoom =>
                  prevRoom.id === updatedRoom.id ? updatedRoom : prevRoom,
                ),
              );
            }
          } else if (room.availability !== true) {
  
            const updatedRoom = {...room, availability: true};
            setRooms((prevRooms: Rooms[]) =>
              prevRooms.map(prevRoom =>
                prevRoom.id === updatedRoom.id ? updatedRoom : prevRoom,
              ),
            );
          }
        }
      });
  };

  useEffect(() => {
    updateRoomStatus();
  }, []);
  useEffect(() => {
    updateRoomStatus();
  }, [meetings]);
  const roomList = (
    <FlatList
      data={rooms}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => item.name}
      contentContainerStyle={styles.container}
      ItemSeparatorComponent={() => <View style={{height: 15}} />}
      renderItem={({item}) => (
        <RoomListItem room={item} onPressHandler={onPressHandler} />
      )}
    />
  );

  return <LinearGradientContainer>
    <ScreenHeader style='transparentWrapper' iconStyle='darkIcon'/>
    {roomList}</LinearGradientContainer>;
};
const styles = StyleSheet.create({
  container: {
    width: '80%',
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
  },
});
