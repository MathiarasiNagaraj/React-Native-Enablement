import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenHeader from '../components/ScreenHeader';
import { ASYNC_STORE_KEY, BUTTONS, SCREEN_NAMES } from '../constants/appConstant';
import { LinearGradientContainer } from '../containers/LinearGradientContainer';
import {
  getLocalDataByKey,
  removeLocalDataByKey,
  storeLocalData,
} from '../services/LocalStorageServices';
import { COLORS } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';
import { Form } from '../containers/FormContainer';
import { PROFILE_EDIT_FORM } from '../form/formConfig';
import { editDataById, readAllRooms } from '../services/MeetingServices';
import { COLLECTIONS } from '../constants/appConstant';
import ImagePicker from 'react-native-image-crop-picker';
import { useRecoilState } from 'recoil';
import storage from '@react-native-firebase/storage';
import { User } from '../store/atom/userAtom';
import { AccountEditForm } from '../interfaces/formInterface';
import { StackNavigationProp } from '@react-navigation/stack';
import AccountDetailsContainer from '../containers/AccountDetailsContainer';

export const MyAccountScreen = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigation<StackNavigationProp<any>>();
  const [userDetail, setUserDetail] = useRecoilState(User);
  const [isEditMode, setIsEditMode] = useState(false);
  const [imgUrl, setImgUrl] = useState();
  useEffect(() => {
    const getasyncData = async () => {
      const data = await getLocalDataByKey(ASYNC_STORE_KEY.USER);
      setUser(data);

      setImgUrl(data.imgUrl);
    };
    getasyncData();
  }, []);

  const onEditHandler = () => {
    setIsEditMode(true);
  };
  const onLogoutHandler = async () => {
    await removeLocalDataByKey('user');
    navigate.navigate(SCREEN_NAMES.LOGIN, {});
  };
  const onUpdateProfileHandler = async (data: AccountEditForm) => {
    const user = await getLocalDataByKey(ASYNC_STORE_KEY.USER);
    editDataById(COLLECTIONS.Users, user.id, {...data, name: user.name});
    const modifiedUser = {...user, ...data};
    await storeLocalData(ASYNC_STORE_KEY.USER, modifiedUser);

    setUser(modifiedUser);

    setUserDetail(prevAuthState => ({
      ...prevAuthState,
      location: modifiedUser.location,
      user: modifiedUser,
    }));
    setIsEditMode(false);
  };

  const onImageUploadHandler = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(async image => {
      if (image.path) {
        try {
          await storage().ref(user.id).putFile(image.path);
          setImgUrl(image.path);
          const modifiedUser = {...user, imgUrl: image.path};
          await storeLocalData(ASYNC_STORE_KEY.USER, modifiedUser);
          setUserDetail(prevAuthState => ({
            ...prevAuthState,
            user: modifiedUser,
          }));
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  return (
    <LinearGradientContainer>
      <ScreenHeader
        title={SCREEN_NAMES.MY_ACCOUNT}
        style={'wrapper'}
        iconStyle={'icon'}
      />
      <ScrollView
        contentContainerStyle={styles.container}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {isEditMode ? (
          <>
            {imgUrl && (
              <ImageBackground
                source={{
                  uri: imgUrl,
                }}
                style={{height: 150, width: 150}}
                imageStyle={{borderRadius: 100}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="camera"
                    size={35}
                    color="#fff"
                    onPress={onImageUploadHandler}
                    style={{
                      opacity: 0.7,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: '#fff',
                      borderRadius: 10,
                    }}
                  />
                </View>
              </ImageBackground>
            )}
            <Text style={styles.name}>{user.name}</Text>
            <Form
              formDetails={PROFILE_EDIT_FORM(
                user.email,
                user.password,
                user.location,
              )}
              onSubmit={onUpdateProfileHandler}
            />
          </>
        ) : (
          <>
            {imgUrl && (
              <Image style={styles.imageContainer} source={{uri: imgUrl}} />
            )}
            <Text style={styles.name}>{user.name}</Text>
            <View style={styles.buttonContainer}>
              <Button
                buttonDetails={BUTTONS.editProfileBtn}
                onPress={onEditHandler}
              />
              <Button
                buttonDetails={BUTTONS.logoutBtn}
                onPress={onLogoutHandler}
              />
            </View>

            <AccountDetailsContainer user={user} />
          </>
        )}
      </ScrollView>
    </LinearGradientContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    rowGap: 8,
    width: '100%',
  },
  imageContainer: {
    height: 200,
    width: 200,
    borderRadius: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '70%',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  name: {
    color: COLORS.primaryDark,
    fontSize: 23,
    fontWeight: '700',
  },
});
