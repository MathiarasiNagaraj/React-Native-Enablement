import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {useRecoilState} from 'recoil';
import {MeetingCard} from '../components/MeetingCard';
import {AVAILABLE, TODAY_MEETING} from '../messages/appMessage';
import {readMeetingbyRoomId} from '../services/firestore';
import {Members} from '../store/atom/membersAtom';
import {COLORS} from '../utils/colors';
import {getNameById} from '../utils/commonUtils';
import {Dimensions} from 'react-native';
export const RoomBookingScreen = () => {
  const route = useRoute();
  const {room} = route.params;
  const [members, setMembers] = useRecoilState(Members);
  const [meetings, setMeetings] = useState([]);
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
    const data = await readMeetingbyRoomId(room.id);
    setMeetings(data);
  };
  // console.log(room.roomImg)
  useEffect(() => {
    getMeetingsByRoomId();
  }, []);
  return windowWidth < 768 ? (
    <View style={styles.container}>
      <Image source={{uri: room.roomImg}} style={styles.img} />
      <View style={styles.wrapper}>
        <Text style={styles.title}>{room.name}</Text>
        <Text style={styles.text}>{TODAY_MEETING}</Text>
        {roomMeetings}
      </View>
    </View>
  ) : (
      <View style={styles.fullContainer}>
        <View style={[styles.sideBox,{backgroundColor:room.availability?COLORS.green:COLORS.red}]}>
          {room.availability ? <Text style={styles.availableText}>
            {AVAILABLE}
          </Text> : <View>
          </View>}

        </View>
         <View style={styles.wrapper}>
        <Text style={styles.title}>{room.name}</Text>
        <Text style={styles.text}>{TODAY_MEETING}</Text>
        {roomMeetings}
      </View>
  </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  fullContainer: {
    flex: 1,
    flexDirection:'row'
  },
  availableText: {
    color: COLORS.white,
    fontSize: 50,
    fontWeight:'700',
    width: '50%',
    textAlign:'center'
  },
  box: {
    width: '100%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sideBox: {
    height: '100%',
    width: '60%',
    justifyContent: 'center',
    alignItems:'center'
  },
  wrapper: {},
  img: {
    width: '100%',
    height: '20%',
    alignSelf: 'center',
    borderRadius: 5,
  },
  title: {
    color: COLORS.primaryDark,
    fontSize: 20,
    margin: 10,
    fontWeight: '800',
  },
  text: {
    color: COLORS.primaryDark,
    fontSize: 17,
    margin: 10,
  },
});
