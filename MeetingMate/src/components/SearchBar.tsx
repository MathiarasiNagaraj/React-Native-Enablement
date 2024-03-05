import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../utils/colors';
import {Input} from './Input';
import {useNavigation} from '@react-navigation/native';
import { SCREEN_NAMES } from '../constants/appConstant';


/**
 * @description Search bar component 
 * @returns Search bar component
 */
export const SearchBar = () => {
  const navigation = useNavigation();
  const onQRHandler = () => {
    navigation.navigate(SCREEN_NAMES.QR_SCAN, {});
  };
  const onFocusHandler = () => {
    navigation.navigate(SCREEN_NAMES.SEARCH, {});
  };
  return (
    <View style={styles.searchBar}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <MaterialCommunityIcons name="magnify" size={23} color={COLORS.white} />
        <TextInput
          placeholderTextColor={COLORS.white}
          style={styles.input}
          placeholder={'Search Rooms'}
          onFocus={onFocusHandler}
        />
      </View>
      <MaterialCommunityIcons
        name="qrcode-scan"
        size={23}
        color={COLORS.primaryDark}
        style={{alignItems: 'flex-end'}}
        onPress={onQRHandler}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  searchBar: {
    width: '92%',
    flexDirection: 'row',
    marginTop: 30,
    alignSelf: 'center',
    fontSize: 20,
    borderWidth: 1,
    borderColor: COLORS.white,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: COLORS.transparent,
  },
  input: {
    fontSize: 20,
  },
});
