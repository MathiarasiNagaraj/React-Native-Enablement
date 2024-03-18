import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NO_UPCOMMING_MEETING, UPCOMMING_MEETING } from '../messages/appMessage'
import RoomFacilityContainer from './RoomFacilityContainer'
import { COLORS } from '../utils/colors'

export default function RoomDetailsContainer({room,roomMeetings,flag}) {
  return (
    <View style={styles.wrapper}>
    <Text style={styles.title}>{room.name}</Text>
    <RoomFacilityContainer details={room} />
    <Text style={styles.text}>{UPCOMMING_MEETING}</Text>

    {flag ? (
      roomMeetings
    ) : (
      <View style={styles.fallback}>
        <Text style={styles.fallBackText}>{NO_UPCOMMING_MEETING}</Text>
      </View>
    )}
  </View>
  )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        padding: 20,
        margin: 20,
    },
    text: {
        color: COLORS.primaryDark,
        fontSize: 20,
        fontWeight: '600',
        marginVertical: 20,
    },
    title: {
        color: COLORS.primaryDark,
        fontSize: 30,
        margin: 10,
        fontWeight: '600',
      },
    fallBackText: {
        fontSize: 20,
        color: COLORS.primaryDark,
        fontWeight: '600',
      },
      fallback: {
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        width: '90%',
        alignSelf: 'center',
      },
})