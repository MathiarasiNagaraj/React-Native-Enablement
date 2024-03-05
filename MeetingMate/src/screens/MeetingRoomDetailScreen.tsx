import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {LinearGradientContainer} from '../containers/LinearGradientContainer';
import {useRoute, useNavigation} from '@react-navigation/native';
import Button from '../components/Button';
import {COLORS} from '../utils/colors';
import moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenHeader from '../components/ScreenHeader';
import {Calendar} from 'react-native-big-calendar';
import {readMeetingbyRoomId} from '../services/firestore';
import { MEETING_ROOM, NO_MEETING } from '../messages/appMessage';
import { BUTTONS, SCREEN_NAMES } from '../constants/appConstant';
import { commonStyle } from '../styles/commonStyle';

export const MeetingRoomDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

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
   const id=details.id
    navigation.navigate(SCREEN_NAMES.ROOM_BOOKING,{id});
  };

  return (
    <LinearGradientContainer>
      <ScreenHeader title={'Meeting Room'} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imgWrapper}>

        <Image source={{uri: details.roomImg}} style={styles.roomImg} />
        <View style={[styles.cardBox]}>
          <View
            style={[
              styles.round,
              {
                backgroundColor: details.availability
                  ? COLORS.green
                  : COLORS.red,
              },
            ]}
          />
          <Text
            style={[
              styles.cardBoldText,
              {color: details.availability ? COLORS.green : COLORS.red},
            ]}>
            {details.availability ? '  Available' : '  Busy'}
          </Text>
        </View>

        </View>

        <Text style={styles.title}>{details.name}</Text>
        <View style={styles.locationBox}>
          <MaterialCommunityIcons
            name="map-marker"
            size={23}
            color={COLORS.black}
          />
          <Text style={styles.text}>
            {details.location},{details.branch}
          </Text>
        </View>

        <Text style={[styles.mediumTitle, {alignSelf: 'flex-start'}]}>
  {MEETING_ROOM.FACILITES}
        </Text>
        <View style={styles.innerWrapper}>
          <View style={{alignItems: 'center'}}>
            <MaterialCommunityIcons
              name="chair-rolling"
              size={20}
              style={styles.box}
              color={COLORS.white}
            />
            <Text style={styles.iconText}>{details.maxLimit}</Text>
          </View>
          {details.monitorAvailablity && (
            <View style={{alignItems: 'center'}}>
              <MaterialCommunityIcons
                name="monitor"
                size={20}
                style={styles.box}
                color={COLORS.white}
              />
              <Text style={styles.iconText}>{MEETING_ROOM.MONITOR }</Text>
            </View>
          )}
          {details.boardAvailablity && (
            <View style={{alignItems: 'center'}}>
              <MaterialCommunityIcons
                name="human-male-board"
                size={20}
                style={styles.box}
                color={COLORS.white}
              />
              <Text style={styles.iconText}>{MEETING_ROOM.BOARD }</Text>
            </View>
          )}

          <View style={{alignItems: 'center'}}>
            <MaterialCommunityIcons
              name="wifi"
              size={20}
              style={styles.box}
              color={COLORS.white}
            />
            <Text style={styles.iconText}>{details.wifiName}</Text>
          </View>
        </View>

    
        {
          events.length > 0 ?
            <>
              <Text style={styles.mediumTitle}>{ MEETING_ROOM.TODAY_MEETING}</Text>
         
          <Calendar
            swipeEnabled={false}
            ampm={true}
            showVerticalScrollIndicator={false}
            bodyContainerStyle={{ paddingHorizontal: 5, marginBottom: 100 }}
            events={events}
            headerContainerStyle={{ display: 'none' }}
            height={800}
            scrollOffsetMinutes={1200}
            mode="day"
            hourStyle={{ color: COLORS.white }}
            dayHeaderStyle={{ display: 'none' }}
            weekDayHeaderHighlightColor={'white'}
            /> 
               </>:
            <View style={styles.wrapper}>
            <Text style={styles.fallBacktext}>{ NO_MEETING}</Text>
            </View>
        }

      </ScrollView>

      <View style={styles.btnContainer}>
        <Button
          buttonDetails={BUTTONS.bookRoomBtn}
          onPress={onBookHandler}
        />
      </View>
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
  fallBacktext: {
    width:'50%',
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    justifyContent:'center'
    
  },
  cardBoldText: {
    fontSize: 16,
    fontWeight: '800',
  },
  imgWrapper: {
    position:'relative'
  },
  round: {
    height: 10,
    width: 10,
    borderRadius: 20,
  },
  cardBox: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    flexDirection: 'row',
    backgroundColor: '#ffffffa6',
    padding: 5,
    paddingLeft: 10,
    borderRadius: 5,
    width: 100,
    fontWeight: '700',
    alignItems: 'center',
  },
  wrapper: {
    backgroundColor: COLORS.transparent,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    borderRadius:10
  },
  header: {
    height: 70,
    backgroundColor: COLORS.transparent,
    padding: 10,
  },
  icon: {
    height: 50,
    width: 50,

    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightTransparent,
  },
  iconText: {
    color: COLORS.black,
    fontSize: 13,

  },
  innerWrapper: {
    height: 80,
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationBox: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  roomImg: {
    width: '100%',
    height: 240,
    borderRadius: 5,
  },
  title: {
    fontSize: 21,
    fontWeight: '500',
    color: COLORS.primaryDark,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  mediumTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.primaryDark,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 20,
    fontWeight: '400',
    color: COLORS.black,
    alignSelf: 'flex-start',
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.transparent,
    padding: 15,
    borderRadius: 100,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
  },
  modalContent: {
    height: '80%',
    width: '90%',
    backgroundColor: COLORS.transparent,
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '100%',
  },
});
