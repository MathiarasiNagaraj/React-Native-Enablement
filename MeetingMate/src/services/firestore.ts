import firestore from '@react-native-firebase/firestore';
import {Meetings, Room, User} from '../interfaces/commonInterface';

export const COLLECTIONS = {
  Meetings: 'Meetings',
  Users: 'Users',
  Rooms: 'Rooms',
  location: 'Locations',
};



export const addData = async (collection: string, data: any) => {
  try {
    await firestore()
      .collection(collection)
      .doc()
      .set(data)
      .catch(err => console.log(err));
  } catch (error) {
    return error;
  }
};

export const updateRoomStatus = async (id: string, status) => {
  // console.log(id,updatedObject,'in backend')
  try {
    await firestore()
      .collection(COLLECTIONS.Rooms)
      .doc(id)
      .set({availablity: status});
  } catch (err) {
    return err;
  }
};
export const readUpcomingMeetingsByOrganizerId = async (userId: string) :Promise<Meetings[]>=> {
  try {
    const snapshot = await firestore().collection(COLLECTIONS.Meetings).where("organizerId","==",userId).get();
    const documents: Meeting[] = [];
    const now = new Date();
    snapshot.forEach(doc => {
      const data = doc.data();

      if (now <= data.end.toDate()) {
 
        documents.push({
          ...data,
          id: doc.id,

          start: data.start.toDate(),
          end: data.end.toDate(),
        });
      }
    });

    return documents;
  } catch (error) {
    return error;
  }
};
export const readAllMeetings = async () :Promise<Meetings[]>=> {
  try {
    const snapshot = await firestore().collection(COLLECTIONS.Meetings).get();
    const documents= [];
    const now = new Date();
    snapshot.forEach(doc => {
        documents.push({
          id: doc.id,
          ...doc.data(),
          start: doc.data().start.toDate(),
          end:doc.data().end.toDate(),
        });
      
    });
console.log(documents)
    return documents;
  } catch (error) {
    return error;
  }
};
//Reading all Rooms by Branch
export const readAllRoomsByBranch = async (branch:string):Promise<Room[]> => {
  try {
    const snapshot = await firestore().collection(COLLECTIONS.Rooms).where("branch",'==',branch).get();

    const documents: Room[] = [];
    snapshot.forEach(doc => {
      return documents.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return documents;
  } catch (error) {
    return error;
  }
};

export const readAllPreviousMeetingByUser = async (userId:string) => {
  try {
    const snapshot = await firestore().collection(COLLECTIONS.Meetings).where("end","<",new Date()).get();

    const documents: Room[] = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      return documents.push({
        id: doc.id,
        ...doc.data(),

        start: data.start.toDate(),
        end: data.end.toDate(),
      });
    });

    return documents;
  } catch (error) {
    return error;
  }
}
export const readAllUsers = async ():Promise<User[]> => {
  try {
    const snapshot = await firestore().collection(COLLECTIONS.Users).get();
    const documents: User[] = [];
    snapshot.forEach(doc => {
      documents.push({
        id: doc.id,
        ...doc.data(),
        name: doc.data().name,
        email: doc.data().email,
        password: doc.data().password
      });
    });

    return documents;
  } catch (error) {
    return [];
  }
};

export const readDataById = async (collection: string, id: string) => {
  try {
    const snapshot = firestore().collection(collection).doc(id);
    const documents = await snapshot.get();

    const docId = documents.id;
    const data = documents.data();
    if (documents.exists)
      return {
        docId,
        ...data,
      };
    return null;
  } catch (error) {
    return error;
  }
};

export const readMeetingbyRoomId = async (roomId: string) => {
  try {
    const querySnapshot = await firestore()
      .collection(COLLECTIONS.Meetings)
      .where('roomId', '==', roomId)
      .get();
    const documents: {id: string}[] = [];

    querySnapshot.forEach(doc => {
      documents.push({
        id: doc.id,
        ...doc.data(),
        start: doc.data().start.toDate(),
        end: doc.data().end.toDate(),
      });
    });

    return documents;
  } catch (error) {
    return error;
  }
};

export const readMeetingbyUserId = async (userId: string) => {
  try {
    const querySnapshot = await firestore()
      .collection(COLLECTIONS.Meetings)
      .where('organizerId', '==', userId)
      .get();
    const documents: {id: string}[] = [];

    querySnapshot.forEach(doc => {
      documents.push({id: doc.id, ...doc.data()});
    });

    return documents;
  } catch (error) {
    return error;
  }
};



export const editDataById = async (
  collection: string,
  id: string,
  updatedData: any,
) => {
  try {
    const snapshot = firestore().collection(collection).doc(id);
    await snapshot
      .update(updatedData)
      .then(() => console.log('updated'))
      .catch(err => console.log('Update error : ', err));
  } catch (error) {
    return error;
  }
};
export const deleteDataById = async (collection: string, id: string) => {
  try {
    const snapshot = firestore().collection(collection).doc(id);
    await snapshot.delete();
  } catch (error) {
    return error;
  }
};
