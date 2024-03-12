import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import IconText from '../components/IconText'
import { COLORS } from '../utils/colors'
import { MEETING_ROOM } from '../messages/appMessage'

export default function RoomFacilityContainer({details}) {
  return (
    <View style={styles.innerWrapper}>
    <IconText
      containerStyle={'columnContainer'}
      textStyle={'text'}
      text={details.maxLimit}
      iconName={'chair-rolling'}
      iconColor={COLORS.primaryDark}
      iconSize={24}
      iconStyle={'roundIcon'}
    />
    {details.monitorAvailability && (
      <IconText
        containerStyle={'columnContainer'}
        textStyle={'text'}
        text={MEETING_ROOM.MONITOR}
        iconName={'monitor'}
        iconColor={COLORS.primaryDark}
        iconSize={24}
        iconStyle={'roundIcon'}
      />
    )}
    {details.boardAvailability && (
      <IconText
        containerStyle={'columnContainer'}
        textStyle={'text'}
        text={MEETING_ROOM.BOARD}
        iconName={'human-male-board'}
        iconColor={COLORS.primaryDark}
        iconSize={24}
        iconStyle={'roundIcon'}
      />
    )}

    <IconText
      containerStyle={'columnContainer'}
      textStyle={'text'}
      text={details.wifiName}
      iconName={'wifi'}
      iconColor={COLORS.primaryDark}
      iconSize={24}
      iconStyle={'roundIcon'}
    />
  </View>
  )
}
const styles = StyleSheet.create({
    innerWrapper: {
        height: 80,
        width: '100%',
        flexDirection: 'row',
        paddingVertical: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
      },
})