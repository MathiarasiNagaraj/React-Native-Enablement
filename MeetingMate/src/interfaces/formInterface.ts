export interface LoginForm {
  email: string;
  password: string;
}
export interface RoomBookingForm {
  roomName(title: string, start: Date, end: Date, roomName: any): unknown;
  roomId: string;
  title: string;
  isShowMeetingTitle: boolean;
  organizerId: string;
  membersIdList: [string];
  start: Date;
  end: Date;

}
export interface MeetingEditForm {
  roomId: string;
  title: string;
  start: Date;
  end: Date;
  id: string;
  meetingId: string;
  membersIdList: [string];
}
export interface AccountEditForm {
  email: string;
  password: string;
  location: string;
}
