import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {LinearGradientContainer} from '../containers/LinearGradientContainer';

import ScreenHeader from '../components/ScreenHeader';
import MyMeetingCard from '../components/MyMeetingCard';
import {useRecoilState} from 'recoil';
import {Room} from '../store/atom/roomAtom';
import {getNameById, getPropertyByIDFromCollection} from '../utils/commonUtils';
import {ASYNC_STORE_KEY, SCREEN_NAMES} from '../constants/appConstant';
import {NO_UPCOMMING_MEETING, TITLE} from '../messages/appMessage';
import {getLocalDataByKey} from '../services/LocalStorageServices';
import {
  readAllPreviousMeetingByUser,
  readAllRooms,
  readAllUsers,
} from '../services/MeetingServices';
import {MyMeetingsContainer} from '../containers/MyMeetingsContainer';
import {COLORS} from '../utils/colors';
import {Meetings, User} from '../interfaces/commonInterface';
import {Meeting} from '../store/atom/meetingAtom';
import List from '../components/List';
import ModalComponent from '../components/Modal';
import {Members} from '../store/atom/membersAtom';

export const MyBookingScreen = () => {
  const [rooms, setRooms] = useState();
  const [previousMeeting, setPreviousMeeting] = useState([]);
  const [users, setUsers] = useState([]);
  const [meetings, setMeetings] = useRecoilState<Meetings[]>(Meeting);
  const [isVisible, setIsVisible] = useState(false);
  const [component, setComponent] = useState<React.ReactNode>();
  const [members, setMembers] = useRecoilState<User[]>(Members);
  const getPreviousData = async () => {
    const user = await getLocalDataByKey(ASYNC_STORE_KEY.USER);
    const data = await readAllPreviousMeetingByUser(user.id);

    setPreviousMeeting(data);
  };
  const getAllUsers = async () => {
    const data = await readAllUsers();
    setUsers(data);
  };
  const readAllRoom = async () => {
    const rooms = await readAllRooms();
    setRooms(rooms);
  };
  useEffect(() => {
    readAllRoom();
  }, []);
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
  const onMemberPressHandler = (data: Meetings) => {
    const memberList = data.membersIdList.map(id => {
      const memberData = {
        name: getPropertyByIDFromCollection(members, id, 'name'),
        imgUrl: getPropertyByIDFromCollection(members, id, 'imgUrl'),
      };
      return memberData;
    });
    setIsVisible(true);
    setComponent(<List data={memberList} />);
  };
  const myPreviousBookings = (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={updatedData}
      contentContainerStyle={styles.container}
      ItemSeparatorComponent={() => <View style={{width: 20}} />}
      renderItem={item => (
        <MyMeetingCard
          style={'wrapper'}
          data={item.item}
          isChangeable={false}
          onMemberPressHandler={onMemberPressHandler}
        />
      )}
    />
  );
  return (
    <LinearGradientContainer>
      <ModalComponent
        isVisible={isVisible}
        component={component}
        closeModal={() => setIsVisible(false)}
      />
      <ScreenHeader
        title={SCREEN_NAMES.MY_BOOKING}
        style={'wrapper'}
        iconStyle={'icon'}
      />
      <Text style={styles.title}>{TITLE.MY_UPCOMING_MEETING}</Text>
      {meetings.length > 0 ? (
        <MyMeetingsContainer style="wrapper" isHorizontal={true} />
      ) : (
        <View style={styles.fallback}>
          <Text style={styles.fallBackText}>{NO_UPCOMMING_MEETING}</Text>
        </View>
      )}
      <Text style={styles.title}>{TITLE.PREVIOUS_MEETING}</Text>
      {myPreviousBookings}
    </LinearGradientContainer>
  );
};

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 23,
    color: COLORS.primaryDark,
    fontWeight: '600',
    margin: 20,
  },
  fallBackText: {
    fontSize: 20,
    color: COLORS.white,
    fontWeight: '600',
  },
  fallback: {
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.transparent,
    width: '90%',
    alignSelf: 'center',
  },
});
