import React, { useEffect, useState } from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SCREEN_NAMES } from '../constants/appConstant';
import { getData } from '../services/asyncStorage';
import { useRecoilValue } from 'recoil';
import { User } from '../store/atom/userAtom';
import { StackNavigationProp } from '@react-navigation/stack';
/**
 * @description App Header component 
 * @returns header component with profile and logo
 */

// export type RootStackParamList = {
//   MyAccount: {  } | undefined;
// };
export const Header = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const user = useRecoilValue(User);

  const [imgUrl, setImgUrl] = useState();
  useEffect(() => {
    const getUserData = async () => {
    
      const userData = await getData('user');

      setImgUrl(userData?.imgUrl);
      
    }
    getUserData()
  },[])
  const onAccountClickHandler = () => {
    navigation.navigate(SCREEN_NAMES.MY_ACCOUNT,{});
  };
  const myImage = require('../assets/images/logo1.png')

  return (
    <View style={styles.wrapper}>
     

      <Image source={myImage} alt='logo' style={styles.logo} />
      <TouchableOpacity onPress={onAccountClickHandler}>
        {imgUrl&&
          <Image
            style={{ height: 50, width: 50, borderRadius: 50 }}
            source={{ uri: imgUrl }}
        
          />
        }
     </TouchableOpacity>
     
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
    logo: {
        height: 60,
        width:150
  },
});
