import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FloatingButton from '../components/FloatingButton';
import {Header} from '../components/Header';
import {SearchBar} from '../components/SearchBar';
import {MeetingRooms} from '../containers/MeetingRoomsContainer';
import {MyMeetingsContainer} from '../containers/MyMeetingsContainer';
import {
  readAllRoomsByBranch,
  readAllUsers,
  readUpcomingMeetingsByOrganizerId,
} from '../services/firestore';
import {useNavigation} from '@react-navigation/native';
import {ASYNC_STORE_KEY, SCREEN_NAMES} from '../constants/appConstant';
import {useRecoilState, useRecoilValue} from 'recoil';
import {Room} from '../store/atom/roomAtom';
import {Meeting} from '../store/atom/meetingAtom';
import {User} from '../store/atom/userAtom';
import {NO_UPCOMMING_MEETING, TITLE, VIEW_ALL} from '../messages/appMessage';
import {COLORS} from '../utils/colors';
import {Members} from '../store/atom/membersAtom';
import {Meetings, Rooms} from '../interfaces/commonInterface';
import {StackNavigationProp} from '@react-navigation/stack';
import {scheduleNotification} from '../utils/pushNotification';
import {getLocalDataByKey} from '../services/asyncStorage';
import {Loader} from '../components/Loader';

/**
 * @description Home Screen  component
 * @returns HomeScreen component
 */
export const HomeScreen = () => {
  const [meetings, setMeetings] = useRecoilState<Meetings[]>(Meeting);
  const [rooms, setRooms] = useRecoilState<Rooms[]>(Room);
  const [members, setMembers] = useRecoilState(Members);
  const user = useRecoilValue(User);
  const [currentUser, setCurrentUser] = useState();
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {

  // }, []);
  useEffect(() => {
    meetings.length > 0 &&
      meetings?.forEach(meeting => {
        if (meeting.start > new Date()) {
          scheduleNotification(meeting, members);
        }
      });
  }, [meetings]);
  const getLocalData = async () => {
    console.log(ASYNC_STORE_KEY.USER);
    const data = await getLocalDataByKey(ASYNC_STORE_KEY.USER);
    return data;
  };
  const getRoomData = async () => {
    const data = await readAllRoomsByBranch(user.location);
    setRooms(data);
  };
  const getMeetingData = async () => {
    console.log('Check::', currentUser);
    const data = await readUpcomingMeetingsByOrganizerId(currentUser?.id);
    console.log(data.length, 'meeting data');
    setMeetings(data);
  };
  const getAllUserDetails = async () => {
    console.log(currentUser, 'user in user function');
    const data = await readAllUsers();
    setMembers(data);
  };

  const initData = async () => {
    getRoomData();
    getMeetingData();
    if (meetings.length > 0 && rooms.length > 0)
    {
      setIsLoading(false)
      }
    getAllUserDetails();
  };

  const updateLocalData = async () => {
    const userLocalData = await getLocalData();
    setCurrentUser(userLocalData);
  };

  useEffect(() => {
    updateLocalData();
  }, []);
  useEffect(() => {
    if (currentUser !== undefined) {
      initData();
    }
  }, [currentUser]);

  console.log(meetings.length,'len');
  const onFloatingBtnPressHandler = () => {
    navigation.navigate(SCREEN_NAMES.ROOM_BOOKING, {});
  };
  const onViewAllMeetingHandler = () => {
    navigation.navigate(SCREEN_NAMES.MY_BOOKING, {});
  };
  const onViewAllRoomHandler = () => {
    navigation.navigate(SCREEN_NAMES.MEETING_ROOMS, {});
  };
  return  isLoading ? (
    <Loader />
  ) : (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <Header />
      <View style={styles.fullContainer}>
        <SearchBar />
        <ScrollView style={styles.container}>
          <View>
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
                  <Text style={styles.fallBackText}>
                    {NO_UPCOMMING_MEETING}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.wrapper}>
              <Text style={styles.title}>{TITLE.MEETING_ROOMS}</Text>
              <Text style={styles.underLineText} onPress={onViewAllRoomHandler}>
                {VIEW_ALL}
              </Text>
            </View>

            <MeetingRooms isHorizontal={true} style="wrapper" />
          </View>
        </ScrollView>
      </View>
      <FloatingButton onPress={onFloatingBtnPressHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  fullContainer: {
    marginTop: 10,
    backgroundColor: '#f7f1f1',
    borderWidth: 2,
    flex: 1,
    borderColor: '#f7f1f1',
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
  },
  container: {
    paddingBottom: 40,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
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
