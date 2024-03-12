import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../utils/colors';
import {Meetings, User} from '../interfaces/commonInterface';
import {getNameById, getTimeInFormat} from '../utils/commonUtils';
import {readAllUsers} from '../services/MeetingServices';
import IconText from './IconText';

interface MyMeetingCardProps {
  data: Meetings;
  onEditClickHandler: (data: Meetings) => void;
  onDeleteClickHandler: (id: string) => void;
  onShareHandler: (data: Meetings) => void;
  style: 'wrapper' | 'fullwrapper';
  isChangeable: boolean;
}
/**
 * @description MyMeeting card component
 * @param data Meeting card detail
 * @param onEditClickHandler function handler for edit  event
 * @param onDeleteClickHandler function handler for delete event
 * @param onShareHandler function handler for share event
 * @param  style style name for card
 * @param isChangeable to boolean value to check if edit and delete is accessible
 * @returns MyMeeting Card Component
 */
const MyMeetingCard: React.FC<MyMeetingCardProps> = ({
  data,
  onEditClickHandler,
  onDeleteClickHandler,
  onShareHandler,
  style,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const getAllUsers = async () => {
      const data = await readAllUsers();
      setUsers(data);
    };
    getAllUsers();
  }, []);

  const now = new Date();
  const isChangeable = now <= data.end;

  const members = data?.membersIdList?.map(memberId => (
    <View key={memberId}>
      <Text style={styles.member} key={memberId}>
        {getNameById(users, memberId)}
      </Text>
    </View>
  ));

  return (
    <View style={styles[style]}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{data.title}</Text>

        {isChangeable && (
          <View style={styles.iconWrapper}>
            <MaterialCommunityIcons
              name={'pencil'}
              style={styles.icon}
              size={20}
              onPress={() => onEditClickHandler(data)}
            />
            <MaterialCommunityIcons
              name={'delete'}
              style={styles.icon}
              size={20}
              onPress={() => onDeleteClickHandler(data.id)}
            />
            <MaterialCommunityIcons
              name={'send-outline'}
              style={styles.icon}
              size={20}
              onPress={() => onShareHandler(data)}
            />
          </View>
        )}
      </View>

      <IconText
        containerStyle={'rowContainer'}
        textStyle={'text'}
        text={data.organizerId}
        iconName={'account'}
        iconColor={COLORS.primaryDark}
        iconSize={24}
      />
      <IconText
        containerStyle={'rowContainer'}
        textStyle={'text'}
        text={data.roomName}
        iconName={'map-marker'}
        iconColor={COLORS.primaryDark}
        iconSize={24}
      />
      <IconText
        containerStyle={'rowContainer'}
        textStyle={'text'}
        text={`${getTimeInFormat(data.start)}-${getTimeInFormat(data.end)}`}
        iconName={'clock-time-eight'}
        iconColor={COLORS.primaryDark}
        iconSize={24}
      />
      <Text></Text>

      <View style={styles.memberwrapper}>{members}</View>
    </View>
  );
};

export default MyMeetingCard;

const styles = StyleSheet.create({
  wrapper: {
    width: 300,
    height: 210,
    alignSelf: 'center',
    alignContent: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 15,
    borderWidth: 0.5,
    borderColor: COLORS.white,
    elevation: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 21,
    color: COLORS.primaryDark,
    fontWeight: '600',
    width: '70%',
  },
  tag: {
    fontSize: 15,
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 15,
    color: COLORS.black,
    backgroundColor: COLORS.transparent,
    borderRadius: 50,
  },
  text: {
    fontSize: 19,
    color: COLORS.primaryLight,
    marginLeft: 30,
    marginRight: 20,
  },
  icon: {
    color: COLORS.secondaryLight,
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconWrapper: {
    flexDirection: 'row',
    columnGap: 5,
  },

  fullwrapper: {
    width: '90%',
    alignSelf: 'center',
    alignContent: 'center',
    backgroundColor: COLORS.transparent,
    borderRadius: 5,
    padding: 15,
    borderWidth: 0.5,
    borderColor: COLORS.white,
  },
  btnWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  timeWrapper: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'flex-start',
    columnGap: 30,
    rowGap: 20,
  },
  member: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: '400',
    backgroundColor: COLORS.primaryDark,
    borderRadius: 50,
    borderColor: COLORS.white,
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  memberwrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 3,
    marginVertical: 4,
    overflow: 'scroll',
    height: 'auto',
  },
});
