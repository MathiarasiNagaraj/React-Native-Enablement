import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FloatingButton from '../components/FloatingButton';
import { Header } from '../components/Header';
import { SearchBar } from '../components/SearchBar';
import { LinearGradientContainer } from '../containers/LinearGradientContainer';
import { MeetingRooms } from '../containers/MeetingRoomsContainer';
import { MyMeetingsContainer } from '../containers/MyMeetingsContainer';
import {
  readAllRoomsByBranch,
  readAllUsers,
  readUpcomingMeetingsByOrganizerId,
} from '../services/firestore';
import { useNavigation } from '@react-navigation/native';
import { SCREEN_NAMES } from '../constants/appConstant';
import { useRecoilState, useRecoilValue } from 'recoil';

import { Room } from '../store/atom/roomAtom';
import { Meeting } from '../store/atom/meetingAtom';
import { User } from '../store/atom/userAtom';
import { NO_UPCOMMING_MEETING, TITLE, VIEW_ALL } from '../messages/appMessage';
import { COLORS } from '../utils/colors';
import { Members } from '../store/atom/membersAtom';
import { Meetings, Rooms } from '../interfaces/commonInterface';
import { useTimeInterval } from '../hooks/useTimeInterval';
import { getData } from '../services/asyncStorage';
import { StackNavigationProp } from '@react-navigation/stack';
import { scheduleNotification } from '../utils/pushNotification';
export const HomeScreen = () => {

  const [meetings, setMeetings] = useRecoilState<Meetings[]>(Meeting);
  const [rooms, setRooms] = useRecoilState<Rooms[]>(Room);
  const [members, setMembers] = useRecoilState(Members);
  const [isInialized, setIsInitialized] = useState(false);
  const user = useRecoilValue(User);
  const [currentUser, setUser] = useState({});
  const navigation = useNavigation<StackNavigationProp<any>>();
  const interval = 60000
  useEffect(() => {
    const getasyncData = async () => {
      const data = await getData('user');
      setUser(data);

    };
    getasyncData();
  },[]);
  useEffect(() => {
    meetings.length>0&& meetings?.forEach(meeting => {
      if (meeting.start > new Date()) {
        scheduleNotification(meeting,members);
      }
    });

  }, [meetings]);

  const getRoomData = async () => {
    const data = await readAllRoomsByBranch(user.location);
    setRooms(data);
  };
  const getMeetingData = async () => {
    const data = await readUpcomingMeetingsByOrganizerId(currentUser.id);
    setMeetings(data);
  };
  const getAllUserDetails = async () => {

    const data = await readAllUsers();
    setMembers(data);
  }
  useEffect(() => {
    getAllUserDetails()
    getRoomData();
    getMeetingData();
setIsInitialized(true)
  },[])
  useEffect(() => {
    getAllUserDetails()
    getRoomData();
    getMeetingData();
setIsInitialized(true)
  }, [user]);

  useEffect(() => {
    // upDateUpcomingMeeting()
},[isInialized])

  

  // //function for updating room upcomming meeting
  // const upDateUpcomingMeeting = () => {
  //   const currentTime = new Date();
  //   const updatedMeeting = meetings?.filter((meeting: Meetings) => {
  //     const startTime = new Date(meeting?.start);
  //     return startTime > currentTime;
  //   });
  //   setMeetings(updatedMeeting);
  // };

  // useTimeInterval(upDateUpcomingMeeting, interval);


  const onFloatingBtnPressHandler = () => {
    navigation.navigate(SCREEN_NAMES.ROOM_BOOKING, {});
  };
  const onViewAllMeetingHandler = () => {
    navigation.navigate(SCREEN_NAMES.MY_BOOKING, {});
  };
  const onViewAllRoomHandler = () => {
    navigation.navigate(SCREEN_NAMES.MEETING_ROOMS, {});
  };
  return (
    
   
    <LinearGradientContainer>
      {!isInialized ? <ActivityIndicator size="large" color={COLORS.primaryDark} style={{alignSelf:'center'}} /> :
        <>
      <Header />
      <SearchBar />
      <ScrollView style={styles.container}>
        <View>
          <View style={styles.wrapper}>
            <Text style={styles.title}>{TITLE.MY_UPCOMING_MEETING}</Text>
            <Text
              style={styles.underLineText}
              onPress={onViewAllMeetingHandler}>
              {VIEW_ALL}
            </Text>
          </View>
          {meetings.length > 0 ? (
            <MyMeetingsContainer style="wrapper" isHorizontal={true} />
          ) : (
            <View style={styles.fallback}>
              <Text style={styles.fallBackText}> {NO_UPCOMMING_MEETING}</Text>
            </View>
          )}
        </View>
        <View>
          <View style={styles.wrapper}>
            <Text style={styles.title}>{TITLE.MEETING_ROOMS}</Text>
            <Text style={styles.underLineText} onPress={onViewAllRoomHandler}>
              {VIEW_ALL}
            </Text>
          </View>

          <MeetingRooms rooms={rooms} isHorizontal={true} style="wrapper" />
        </View>
      </ScrollView>
          <FloatingButton onPress={onFloatingBtnPressHandler} />
          </>
      }
    </LinearGradientContainer>
  );
          
  
          
};

const styles = StyleSheet.create({
  container: {
paddingBottom:40
   
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems:'center'
  },
  title: { 
    fontSize: 23,
    color: COLORS.primaryDark,
    fontWeight: '600',
  },
  fallBackText: {
    fontSize: 20,
    color: COLORS.white,
    fontWeight: '600',
  },
  fallback: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.transparent,
    width: '90%',
    alignSelf: 'center',
  },
  text: {
    color: COLORS.white,
    fontSize: 15,
  },
  underLineText: {
    textDecorationLine: 'underline',
    color: COLORS.primaryDark,
    fontWeight: '500',
  },
});
