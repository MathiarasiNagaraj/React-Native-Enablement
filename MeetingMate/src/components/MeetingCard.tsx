import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Meetings} from '../interfaces/commonInterface';
import {ORGANIZED_BY} from '../messages/appMessage';
import {COLORS} from '../utils/colors';
import {getTimeInFormat} from '../utils/commonUtils';
import IconText from './IconText';

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

      <IconText
        containerStyle={'rowContainer'}
        textStyle={'text'}
        text={meetingDetails.organizer}
        iconName={'account'}
        iconColor={COLORS.primaryDark}
        iconSize={24}
      />
    <IconText
        containerStyle={'rowContainer'}
        textStyle={'text'}
        text={`${getTimeInFormat(meetingDetails.start)}-${getTimeInFormat(meetingDetails.end)}`}
        iconName={'clock-time-eight'}
        iconColor={COLORS.primaryDark}
        iconSize={24}
      />
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
    fontSize: 22,
    color: COLORS.primaryDark,
    fontWeight:'800'
  },
  text: {
    fontSize: 18,
    color: COLORS.primaryLight,
  },
});
