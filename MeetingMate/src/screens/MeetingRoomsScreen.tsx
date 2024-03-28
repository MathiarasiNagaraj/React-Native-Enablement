import React from 'react';
import {LinearGradientContainer} from '../containers/LinearGradientContainer';
import ScreenHeader from '../components/ScreenHeader';
import {SCREEN_NAMES} from '../constants/appConstant';
import {MeetingRooms} from '../containers/MeetingRoomsContainer';

export const MeetingRoomsScreen = () => {
  return (
    <LinearGradientContainer>
      <ScreenHeader
        title={SCREEN_NAMES.MEETING_ROOMS}
        style={'wrapper'}
        iconStyle={'icon'}
      />
      
      <MeetingRooms isHorizontal={false} style={'cardFullContainer'} />
    </LinearGradientContainer>
  );
};
