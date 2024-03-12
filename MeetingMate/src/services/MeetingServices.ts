import firestore from '@react-native-firebase/firestore';
import { COLLECTIONS } from '../constants/appConstant';
import {Meetings, Rooms, User} from '../interfaces/commonInterface';


/**
 * @description Function for adding new meeting
 * @param collection Collection name
 * @param data meeting data need to added
 */
export const addNewMeeting = async (collection: string, data: Meetings) => {
  try {
    await firestore()
      .collection(collection)
      .doc()
      .set(data)
      .catch(err => console.log(err));
  } catch (error) {
   throw(error);
  }
};

/**
 * @description function for updating meeting room availablity status
 * @param id room Id
 * @param status availablity status
 */
export const updateRoomStatus = async (id: string, status:boolean) => {
  try {
    await firestore()
      .collection(COLLECTIONS.Rooms)
      .doc(id)
      .set({availablity: status});
  } catch (error) {
throw(error)
  }
};
/**
 * @description Function for reading all the upcoming meeting by user id
 * @param userId organizer id
 * @returns list of all meeting for user id
 */
export const readUpcomingMeetingsByOrganizerId = async (
  userId: string,
): Promise<Meetings[]> => {
  try {

    const organizerSnapshot = await firestore()
    .collection(COLLECTIONS.Meetings)
    .where('organizerId', '==', userId)
    .get();


    const documents: Meetings[] = [];
    const today = new Date().getDate();
    organizerSnapshot.forEach(doc => {
      const data = doc.data();
if( today==data.start.toDate().getDate())
        documents.push({
          id: doc.id,
          start: data.start.toDate(),
          end: data.end.toDate(),
          roomId: data.roomId,
          organizerId: data.organizerId,
          title: data.title,
          membersIdList: data.membersIdList,
          showMeetingTitle: data.showMeetingTitle
        });
    
    });

    return documents;
  } catch (error) {

    throw(error)
  }
};
/**
 * @description Function for reading all meetings
 * @returns list of all meeting current day
 */
export const readAllMeetings = async (): Promise<Meetings[]> => {
  try {
    const snapshot = await firestore().collection(COLLECTIONS.Meetings).get();
    const documents : Meetings[]=[];
    const now = new Date();
    snapshot.forEach(doc => {
      documents.push({
        id: doc.id,
        start: doc.data().start.toDate(),
        end: doc.data().end.toDate(),
        roomId: doc.data().roomId,
        organizerId: doc.data().organizerId,
        title: doc.data().title,
        membersIdList: doc.data().membersIdList,
        showMeetingTitle: doc.data().membersIdList
      });
    });
    return documents;
  } catch (error) {
    throw(error)
  }
};
/**
 * @description Read all rooms by branch
 * @param branch branch name
 * @returns list of rooms for particular branch
 */
export const readAllRoomsByBranch = async (branch: string): Promise<Rooms[]> => {
  try {
    const snapshot = await firestore()
      .collection(COLLECTIONS.Rooms)
      .where('branch', '==', branch)
      .get();

    const documents: Rooms[] = [];
    snapshot.forEach(doc => {

      return documents.push({
        id: doc.id,
        name: doc.data().name,
        maxLimit: doc.data().maxLimit,
        monitorAvailability: doc.data().monitorAvailability,
        boardAvailability: doc.data().boardAvailability,
        branch: doc.data().branch,
        location: doc.data().location,
        availability: doc.data().availability,
        roomImg: doc.data().roomImg,
        wifiName:doc.data().wifiName
      });
    });

    return documents;
  } catch (error) {
    throw(error)
  }
};

export const readAllPreviousMeetingByUser = async (userId: string) => {
  try {
    const snapshot = await firestore()
      .collection(COLLECTIONS.Meetings)
      .where('organizerId', '==', userId)
      .get();
    const currentDate = new Date();
    const documents: Meetings[] = [];
    snapshot.forEach(doc => {
   
      const data = doc.data();
      if (data.end < currentDate && data.end.toDate().getDate()===currentDate.getDate()) {
        return documents.push({
          id: doc.id,
          start: data.start.toDate(),
          end: data.end.toDate(),
          roomId: data.roomId,
          organizerId: data.organizerId,
          title: data.title,
          membersIdList: data.membersIdList,
          showMeetingTitle: data.showMeetingTitle
        });
      }
    });

    return documents;
  } catch (error) {
    throw(error)
  }
};

export const readAllUsers = async (): Promise<User[]> => {
  try {
    const snapshot = await firestore().collection(COLLECTIONS.Users).get();
    const documents: User[] = [];
    snapshot.forEach(doc => {
      documents.push({
        id: doc.id,
        ...doc.data(),
        name: doc.data().name,
        email: doc.data().email,
        password: doc.data().password,
      });
    });

    return documents;
  } catch (error) {
   throw(error)
  }
};

/**
 * @description Function for reading meeting details by room id
 * @param roomId room id
 * @returns meetings for particular room id for current day
 */
export const readMeetingbyRoomId = async (roomId: string):Promise<Meetings[]> => {
  try {
    const querySnapshot = await firestore()
      .collection(COLLECTIONS.Meetings)
      .where('roomId', '==', roomId)
      .get();
    const documents: Meetings[] = [];
    const today = new Date().getDate();
    querySnapshot.forEach(doc => {
      const data = doc.data();
      if (today == data.start.toDate().getDate()) {
        documents.push({
          id: doc.id,
          ...doc.data(),
          start: doc.data().start.toDate(),
          end: doc.data().end.toDate(),
          roomId: doc.data().roomId,
          organizerId: doc.data().organizerId,
          title: doc.data().title,
          membersIdList: doc.data().membersIdList,
          showMeetingTitle: doc.data().showMeetingTitle,
        });
      }
    });

    return documents;
  } catch (error) {
    throw(error)
  }
};
/**
 * @description Function for editing document with id ,updated data
 * @param collection Collection Name
 * @param id  document Id
 * @param updatedData data need to be updated
 */
export const editDataById = async (
  collection: string,
  id: string,
  updatedData: any,
) => {
  try {
    const snapshot = firestore().collection(collection).doc(id);
    await snapshot.update(updatedData);
  } catch (error) {
    throw( error);
  }
};
/**
 * @description Function for deleting document with id
 * @param collection Collection Name
 * @param id  document id
 */
export const deleteDataById = async (collection: string, id: string) => {
  try {
    const snapshot = firestore().collection(collection).doc(id);
    await snapshot.delete();
  } catch (error) {
    throw(error);
  }
};

