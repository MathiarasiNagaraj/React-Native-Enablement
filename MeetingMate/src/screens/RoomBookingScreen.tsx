import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {useRecoilState} from 'recoil';
import {MeetingCard} from '../components/MeetingCard';
import {AVAILABLE, ORGANIZED_BY, TODAY_MEETING} from '../messages/appMessage';
import {readMeetingbyRoomId} from '../services/MeetingServices';
import {Members} from '../store/atom/membersAtom';
import {COLORS} from '../utils/colors';
import {getNameById} from '../utils/commonUtils';
import QRCode from 'react-native-qrcode-svg';
import {Dimensions} from 'react-native';
import RoomFacilityContainer from '../containers/RoomFacilityContainer';
import ScreenHeader from '../components/ScreenHeader';
import MeetingsContainer from '../containers/MeetingsContainer';
export const RoomBookingScreen = () => {
  const route = useRoute();
  const {room} = route.params;
  const [members, setMembers] = useRecoilState(Members);
  const [meetings, setMeetings] = useState([]);
  const [currentMeeting, setCurrentMeeting] = useState({});
  const windowWidth = Dimensions.get('window').width;
  const updatedMeetings = meetings.map(meeting => {
    meeting.organizer = getNameById(members, meeting.organizerId);
    return meeting;
  });

  const roomMeetings = (
    <FlatList
      data={updatedMeetings}
      renderItem={({item}) => <MeetingCard meetingDetails={item} />}
    />
  );
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
      {(windowWidth >= 768 && windowWidth <1024)? (
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
    <View style={styles.wrapper}>
      <Text style={styles.title}>{room.name}</Text>
      <RoomFacilityContainer details={room} />
      <Text style={styles.text}>{TODAY_MEETING}</Text>
      {roomMeetings}
    </View>
  </View>
        
         
     
      ) : (
        <MeetingsContainer room={room} roomMeetings={ roomMeetings} />
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
    justifyContent: 'center',
    padding: 20,
    margin: 20,
    backgroundColor: COLORS.transparent,
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
    fontSize: 17,
    margin: 10,
  },
});
