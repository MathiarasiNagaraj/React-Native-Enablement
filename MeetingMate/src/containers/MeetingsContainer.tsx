import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ScreenHeader from '../components/ScreenHeader';
import {AVAILABLITY, TODAY_MEETING} from '../messages/appMessage';
import RoomFacilityContainer from './RoomFacilityContainer';
import {COLORS} from '../utils/colors';
import Tag from '../components/Tag';

export default function MeetingsContainer({room, roomMeetings}) {
  return (
    <>
      <ScreenHeader style={'transparentWrapper'} iconStyle={'darkIcon'} />
      <View style={styles.container}>
        <View style={styles.imgWrapper}>
          <Image source={{uri: room.roomImg}} style={styles.img} />

          <Tag
            text={room.availability ? AVAILABLITY.AVAILABLE : AVAILABLITY.BUSY}
            textStyle={room.availability ? 'greenText' : 'redText'}
            indicatorStyle={room.availability ? 'greenRound' : 'redRound'}
          />
        </View>
        <View>
          <Text style={styles.roomtitle}>{room.name}</Text>
          <RoomFacilityContainer details={room} />
          <Text style={styles.text}>{TODAY_MEETING}</Text>
          {roomMeetings}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    marginTop: 60,
  },
  roomtitle: {
    color: COLORS.primaryDark,
    fontSize: 20,
    margin: 10,
    fontWeight: '600',
  },
  text: {
    color: COLORS.primaryDark,
    fontSize: 17,
    margin: 10,
  },
  img: {
    width: '100%',
    height: 180,
    alignSelf: 'center',
    borderRadius: 5,
  },
  imgWrapper: {
    position: 'relative',
  },
});
