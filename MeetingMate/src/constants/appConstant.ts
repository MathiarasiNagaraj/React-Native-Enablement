export const SCREEN_NAMES = {
  MY_ACCOUNT: 'MyAccount',
  ROOM_BOOKING: 'Room Booking',
  HOME: 'Home',
  QR_SCAN: 'Scan and book',
  SEARCH: 'Search Rooms',
  LOGIN: 'Login',
  MEETING_ROOM: 'Meeting Room',
  MEETING_ROOMS: 'Meeting Rooms',
  MY_BOOKING: 'MyBooking',
  MEETING_ROOM_LIST: 'MeetingRoomList',
  ROOM_QR_BOOKING: 'RoomBooking',
};



export const MEETING_INVITATION_MESSAGE = (
  title: string,
  startHour: string,
  startMinutes: string,
  roomName: string,
  organizerName: string,
) =>
  `${title} is going to happen today on ${
    startHour + ':' + startMinutes
  } in ${roomName}  organized by ${organizerName}`;

export const ASYNC_STORE_KEY = {
  USER: 'user',
};

export const FILTERS = [
  {name: 'Available Now', filterName: 'availability'},
  {name: 'Monitor Availablity', filterName: 'monitorAvailability'},
  {name: 'Max Limit > 20', filterName: 'maxLimits'},
  {name: 'Board Availablity', filterName: 'boardAvailability'},
];

export const INTERVAL = 60000;
export const GEO_LOCATION = [
  {
    latitude: 12.9908,
    longitude: 80.2469,
    location: 'Chennai',
  },
  {
    latitude: 12.9716,
    longitude: 77.5946,
    location: 'Bangalore',
  },
  {
    latitude: 17.4065,
    longitude: 78.4772,
    location: 'Hyderabad',
  },
];

export const BUTTONS = {
  loginBtn: {
    name: 'Login',
    style: 'roundedPrimaryBtn',
    textStyle: 'whiteBoldText',
  },
  bookRoomFormBtn: {
    name: 'Book Now',
    style: 'roundedPrimaryBtn',
    textStyle: 'whiteBoldText',
  },
  bookRoomBtn: {
    name: 'Book a Slot',
    style: 'primaryBtn',
    textStyle: 'whiteBoldText',
  },
  moreInfo: {
    name: 'More Info',
    style: 'secondaryBtn',
    textStyle: 'whiteBoldText',
  },
  scanNow: {
    name: 'Scan Now',
    style: 'roundedPrimaryBtn',
    textStyle: 'whiteBoldText',
  },
  roundBtn: {
    name: '+',
    style: 'roundPrimaryBtn',
    textStyle: 'whiteBoldText',
  },
  editBtn: {
    name: 'Edit Booking',
    style: 'tertiaryBtn',
    textStyle: 'whiteText',
  },
  deleteBtn: {
    name: 'Delete Booking',
    style: 'dangerBtn',
    textStyle: 'whiteText',
  },
  cancelBtn: {
    name: 'Cancel Booking',
    style: 'cancelBtn',
    textStyle: 'whiteText',
  },
  updateBtn: {
    name: 'Update Meeting',
    style: 'secondaryBtn',
    textStyle: 'whiteText',
  },
  logoutBtn: {
    name: 'Logout',
    style: 'tertiaryBtn',
    textStyle: 'whiteText',
  },
  editProfileBtn: {
    name: 'Edit Profile',
    style: 'tertiaryBtn',
    textStyle: 'whiteText',
  },
  updateProfileBtn: {
    name: 'Update Profile',
    style: 'secondaryBtn',
    textStyle: 'whiteText',
  },
};

export const BRANCHES = [
  {label: 'Bangalore', value: 'Bangalore'},
  {label: 'Chennai', value: 'Chennai'},
  {label: 'Hyderabad', value: 'Hyderabad'},
];
