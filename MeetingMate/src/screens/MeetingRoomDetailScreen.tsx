import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {LinearGradientContainer} from '../containers/LinearGradientContainer';
import {useRoute, useNavigation} from '@react-navigation/native';
import Button from '../components/Button';
import {COLORS} from '../utils/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenHeader from '../components/ScreenHeader';
import {Calendar} from 'react-native-big-calendar';
import {readMeetingbyRoomId} from '../services/firestore';
import { MEETING_ROOM, NO_MEETING } from '../messages/appMessage';
import { BUTTONS, SCREEN_NAMES } from '../constants/appConstant';
import { StackNavigationProp } from '@react-navigation/stack';

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
   const id=details.id
    navigation.navigate(SCREEN_NAMES.ROOM_BOOKING,{id});
  };

  return (
    <LinearGradientContainer>
     

      <ScreenHeader title={'Meeting Room'} />
      <ScrollView contentContainerStyle={styles.container}
         showsHorizontalScrollIndicator={false}
         showsVerticalScrollIndicator={false}
      >
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
              size={23}
              style={styles.box}
              color={COLORS.primaryDark}
            />
            <Text style={styles.iconText}>{details.maxLimit}</Text>
          </View>
          {details.monitorAvailablity && (
            <View style={{alignItems: 'center'}}>
              <MaterialCommunityIcons
                name="monitor"
                size={23}
                style={styles.box}
                color={COLORS.primaryDark}
              />
              <Text style={styles.iconText}>{MEETING_ROOM.MONITOR }</Text>
            </View>
          )}
          {details.boardAvailablity && (
            <View style={{alignItems: 'center'}}>
              <MaterialCommunityIcons
                name="human-male-board"
                size={23}
                style={styles.box}
                color={COLORS.primaryDark}
              />
              <Text style={styles.iconText}>{MEETING_ROOM.BOARD }</Text>
            </View>
          )}

          <View style={{alignItems: 'center'}}>
            <MaterialCommunityIcons
              name="wifi"
              size={20}
              style={styles.box}
              color={COLORS.primaryDark}
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
            bodyContainerStyle={{ paddingHorizontal: 5, marginBottom: 100,backgroundColor:COLORS.whiteSmoke }}
            events={events}
            headerContainerStyle={{ display: 'none' }}
            height={800}
            scrollOffsetMinutes={1200}
            mode="day"
            hourStyle={{ color: COLORS.primaryDark}}
                dayHeaderStyle={{ display: 'none' }}
                eventCellStyle={{ backgroundColor: COLORS.primaryLight }}
            
                calendarCellTextStyle={{color:COLORS.primaryDark}}
            weekDayHeaderHighlightColor={COLORS.primaryDark}
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
  wrapper: {
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    marginVertical:20,
    borderRadius:10
  },
  fallBacktext: {
    width:'50%',
    color: COLORS.primaryDark,
    fontSize: 18,
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
    backgroundColor:COLORS.white,
    padding: 5,
    paddingLeft: 10,
    borderRadius: 5,
    width: 100,
    fontWeight: '700',
    alignItems: 'center',
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
    backgroundColor: COLORS.secondaryLight,
  },
  iconText: {
    color: COLORS.primaryDark,
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
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 100,
  },

  btnContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '100%',
  },
});
