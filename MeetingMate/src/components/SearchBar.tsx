import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../utils/colors';
import {useNavigation} from '@react-navigation/native';
import { SCREEN_NAMES } from '../constants/appConstant';
import { StackNavigationProp } from '@react-navigation/stack';


/**
 * @description Search bar component 
 * @returns Search bar component
 */
export const SearchBar = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  // on qr click handler
  const onQRHandler = () => {
    navigation.navigate(SCREEN_NAMES.QR_SCAN, {});
  };
  //on focus of input handler
  const onNavigateHandler = () => {
    navigation.navigate(SCREEN_NAMES.SEARCH, {});
  };
  return (
    <View style={styles.searchBar}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <MaterialCommunityIcons name="magnify" size={23} style={{ fontWeight: '900' }} color={COLORS.primaryDark}
               onPress={onNavigateHandler}
        />
        <TextInput
          placeholderTextColor={COLORS.primaryDark}
          style={styles.input}
          placeholder={'Search Rooms'}
          onFocus={onNavigateHandler}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderRadius:40,
    backgroundColor: COLORS.white,
    elevation:10

  },
  input: {
    fontSize: 20,
  },
});
