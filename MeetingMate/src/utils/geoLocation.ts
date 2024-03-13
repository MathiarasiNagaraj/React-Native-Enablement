import GetLocation from 'react-native-get-location';
import {getCurrentCity} from './commonUtils';
export const getCurrentCityName = async () => {
    try {
      const location = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
      });
      const city = getCurrentCity(location.latitude, location.longitude);
      return city;
    } catch (error) {
    throw(error)
    }
  };