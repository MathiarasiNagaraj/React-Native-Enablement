import {BUTTONS} from '../constants/appConstant';

//Login Form object
export const LOGIN_FORM = {
  style: 'loginForm',
  isHavingShortFields: false,
  fields: [
    {
      name: 'email',
      placeholder: 'Enter your email Id',
      type: 'email-address',
      style: 'whiteBox',
      width: 'full',
    },
    {
      name: 'password',
      placeholder: 'Enter your Password',
      type: 'default',
      style: 'whiteBox',
      isPassword: true,
      width: 'full',
    },
  ],
  buttons: BUTTONS.loginBtn,
};

// Meeting Room  Form object
export const MEETING_ROOM_EDIT_FORM = (
  roomId: string,
  title: string,
  start: Date,
  end: Date,
  meetingId: string,
  membersIdList: string[],
) => ({

  style: 'bookingFormEditStyle',
  isHavingShortFields: true,
  meetingId: meetingId,
  fields: [
    {
      name: 'roomId',
      placeholder: 'Select the Room',
      type: 'dropDown',
      style: 'dropdown',
      options: 'rooms',
      width: 'full',
      value: roomId,
    },
    {
      name: 'membersId',
      placeholder: 'Select the Members',
      type: 'dropDown',
      style: 'dropdown',
      isMultiSelect: true,
      options: 'users',
      width: 'full',
      value: membersIdList,
    },

    {
      name: 'title',
      placeholder: 'Enter Meeting Title',
      type: 'default',
      style: 'darkBox',
      width: 'full',
      value: title,
    },
    {
      name: 'start',
      placeholder: 'End Time',
      type: 'time',
      style: 'whiteTimeBox',
      width: 'half',
      value: start,
    },
    {
      name: 'end',
      placeholder: 'Start Time',
      type: 'time',
      style: 'whiteTimeBox',
      width: 'half',
      value: end,
    },
  ],
  buttons: BUTTONS.updateBtn,
});

// Profile Edit Form  object
export const PROFILE_EDIT_FORM = (
  email: string,
  password: string,
  location: string,
) => ({
  style: 'updateForm',
  isHavingShortFields: false,
  fields: [
    {
      name: 'email',
      placeholder: 'Enter your email Id',
      type: 'email-address',
      style: 'whiteBox',
      width: 'full',
      value: email,
    },
    {
      name: 'password',
      placeholder: 'Enter your Password',
      type: 'default',
      style: 'whiteBox',
      isPassword: true,
      width: 'full',
      value: password,
    },
    {
      label: 'Select Location',
      name: 'location',
      placeholder: 'Select Location',
      type: 'dropDown',
      style: 'dropDownUnderLine',
      width: 'full',
      value: location,
      isMultiSelect: false,
      options: 'location',
    },
  ],
  buttons: BUTTONS.updateProfileBtn,
});

// Room Booking Form object
export const ROOM_BOOKING_FORM = (roomId: string, organizerId: string) => ({
  style: 'bookingFormStyle',
  isHavingShortFields: true,
  fields: [
    {
      label: 'Meeting Room',
      name: 'roomId',
      placeholder: 'Select the Room',
      type: 'dropDown',
      style: 'dropdown',
      isMultiSelect: false,
      options: 'rooms',
      width: 'full',
      value: roomId,
    },
    ,
    {
      label: 'Meeting Title',
      name: 'title',
      placeholder: 'Enter Meeting Name',
      type: 'default',
      style: 'whiteBox',
      width: 'full',
    },
    {
      name: 'showMeetingTitle',
      placeholder: 'Show Meeting Name',
      type: 'checkBox',
      style: 'checkBox',
      width: 'full',
    },
    {
      label: 'Meeting Organizer',
      name: 'organizerId',
      placeholder: 'Select the Organizer',
      type: 'dropDown',
      style: 'dropdown',
      isMultiSelect:false,
      options: 'users',
      width: 'full',
      value: organizerId,
    },

    {
      label: 'Meeting Members',
      name: 'membersIdList',
      placeholder: 'Select the Members',
      type: 'dropDown',
      style: 'dropdown',
      isMultiSelect: true,
      options: 'users',
      width: 'full',

    },

    

    ,
    {
      label: 'Start Time',
      name: 'start',
      placeholder: 'Start Time',
      type: 'time',
      style: 'whiteTimeBox',
      width: 'half',
    },
    {
      label: 'End Time',
      name: 'end',
      placeholder: 'End Time',
      type: 'time',
      style: 'whiteTimeBox',
      width: 'half',
    },
  ],
  buttons: BUTTONS.bookRoomFormBtn,
});
