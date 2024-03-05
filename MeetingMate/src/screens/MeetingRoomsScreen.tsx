import React, {  } from 'react'
import { LinearGradientContainer } from '../containers/LinearGradientContainer'

import ScreenHeader from '../components/ScreenHeader';
import { SCREEN_NAMES } from '../constants/appConstant';
import { useRecoilState } from 'recoil';
import { Meeting } from '../store/atom/meetingAtom';
import { Room } from '../store/atom/roomAtom';
import { MeetingRooms } from '../containers/MeetingRoomsContainer';
export const MeetingRoomsScreen = () => {

  const [meetings, setMeetings] = useRecoilState(Meeting);
  const [rooms, setRooms] = useRecoilState(Room);



  return (
      <LinearGradientContainer>
      <ScreenHeader title={SCREEN_NAMES.MEETING_ROOMS} />

      <MeetingRooms
        rooms={rooms}
        isHorizontal={false}
        style={'cardFullContainer'}
      />

   
    </LinearGradientContainer>
  )
}

