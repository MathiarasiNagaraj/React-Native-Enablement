import { BRANCHES, GEO_LOCATION } from "../constants/appConstant";
import { getData } from "../services/asyncStorage";
import { COLLECTIONS, readAllUsers,readAllRoomsByBranch } from "../services/firestore";


export const getNameById = (rooms, id) => {

  const room = rooms?.find((room) => room.id === id);

  return room?.name;
}


export const getRoomByName = (rooms, name) => {
  const room = rooms?.find((room) => room.name === name);

  return room
}


export const filterByName = (array, text) => {

  if (text.length===0)
    return array;
  
  return array.filter(obj => obj.name.toLowerCase().startsWith(text.toLowerCase()));
}



export const filterByOptions = (array, option) => {
  let results = [];
  switch (option) {
    case 'availability':
 results=array.filter(obj=>obj.availability==true)
      break;
    case 'boardAvailability':
      results=array.filter(obj=>obj.boardAvailablity==true)
      break;
    case 'maxLimits':
      results = array.filter(obj => obj.maxLimit > 20)
      break;
    case 'monitorAvailability':
      results=array.filter(obj=>obj.monitorAvailablity==true)
      break;

  }
  return results
}

export const getBottomBarIconName = (name:string) => {
    let icon = '';
    switch (name) {
      case 'Home':
        icon = 'home';
        break;
      case 'Book a Slot':
        icon = 'calendar-account';
        break;
      case 'My Booking':
        icon = 'account-circle';
        break;
      case 'Scan':
        icon = 'qrcode-scan';
            break;
        case 'Setting':
        icon = 'cog-outline'    
    }
    return icon;
}

export const  msToHoursMinutes=(milliseconds) =>{
  var hours = Math.floor(milliseconds / (1000 * 3600));
  var minutes = Math.floor((milliseconds % (1000 * 3600)) / (1000 * 60));
  if (hours > 0) return hours + 'hr ' + minutes + 'mins';
  else return minutes + ' mins';
}
function haversine(lat1, lon1, lat2, lon2) {
  // Convert degrees to radians
  const toRadians = degrees => (degrees * Math.PI) / 180;
  
  // Earth radius in kilometers
  const R = 6371;

  // Convert latitude and longitude to radians
  const rad1 = toRadians(lat1);
  const rad2 = toRadians(lat2);
  const rad3 = toRadians(lat2 - lat1);
  const rad4 = toRadians(lon2 - lon1);

  // Haversine formula
  const a = Math.sin(rad3 / 2) * Math.sin(rad3 / 2) +
          Math.cos(rad1) * Math.cos(rad2) *
          Math.sin(rad4 / 2) * Math.sin(rad4 / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Distance in kilometers
  const distance = R * c;
  return distance;
}


export const getCurrentCity = (latitude, longitude) => {
let city = '';
  GEO_LOCATION.forEach((location) => {
   if (haversine(latitude,longitude,location.latitude,location.longitude)<=1){
      city = location.location
    }
  })
  return city;
}

// export const isValidSlot = (slots,bookingSlot) => {
  
// }





export const getOptions = async (option: string) => {
  let options = []

  const user = await getData('user');
  switch (option) {
    case 'rooms':
      {
        const data = await readAllRoomsByBranch(user.location);

        options = data.map(item => ({
          label: item.name,
          value: item.id
        }));
      }
      break;
    case 'users':
      {
        const data = await readAllUsers();

        options = data.map(item => ({
          label: item.name,
          value: item.id
        }));
      }
      break;
    case 'location':
      options = BRANCHES
      break;
  }
  return options;
}