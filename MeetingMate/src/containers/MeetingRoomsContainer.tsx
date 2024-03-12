import React, {useEffect} from 'react';
import {FlatList, View} from 'react-native';
import {useRecoilState} from 'recoil';
import {RoomDetails} from '../components/RoomDetailCard';
import {INTERVAL} from '../constants/appConstant';
import {useTimeInterval} from '../hooks/useTimeInterval';
import {Meetings, Rooms} from '../interfaces/commonInterface';
import {Meeting} from '../store/atom/meetingAtom';
import {Room} from '../store/atom/roomAtom';

interface MeetingRoomsProps {
  isHorizontal: boolean;
  style: string;
}
/**
 * @description Meeting Room Container component
 * @param rooms Room data
 * @param isHorizontal Boolean value for flatlist type
 * @param style style for Flatlist
 * @returns Meeting Room Container
 */
export const MeetingRooms: React.FC<MeetingRoomsProps> = ({
  isHorizontal,
  style,
}) => {
  
  const [rooms, setRooms] = useRecoilState<Rooms[]>(Room);
  const [meetings, setMeetings] = useRecoilState<Meetings[]>(Meeting);

  //function for updating room availablity status
  const updateRoomStatus = () => {
    meetings.length > 0 &&
      meetings?.forEach((meeting: Meetings) => {
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
  useTimeInterval(updateRoomStatus, INTERVAL);
  return (
    <FlatList
      horizontal={isHorizontal}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={
        isHorizontal
          ? {paddingHorizontal: 20, marginBottom: 40}
          : {paddingVertical: 20, marginBottom: 40}
      }
      ItemSeparatorComponent={() => (
        <View style={isHorizontal ? {width: 15} : {height: 15}} />
      )}
      data={rooms}
      renderItem={({item}) => (
        <RoomDetails key={item.id} details={item} style={style} />
      )}
      keyExtractor={item => item.name}
    />
  );
};
