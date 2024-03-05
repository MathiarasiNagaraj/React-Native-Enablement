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

    
}
export const INTERVAL=60000
export const GEO_LOCATION = [
   {
    latitude:12.9908,
    longitude:80.2469,
    location:'Chennai'
  },
 {
    latitude:12.9716,
   longitude:77.5946,
    location:'Bangalore'
  },
{
    latitude:17.4065,
  longitude:78.4772,
    location:'Hyderabad'
  }
]

export const BUTTONS = {
    loginBtn: {
        name: 'Login',
        style: 'roundedPrimaryBtn',
        textStyle: 'whiteBold',
},
  bookRoomFormBtn: {
    name: 'Book Now',
    style: 'roundedPrimaryBtn',
    textStyle: 'whiteBold',
  },
  bookRoomBtn: {
    name: 'Book a Slot',
    style: 'primaryBtn',
    textStyle: 'whiteBold',
  },
  moreInfo: {
    name: 'More Info',
    style: 'secondaryBtn',
    textStyle: 'whiteBold',
  },
  scanNow: {
    name: 'Scan Now',
    style: 'roundedPrimaryBtn',
    textStyle: 'whiteBold',
  },
  roundBtn: {
    name: '+',
    style: 'roundPrimaryBtn',
    textStyle: 'whiteBold',
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
        style: 'transparentBtn',
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
    }
};

export const BRANCHES = [
    {label:'Bangalore',value:"Bangalore"},
    { label: 'Chennai', value: "Chennai" },
    {label:'Hyderabad',value:"Hyderabad"}
]