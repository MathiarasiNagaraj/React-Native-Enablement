import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {LinearGradientContainer} from '../containers/LinearGradientContainer';
import {useRoute, useNavigation} from '@react-navigation/native';
import Button from '../components/Button';
import {COLORS} from '../utils/colors';
import ScreenHeader from '../components/ScreenHeader';
import {readMeetingbyRoomId} from '../services/MeetingServices';
import {AVAILABLITY, MEETING_ROOM, NO_MEETING} from '../messages/appMessage';
import {BUTTONS, SCREEN_NAMES} from '../constants/appConstant';
import {StackNavigationProp} from '@react-navigation/stack';
import EventCalender from '../components/EventCalender';
import IconText from '../components/IconText';
import Tag from '../components/Tag';
import RoomFacilityContainer from '../containers/RoomFacilityContainer';

export const MeetingRoomDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<StackNavigationProp<any>>();
  const {details} = route.params;

  const [events, setEvents] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const data = await readMeetingbyRoomId(details.id);
      setEvents(data);
    };

    getData();
  }, [details]);

  const onBookHandler = () => {
    const id = details.id;
    navigation.navigate(SCREEN_NAMES.ROOM_BOOKING, {id});
  };

  return (
    <LinearGradientContainer>
      <ScreenHeader title={'Meeting Room'} />
      <ScrollView
        contentContainerStyle={styles.container}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.imgWrapper}>
          <Image source={{uri: details.roomImg}} style={styles.roomImg} />

          <Tag
            text={
              details.availability ? AVAILABLITY.AVAILABLE : AVAILABLITY.BUSY
            }
            textStyle={details.availability ? 'greenText' : 'redText'}
            indicatorStyle={details.availability ? 'greenRound' : 'redRound'}
          />
        </View>

        <Text style={styles.title}>{details.name}</Text>
        <IconText
          containerStyle={'rowContainer'}
          textStyle={'text'}
          text={`${details.location} , ${details.branch}`}
          iconName={'map-marker'}
          iconColor={COLORS.primaryDark}
          iconSize={24}
        />

        <Text style={[styles.mediumTitle, {alignSelf: 'flex-start'}]}>
          {MEETING_ROOM.FACILITES}
        </Text>
        <RoomFacilityContainer details={details} />
        {events.length > 0 ? (
          <>
            <Text style={styles.mediumTitle}>{MEETING_ROOM.TODAY_MEETING}</Text>

            <EventCalender events={events} />
          </>
        ) : (
          <View style={styles.wrapper}>
            <Text style={styles.fallBacktext}>{NO_MEETING}</Text>
          </View>
        )}
      </ScrollView>

      <Button buttonDetails={BUTTONS.bookRoomBtn} onPress={onBookHandler} />
    </LinearGradientContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
  wrapper: {
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    marginVertical: 20,
    borderRadius: 10,
  },
  fallBacktext: {
    width: '50%',
    color: COLORS.primaryDark,
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    justifyContent: 'center',
  },

  imgWrapper: {
    position: 'relative',
  },

  header: {
    height: 70,
    backgroundColor: COLORS.transparent,
    padding: 10,
  },

  roomImg: {
    width: '100%',
    height: 240,
    borderRadius: 5,
  },
  title: {
    fontSize: 23,
    fontWeight: '900',
    color: COLORS.primaryDark,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  mediumTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.primaryLight,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 20,
    fontWeight: '400',
    color: COLORS.primaryDark,
    alignSelf: 'flex-start',
  },
});
