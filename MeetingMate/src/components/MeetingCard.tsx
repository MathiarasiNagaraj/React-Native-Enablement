import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Meetings} from '../interfaces/commonInterface';
import {ORGANIZED_BY} from '../messages/appMessage';
import {COLORS} from '../utils/colors';
import {getTimeInFormat} from '../utils/commonUtils';

interface MeetingCardProps {
  meetingDetails: Meetings;
}
/**
 * @description Meeting card component
 * @param meetingDetails Meeting details prop
 * @returns meeting card
 */
export const MeetingCard: React.FC<MeetingCardProps> = ({meetingDetails}) => {
  return (
    <View style={styles.wrapper}>
      {meetingDetails.showMeetingTitle && (
        <Text style={styles.title}>{meetingDetails.title}</Text>
      )}
      <Text style={styles.text}>{ORGANIZED_BY(meetingDetails.organizer)}</Text>
      <Text style={styles.text}>
        {getTimeInFormat(meetingDetails.start)}-
        {getTimeInFormat(meetingDetails.end)}{' '}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    elevation: 5,
    margin: 10,
    padding: 20,
  },
  title: {
    fontSize: 20,
    color: COLORS.primaryDark,
  },
  text: {
    fontSize: 18,
    color: COLORS.primaryLight,
  },
});
