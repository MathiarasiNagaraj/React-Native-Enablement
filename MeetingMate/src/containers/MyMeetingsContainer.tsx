import React, {useState} from 'react';
import {Alert, FlatList, Share, StyleSheet, View} from 'react-native';
import MyMeetingCard from '../components/MyMeetingCard';
import {COLORS} from '../utils/colors';
import ModalComponent from '../components/Modal';
import {Form} from './FormContainer';
import {MEETING_ROOM_EDIT_FORM} from '../form/formConfig';
import ConfirmBox from '../components/ConfirmBox';
import {
  deleteDataById,
  editDataById,
} from '../services/MeetingServices';
import {getNameById, getPropertyByIDFromCollection} from '../utils/commonUtils';
import {CONFIRM_DELETE, TOAST_MESSAGES} from '../messages/appMessage';
import {BUTTONS, COLLECTIONS, MEETING_INVITATION_MESSAGE} from '../constants/appConstant';
import {useToast} from 'react-native-toast-notifications';
import {commonStyle} from '../styles/commonStyle';
import {useRecoilState} from 'recoil';
import {Room} from '../store/atom/roomAtom';
import {Meeting} from '../store/atom/meetingAtom';
import {Meetings, Rooms, User} from '../interfaces/commonInterface';
import {MeetingEditForm} from '../interfaces/formInterface';
import {Members} from '../store/atom/membersAtom';
import {validateEditRoomBookingForm} from '../utils/validations.utils';
import List from '../components/List';

interface MyMeetingsContainerProps {
  style: string;
  isHorizontal: boolean;
}
export const MyMeetingsContainer: React.FC<MyMeetingsContainerProps> = ({
  style,
  isHorizontal,
}) => {
  const toast = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const [component, setComponent] = useState<React.ReactNode>();

  const [meetings, setMeetings] = useRecoilState<Meetings[]>(Meeting);
  const [rooms, setRooms] = useRecoilState<Rooms[]>(Room);
  const [members, setMembers] = useRecoilState<User[]>(Members);
  const onEditHandler = async (data: MeetingEditForm) => {
    const response = await validateEditRoomBookingForm(data);
    if (!response.valid) {
      toast.show(response.error, {
        type: 'danger',
        placement: 'bottom',
        duration: 4000,
        animationType: 'slide-in',
        style: commonStyle.dangerToast,
      });
    } else {
      const currentMeeting: Meetings = meetings?.find(
        (obj: Meetings) => obj.id === data.id,
      );

      await editDataById(COLLECTIONS.Meetings, data.id, data);

      const updatedData = {
        organizerId: currentMeeting.organizerId,
        ...data,
      };

      const index = meetings?.findIndex((obj: Meetings) => obj.id === data.id);
      if (index !== -1) {
        const updatedMeetings = [
          ...meetings.slice(0, index),
          updatedData,
          ...meetings.slice(index + 1),
        ];

        setMeetings(updatedMeetings);
      }
      setIsVisible(false);

      toast.show(TOAST_MESSAGES.MEETING_UPDATE, {
        type: 'success',
        placement: 'bottom',
        duration: 4000,
        animationType: 'zoom-in',
        style: commonStyle.successToast,
      });
    }
    // getRooms();
  };
  const onShareHandler = async (data: Meetings) => {
    const roomName = await getNameById(rooms, data.roomId);

    try {
      await Share.share({
        message: MEETING_INVITATION_MESSAGE(
          data.title,
          data.start.getHours().toString().padStart(2, '0'),
          data.start.getMinutes().toString().padStart(2, '0'),
          roomName,
          data.organizerId,
        ),
      });
    } catch (error) {
      throw error;
    }
  };
  const onMemberPressHandler = (data: Meetings) => {

    const memberList = data.membersIdList.map((id) => {
      const memberData = {
        name: getPropertyByIDFromCollection(members,id,'name'),
        imgUrl:  getPropertyByIDFromCollection(members,id,'imgUrl')
    };
    return memberData;
  })
setIsVisible(true)
    setComponent(<List data={memberList}/>)
  }
  //on Edit Click Handler
  const onEditClickHandler = (data: Meetings) => {
    const formComponent = (
      <Form
        formDetails={MEETING_ROOM_EDIT_FORM(
          data.roomId,
          data.title,
          data.start,
          data.end,
          data.id,
          data.membersIdList,
        )}
        onSubmit={onEditHandler}
      />
    );
    setIsVisible(true);
    setComponent(formComponent);
  };
  //confirm delete handler
  const onDeleteClickHandler = (id: string) => {
    const onConfirmDelete = () => {
      deleteDataById(COLLECTIONS.Meetings, id);

      const updatedMeetings = meetings.filter(meeting => meeting.id !== id);
      setMeetings(updatedMeetings);
      setIsVisible(false);
      toast.show(TOAST_MESSAGES.MEETING_DELETE, {
        type: 'success',
        placement: 'bottom',
        duration: 5000,
        animationType: 'zoom-in',
        style: commonStyle.successToast,
      });
    };
    const confirmComponent = (
      <ConfirmBox
        onCancelHandler={() => setIsVisible(false)}
        onAcceptHandler={onConfirmDelete}
        message={CONFIRM_DELETE.MESSAGE}
        title={CONFIRM_DELETE.TITLE}
        acceptBtnName={BUTTONS.deleteBtn}
      />
    );
    setIsVisible(true);
    setComponent(confirmComponent);
  };

  const updatedData = meetings?.map(meeting => {
    return {
      ...meeting,
      organizerId: getNameById(members, meeting.organizerId),
      roomName: getNameById(rooms, meeting.roomId),
    };
  });

  const myBookings = (
    <FlatList
      horizontal={isHorizontal}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      data={updatedData}
      contentContainerStyle={{paddingHorizontal: 30}}
      ItemSeparatorComponent={() => <View style={{width: 15}} />}
      renderItem={item => (
        <MyMeetingCard
          style={style}
          data={item.item}
          onShareHandler={onShareHandler}
          onDeleteClickHandler={onDeleteClickHandler}
          onEditClickHandler={onEditClickHandler}
          onMemberPressHandler={onMemberPressHandler}
        />
      )}
    />
  );
  return (
    <View style={styles.container}>
      <ModalComponent
        isVisible={isVisible}
        component={component}
        closeModal={() => setIsVisible(false)}
      />
      {myBookings}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {

  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 23,
    color: COLORS.primaryDark,
    fontWeight: '600',
  },
  text: {
    color: COLORS.white,
    fontSize: 15,
  },
  underLineText: {
    textDecorationLine: 'underline',
    color: COLORS.primaryDark,
    fontWeight: '500',
  },
});
