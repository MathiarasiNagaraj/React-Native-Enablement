import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useRecoilState} from 'recoil';
import {MeetingCard} from '../components/MeetingCard';
import {
  AVAILABLE,
  NO_UPCOMMING_MEETING,
  ORGANIZED_BY,
  TODAY_MEETING,
} from '../messages/appMessage';
import {readMeetingbyRoomId} from '../services/MeetingServices';
import {Members} from '../store/atom/membersAtom';
import {COLORS} from '../utils/colors';
import {getNameById} from '../utils/commonUtils';
import QRCode from 'react-native-qrcode-svg';
import {Dimensions} from 'react-native';
import RoomFacilityContainer from '../containers/RoomFacilityContainer';
import ScreenHeader from '../components/ScreenHeader';
import MeetingsContainer from '../containers/MeetingsContainer';
import RoomDetailsContainer from '../containers/RoomDetailsContainer';

export const RoomBookingScreen = () => {
  const route = useRoute();
  const {room} = route.params;
  const [members, setMembers] = useRecoilState(Members);
  const [meetings, setMeetings] = useState([]);
  const [currentMeeting, setCurrentMeeting] = useState({});
  const {width, height} = Dimensions.get('window');
  const isTablet = Math.min(width, height) >= 600;

  //getting organizer name with id
  const updatedMeetings = meetings.map(meeting => {
    meeting.organizer = getNameById(members, meeting.organizerId);
    return meeting;
  });

  //room meetings list
  const roomMeetings = (
    <FlatList
      data={updatedMeetings}
      renderItem={({item}) => <MeetingCard meetingDetails={item} />}
    />
  );

  //fetching meetings for room id
  const getMeetingsByRoomId = async () => {
    const currentTime = new Date();
    const data = await readMeetingbyRoomId(room.id);
    setMeetings(data);
    data.map(meeting => {
      if (currentTime >= meeting.start && currentTime <= meeting.end)
        setCurrentMeeting(meeting);
    });
  };
  useEffect(() => {
    getMeetingsByRoomId();
  }, []);

  return (
    <>
      {isTablet ? (
        <View style={styles.fullContainer}>
          <ScreenHeader style={'transparentWrapper'} iconStyle={'icon'} />
          <View
            style={[
              styles.sideBox,
              {backgroundColor: room.availability ? COLORS.green : COLORS.red},
            ]}>
            <QRCode size={200} value={room.id} />
            {room.availability ? (
              <Text style={styles.availableText}>{AVAILABLE}</Text>
            ) : (
              <View style={styles['meetingWrapper']}>
                <Text style={styles.meetingTitle}>{currentMeeting.title}</Text>
                <Text style={styles.meetingText}>
                  {ORGANIZED_BY(currentMeeting.organizer)}
                </Text>
              </View>
            )}
          </View>
          <RoomDetailsContainer
            flag={updatedMeetings.length > 0}
            room={room}
            roomMeetings={roomMeetings}
          />
        </View>
      ) : (
          <MeetingsContainer room={room} roomMeetings={roomMeetings} flag={ updatedMeetings.length > 0} />
      )}
    </>
  );
};
const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
  },
  availableText: {
    color: COLORS.white,
    fontSize: 45,
    fontWeight: '300',
    width: '50%',
    margin: 20,
    textAlign: 'center',
  },
  fallBackText: {
    fontSize: 20,
    color: COLORS.primaryDark,
    fontWeight: '600',
  },
  fallback: {
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    width: '90%',
    alignSelf: 'center',
  },
  box: {
    width: '100%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sideBox: {
    height: '50%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    flex: 1,
    padding: 20,
    margin: 20,
  },
  innerWrapper: {},
  meetingWrapper: {
    margin: 30,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  img: {
    width: '100%',
    height: '20%',
    alignSelf: 'center',
    borderRadius: 5,
  },
  title: {
    color: COLORS.primaryDark,
    fontSize: 30,
    margin: 10,
    fontWeight: '600',
  },

  meetingTitle: {
    color: COLORS.white,
    fontSize: 31,
    fontWeight: '600',
  },
  meetingText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
  },
  text: {
    color: COLORS.primaryDark,
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 20,
  },
});
