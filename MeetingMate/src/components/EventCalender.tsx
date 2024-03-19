import React from 'react'
import {Calendar} from 'react-native-big-calendar';
import { COLORS } from '../utils/colors';

/**
 * 
 * @param events Event details
 * @returns 
 */
const EventCalender = ({events}) => {
  return (
    <Calendar
    swipeEnabled={false}
    ampm={true}
    showVerticalScrollIndicator={false}
    bodyContainerStyle={{
      paddingHorizontal: 5,
      marginBottom: 100,
      backgroundColor: COLORS.whiteSmoke,
    }}
    events={events}
    headerContainerStyle={{display: 'none'}}
    height={800}
    scrollOffsetMinutes={1200}
    mode="day"
    hourStyle={{color: COLORS.primaryDark}}
    dayHeaderStyle={{display: 'none'}}
    eventCellStyle={{backgroundColor: COLORS.primaryLight}}
    calendarCellTextStyle={{color: COLORS.primaryDark}}
    weekDayHeaderHighlightColor={COLORS.primaryDark}
  />
  )
}

export default EventCalender