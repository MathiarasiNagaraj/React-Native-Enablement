import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import {COLORS} from '../utils/colors';
import {Meetings, User} from '../interfaces/commonInterface';
import {getNameById, msToHoursMinutes} from '../utils/commonUtils';
import {readAllUsers} from '../services/firestore';

interface MyMeetingCardProps {
  data: Meetings;
  onEditClickHandler: (data: Meetings) => void;
  onDeleteClickHandler: (id: string) => void;
  onShareHandler:(data:Meetings)=>void
  style: 'wrapper'|'fullwrapper';
  isChangeable: boolean;
}
const MyMeetingCard: React.FC<MyMeetingCardProps> = ({
  data,
  onEditClickHandler,
  onDeleteClickHandler,
  onShareHandler,
  style,
  isChangeable,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const getAllUsers = async () => {
      const data = await readAllUsers();
      setUsers(data);
    };
    getAllUsers();
  }, []);

  const members = data?.membersIdList?.map(memberId => (
    <Text style={styles.member} key={memberId}> {getNameById(users, memberId)} </Text>
  ));

  return (
    <View style={styles[style]}>
      <View style={styles.nameWrapper}>
        <Text style={styles.title}>{data.title}</Text>
        {isChangeable && (
          <View style={styles.iconWrapper}>
            <MaterialCommunityIcons
              name={'pencil'}
              size={22}
              onPress={() => onEditClickHandler(data)}
              color={COLORS.white}
            />
            <MaterialCommunityIcons
              name={'delete'}
              size={22}
              onPress={() => onDeleteClickHandler(data.id)}
              color={COLORS.black}
            />
          </View>
        )}
      </View>
      <View>
      <MaterialCommunityIcons
              name={'send-outline'}
              size={22}
              onPress={() => onShareHandler(data)}
              color={COLORS.black}
            />
      </View>
      <Text>
        <MaterialCommunityIcons
          name={'account'}
          size={25}
          color={COLORS.primaryDark}
        />
        <Text style={styles.text}> {data.organizerId}</Text>
      </Text>
    
     
    
      <Text>
        <MaterialCommunityIcons
          name={'map-marker'}
          size={22}
          color={COLORS.primaryDark}
        />
        <Text style={styles.text}> {data.roomName}</Text>
      </Text>
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 5,
          alignItems: style === 'wrapper' ? 'flex-start' : 'center',
          columnGap: 30,
          rowGap: style === 'wrapper' ? 20 : 0,
        }}>
        <Text>
          <MaterialCommunityIcons
            name={'clock-time-eight'}
            size={20}
            color={COLORS.primaryDark}
          />

          <Text style={styles.text}>
            {' '}
            {data.start.getHours() + ':' + data.start.getMinutes()}-
            {data.end.getHours() + ':' + data.end.getMinutes()}
          </Text>
        </Text>
        <Text>
          <MaterialCommunityIcons
            name={'timer-sand'}
            size={21}
            color={COLORS.primaryDark}
          />
          <Text style={styles.text}>
            {' '}
            {msToHoursMinutes(data.end.getTime() - data.start.getTime())}
          </Text>
        </Text>
       
      </View>
      <View style={styles.memberwrapper}>{members}</View>
    </View>
  );
};

export default MyMeetingCard;
const styles = StyleSheet.create({
  wrapper: {
    width: 300,
    height:250,
    alignSelf: 'center',
    alignContent: 'center',
    backgroundColor: COLORS.transparent,
    borderRadius: 5,
    padding: 15,
    borderWidth: 0.5,
    borderColor: COLORS.white,
  },
  member: {
    fontSize: 16,
    color:COLORS.white,
    fontWeight: '400',
    backgroundColor: COLORS.transparent,
    borderRadius: 50,
    borderColor:COLORS.white,
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingVertical:5,

  },
  memberwrapper:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
    rowGap:10,
    marginVertical:4,
  },
  nameWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconWrapper: {
    flexDirection: 'row',
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
  title: {
    fontSize: 19,
    color: COLORS.white,
    fontWeight: '600',
  },
  text: {
    fontSize: 19,
    color: COLORS.white,
    marginLeft: 30,
    marginRight: 20,
  },
});
