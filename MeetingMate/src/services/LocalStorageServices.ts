import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeLocalData = async (key:string, value:any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    throw(error)
    }
};

export const getLocalDataByKey = async (key:string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  }catch (error) {
    throw(error)
    }
};

export const removeLocalDataByKey = async (key:string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
  throw(error)
  }
};
