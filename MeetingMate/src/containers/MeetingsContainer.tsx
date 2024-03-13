import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenHeader from '../components/ScreenHeader'
import { TODAY_MEETING } from '../messages/appMessage'
import RoomFacilityContainer from './RoomFacilityContainer'
import { COLORS } from '../utils/colors'

export default function MeetingsContainer({room,roomMeetings}) {
  return (
    <>
          <ScreenHeader style={'transparentWrapper'} iconStyle={'darkIcon'} />
          <View style={styles.container}>
            <Image source={{uri: room.roomImg}} style={styles.img} />
            <View >
              <Text style={styles.roomtitle}>{room.name}</Text>
              <RoomFacilityContainer details={room} />
              <Text style={styles.text}>{TODAY_MEETING}</Text>
              {roomMeetings}
            </View>
          </View>
        </>
  )
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
        height: '20%',
        alignSelf: 'center',
        borderRadius: 5,
      },
})