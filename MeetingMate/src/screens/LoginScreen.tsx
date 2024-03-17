import React, {useEffect, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {LinearGradientContainer} from '../containers/LinearGradientContainer';
import {Form} from '../containers/FormContainer';
import {LOGIN_FORM} from '../form/formConfig';
import {ASYNC_STORE_KEY, SCREEN_NAMES} from '../constants/appConstant';
import {commonStyle} from '../styles/commonStyle';
import {useToast} from 'react-native-toast-notifications';
import {TOAST_MESSAGES, VIEW_ROOMS} from '../messages/appMessage';
import {
  getLocalDataByKey,
  storeLocalData,
} from '../services/LocalStorageServices';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {User} from '../store/atom/userAtom';
import {validateLoginForm} from '../utils/validations.utils';
import {LoginForm} from '../interfaces/formInterface';
import {firebase} from '@react-native-firebase/storage';
import {StackNavigationProp} from '@react-navigation/stack';
import {Rooms} from '../interfaces/commonInterface';
import {readAllRoomsByBranch, readAllUsers} from '../services/MeetingServices';
import {Room} from '../store/atom/roomAtom';
import SplashScreen from 'react-native-splash-screen';
import {COLORS} from '../utils/colors';
import {Members} from '../store/atom/membersAtom';
import {getCurrentCityName} from '../utils/geoLocation';

export const LoginScreen = () => {
  const navigate = useNavigation<StackNavigationProp<any>>();
  const toast = useToast();
  const setUser = useSetRecoilState(User);
  const [imgUrl, setImgUrl] = useState();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [location, setLocation] = useState<String>();
  const [rooms, setRooms] = useRecoilState<Rooms[]>(Room);
  const [members, setMembers] = useRecoilState(Members);

  const getLocalData = async () => {
    const data = await getLocalDataByKey(ASYNC_STORE_KEY.USER);
    return data;
  };

  const getUserData = async () => {
    const user = await getLocalData();
    if (user && user.isLoggedIn) {
      setIsUserLoggedIn(true);
      navigate.navigate(SCREEN_NAMES.HOME, {});
    }
  };
  const getLocation = async () => {
    const city = await getCurrentCityName();
    setUser(prevUser => ({
      ...prevUser,
      location: city,
    }));
    if (city) setLocation(city);
    else setLocation('Chennai');
  };
  useEffect(() => {
    initData();

    getLocation();
    getUserData();

    SplashScreen.hide();
  }, []);
  const getRoomData = async (location: string) => {
    const data = await readAllRoomsByBranch(location);
    setRooms(data);
  };

  const getAllUserDetails = async () => {
    const data = await readAllUsers();
    setMembers(data);
  };

  const initData = async () => {
    getAllUserDetails();
  };

  const onViewRoomsClickHandler = async () => {
    await getRoomData('Chennai');
    if (rooms.length > 0) navigate.navigate(SCREEN_NAMES.MEETING_ROOM_LIST, {});
  };
  const onLoginHandler = async (data: LoginForm) => {
    const response = await validateLoginForm(data);

    if (response.valid) {
      setUser(prevUser => ({
        ...prevUser,
        user: response.data,
      }));

      const user = {...response.data, isLoggedIn: true, location: location};
      let imageRef = firebase.storage().ref('/' + user.id);
      const url = await imageRef.getDownloadURL();
      const modifiedUser = {...user, imgUrl: url, location: 'Chennai'};
      await storeLocalData('user', modifiedUser);

      navigate.navigate(SCREEN_NAMES.HOME, {});
    } else {
      toast.show(TOAST_MESSAGES.INVALID_USER, {
        type: 'danger',
        placement: 'bottom',
        duration: 4000,
        animationType: 'slide-in',
        style: commonStyle.dangerToast,
      });
    }
  };
  const myImage = require('../assets/images/logo.png');
  return (
    <LinearGradientContainer>
      <View style={commonStyle.container}>
        <Image source={myImage} alt="logo" style={styles.logo} />
        <View style={styles.formContainer}>
          <Form formDetails={LOGIN_FORM} onSubmit={onLoginHandler} />
          <Pressable onPress={onViewRoomsClickHandler}>
            <Text style={styles.text}>{VIEW_ROOMS}</Text>
          </Pressable>
        </View>
      </View>
    </LinearGradientContainer>
  );
};

const styles = StyleSheet.create({
  logo: {
    height: 100,
    width: 200,
    margin: 20,
    objectFit: 'contain',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    maxWidth: '90%',
    width: 500,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: COLORS.white,
    fontSize: 20,
    margin: 25,
    backgroundColor: COLORS.primaryDark,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
    textAlign: 'center',
  },
});
