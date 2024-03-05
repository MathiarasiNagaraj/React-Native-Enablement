import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {LinearGradientContainer} from '../containers/LinearGradientContainer';
import {Form} from '../containers/FormContainer';
import {LOGIN_FORM} from '../form/formConfig';
import {SCREEN_NAMES} from '../constants/appConstant';
import {commonStyle} from '../styles/commonStyle';
import {useToast} from 'react-native-toast-notifications';
import {TOAST_MESSAGES} from '../messages/appMessage';
import {getData, storeData} from '../services/asyncStorage';
import {useSetRecoilState} from 'recoil';
import {User} from '../store/atom/userAtom';
import GetLocation from 'react-native-get-location';
import {getCurrentCity} from '../utils/commonUtils';
import {validateLoginForm} from '../utils/validations.utils';
import {LoginForm} from '../interfaces/formInterface';
import {firebase} from '@react-native-firebase/storage';
export const LoginScreen = () => {
  const navigate = useNavigation();
  const toast = useToast();
  const setUser = useSetRecoilState(User);
  const [imgUrl, setImgUrl] = useState();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [location, setLocation] = useState<String>();
  getData('user').then(data => {
    if ( data&&data.isLoggedIn) {
      setIsUserLoggedIn(true);
      navigate.navigate(SCREEN_NAMES.HOME, {});
    }
  });

  useEffect(() => {
    if (!isUserLoggedIn) {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
      })
        .then(async location => {
          const city = getCurrentCity(location.latitude, location.longitude);
          setUser(prevUser => ({
            ...prevUser,
            location: city,
          }));
          setLocation(city);
        })
        .catch(error => {
          const {code, message} = error;
          console.warn(code, message);
        });
    }
  }, []);

  const onLoginHandler = async (data: LoginForm) => {
    const response = await validateLoginForm(data);
console.log(data)
    if (response.valid) {
      setUser(prevUser => ({
        ...prevUser,
        user: response.data,
      }));

      const user = {...response.data, isLoggedIn:true,location: location};
      let imageRef = firebase.storage().ref('/' + user.id);

      const url = await imageRef.getDownloadURL();
        
    

      const modifiedUser = { ...user, imgUrl:url }
      await storeData('user', modifiedUser);

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
  return (
    <LinearGradientContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <View style={commonStyle.container}>
          <Form formDetails={LOGIN_FORM} onSubmit={onLoginHandler} />
        </View>
      </KeyboardAvoidingView>
    </LinearGradientContainer>
  );
};

const styles = StyleSheet.create({});
