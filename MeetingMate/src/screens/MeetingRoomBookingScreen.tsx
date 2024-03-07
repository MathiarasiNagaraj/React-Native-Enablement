import React from 'react';
import {StyleSheet} from 'react-native';
import {ROOM_BOOKING_FORM} from '../form/formConfig';
import {Form} from '../containers/FormContainer';
import {addToAndroidCal} from '../utils/calender';
import {LinearGradientContainer} from '../containers/LinearGradientContainer';
import {useRoute} from '@react-navigation/native';
import {addNewMeeting, COLLECTIONS} from '../services/firestore';
import ScreenHeader from '../components/ScreenHeader';
import { useToast } from "react-native-toast-notifications";
import { commonStyle } from '../styles/commonStyle';
import { TOAST_MESSAGES } from '../messages/appMessage';
import { ScrollView } from 'react-native-gesture-handler';
import { validateRoomBookingForm } from '../utils/validations.utils';
import { RoomBookingForm } from '../interfaces/formInterface';
import { useRecoilValue } from 'recoil';
import { User } from '../store/atom/userAtom';
export const MeetingRoomBookingScreen = () => {

  const toast = useToast();
  const route = useRoute();
  const {id} = route.params;
  const { user } = useRecoilValue(User);
  const onSubmitHandler = async (formdata: RoomBookingForm) => {
    const response = await validateRoomBookingForm(formdata);
    if (!response.valid) {
      toast.show(response.error, {
        type: "danger",
        placement: "bottom",
        duration: 4000,
        animationType: "slide-in",
        style: commonStyle.dangerToast
      })
    }
    else {

      await addNewMeeting(COLLECTIONS.Meetings, formdata);

      toast.show(TOAST_MESSAGES.MEETING_BOOKING, {
        type: "success",
        placement: "bottom",
        duration: 2000,
        animationType: "slide-in",
        style: commonStyle.successToast
      })

      addToAndroidCal(
        formdata.title,
        formdata.start,
        formdata.end,
        formdata.roomName,
        undefined
      );
    }
  };


  return (
    <LinearGradientContainer>
      <ScreenHeader title={'Room Booking'} />
      <ScrollView contentContainerStyle={styles.container}>
        <Form formDetails={ROOM_BOOKING_FORM(id,user.id)} onSubmit={onSubmitHandler} />
      </ScrollView>
    </LinearGradientContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
  },
});
