import React, {useEffect, useState} from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ASYNC_STORE_KEY, SCREEN_NAMES} from '../constants/appConstant';
import {getLocalDataByKey} from '../services/asyncStorage';
import {useRecoilValue} from 'recoil';
import {User} from '../store/atom/userAtom';
import {StackNavigationProp} from '@react-navigation/stack';
import {COLORS} from '../utils/colors';
/**
 * @description App Header component
 * @returns header component with profile and logo
 */

export const Header = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const user = useRecoilValue(User);
  const [imgUrl, setImgUrl] = useState();
  const [userName, setUserName] = useState();
  const getUserData = async () => {
    const userData = await getLocalDataByKey(ASYNC_STORE_KEY.USER);

    setImgUrl(userData?.imgUrl);
    setUserName(userData.name);
  };
  useEffect(() => {
    getUserData();
  }, []);
  useEffect(() => {
    getUserData();
  }, [user]);
  const onAccountClickHandler = () => {
    navigation.navigate(SCREEN_NAMES.MY_ACCOUNT, {});
  };

  const myImage = require('../assets/images/logo1.png');

  return (
    <View style={styles.wrapper}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <Image source={myImage} alt="logo" style={styles.logo} />
      <TouchableOpacity onPress={onAccountClickHandler}>
        {imgUrl && <Image style={styles.profileImg} source={{uri: imgUrl}} />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  title: {
    color: COLORS.greyShadePrimary,
    fontSize: 30,
    fontWeight: '900',
  },
  text: {
    color: COLORS.primaryDark,
    fontSize: 22,
    fontWeight: '700',
  },
  profileImg: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  logo: {
    height: 70,
    width: 180,
  },
});
