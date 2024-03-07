export interface Rooms {
  id: string;
  name: string;
  maxLimit: number;
  monitorAvailability: boolean;
  boardAvailability: boolean;
  branch: string;
  location: string;
  availability: boolean;
  roomImg: string;
}



export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface Meetings {
  id: string;
  roomId: string;
  start: Date;
  end: Date;
  organizerId: string;
  title: string;
  membersIdList: string[];
  showMeetingTitle: boolean;
}


