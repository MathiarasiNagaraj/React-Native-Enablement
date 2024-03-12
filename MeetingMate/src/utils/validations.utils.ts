import {Meetings} from '../interfaces/commonInterface';
import {
  AccountEditForm,
  LoginForm,
  MeetingEditForm,
  RoomBookingForm,
} from '../interfaces/formInterface';
import {
  ACCOUNT_EDIT_FORM,
  LOGIN_FORM,
  ROOM_BOOKING_FORM,
} from '../messages/validationMessage';
import {readAllMeetings, readAllUsers} from '../services/MeetingServices';

/**
 * @description Validation function for validating Login form,
 * Checks for null value
 * validate login
 * @param formData  form data containing form details of Login form as object
 *  @returns boolean value of validity and error message
 */
export const validateLoginForm = async (formData: LoginForm) => {
  // Check for null or empty values
  if (!formData.email || !formData.password) {
    return {valid: false, error: LOGIN_FORM.emptyField};
  }
  const users = await readAllUsers();
  //Checking user existenance
  const isExistingUser = users.find(user => user.email === formData.email);
  if (isExistingUser) {
    //Checking password
    if (isExistingUser.password === formData.password)
      return {valid: users, data: isExistingUser};
    else return {valid: false, error: LOGIN_FORM.invalidPassword};
  }
  return {valid: false, error: LOGIN_FORM.userNotFound};
};

const slotValidation = async (start: Date, end: Date, roomId: string) => {
  try {
    const allMeetings: Meetings[] = await readAllMeetings();

    let count = 0;

    allMeetings.forEach((meeting, index) => {
      if (meeting.start === start) count = 1;
      if (meeting.start < start && meeting.end > start) count = 1;
      if (meeting.start > start && meeting.end < end) count = 1;
    });

    const conflictingMeetings = allMeetings.filter(
      meeting =>
        meeting.roomId === roomId &&
        ((start >= meeting.start && start < meeting.end) ||
          (end > meeting.start && end <= meeting.end) ||
          (start <= meeting.start && end >= meeting.end)),
    );

    return conflictingMeetings;
  } catch (error) {
    console.error('Error validating room booking form:', error);
    return null;
  }
};

/**
 * @description Validation function for validating meeting  room booking form,
 * Checks for null value,
 * Meeting Timing
 * Validate slots
 * @param formData form data containing form details of room booking form as object
 *  @returns boolean value of validity and error message
 */
export const validateRoomBookingForm = async (formData: RoomBookingForm) => {
  const now = new Date();
  // Check for null or empty values
  if (
    !formData.roomId ||
    !formData.title ||
    !formData.organizerId ||
    !formData.membersIdList ||
    !formData.start ||
    !formData.end
  ) {
    return {valid: false, error: ROOM_BOOKING_FORM.emptyField};
  }

  // Check for empty strings in membersIdList
  if (formData.membersIdList.some(memberId => !memberId)) {
    return {valid: false, error: ROOM_BOOKING_FORM.emptyMembers};
  }

  if (formData.start < now) {
    return {valid: false, error: ROOM_BOOKING_FORM.invalidStartTime};
  }
  // Check if start time is before end time
  if (formData.start >= formData.end) {
    return {valid: false, error: ROOM_BOOKING_FORM.invalidTime};
  }
  const conflictingMeetings = await slotValidation(
    formData.start,
    formData.end,
    formData.roomId,
  );
  if (conflictingMeetings && conflictingMeetings.length > 0) {
    return {valid: false, error: ROOM_BOOKING_FORM.meetingConflict};
  } else {
    return {valid: true, error: ROOM_BOOKING_FORM.error};
  }
};

/**
 * @description Validation function for validating meeting edit  form,
 * Checks for null value,
 * Meeting Timing
 * Validate slots
 * @param formData form data containing form details of  meeting edit as object
 * @returns boolean value of validity and error message
 */
export const validateEditRoomBookingForm = async (
  formData: MeetingEditForm,
) => {
  // Check for null or empty values
  if (
    !formData.roomId ||
    !formData.title ||
    !formData.membersIdList ||
    !formData.start ||
    !formData.end
  ) {
    return {valid: false, error: ROOM_BOOKING_FORM.emptyField};
  }

  // Check for empty strings in membersIdList
  if (formData.membersIdList.some(memberId => !memberId)) {
    return {valid: false, error: ROOM_BOOKING_FORM.emptyMembers};
  }
  // Check if start time is before end time
  if (formData.start >= formData.end) {
    return {valid: false, error: ROOM_BOOKING_FORM.invalidTime};
  }

  const conflictingMeetings = await slotValidation(
    formData.start,
    formData.end,
    formData.roomId,
  );
  if (conflictingMeetings && conflictingMeetings.length > 0) {
    return {valid: false, error: ROOM_BOOKING_FORM.meetingConflict};
  } else {
    return {valid: true, error: null};
  }
};
/**
 * @description Validation function for validating account edit  form,
 * Checks for null value,
 * Gmail validation
 * old password new password equals
 * @param formData form data containing form details of  account edit as object
 * @returns boolean value of validity and error message
 */
export const validateAccountEditForm = (
  formData: AccountEditForm,
  oldPassword: string,
) => {
  // Check for null or empty values
  if (!formData.email || !formData.password || formData.location) {
    return {valid: false, error: ACCOUNT_EDIT_FORM.emptyField};
  }
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  const flag = gmailRegex.test(formData.email);

  if (!flag) {
    return {valid: false, error: ACCOUNT_EDIT_FORM.invalidGmail};
  }

  if (formData.password === oldPassword) {
    return {valid: false, error: ACCOUNT_EDIT_FORM.samePassword};
  }
};
