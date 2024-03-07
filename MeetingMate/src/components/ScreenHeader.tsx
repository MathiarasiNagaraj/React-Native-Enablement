import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../utils/colors';
import { useNavigation } from '@react-navigation/native';

interface ScreenHeaderProps{
    title:string
}
const ScreenHeader :React.FC<ScreenHeaderProps>= ({title}) => {
  const navigation = useNavigation();
  const onGoBackHandler = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.wrapper}>
       <StatusBar
           backgroundColor={COLORS.primaryDark}
           barStyle="light-content"
      />

      <MaterialCommunityIcons
        name="arrow-left"
        size={26}
        style={styles.icon}
        color={COLORS.white}
        onPress={onGoBackHandler}
      />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default ScreenHeader;
const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    backgroundColor: COLORS.primaryDark,
    alignItems: 'center',
    gap: 20,
    height: 70,
  },
  icon: {
    margin: 10,
  },
  title: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: '600',
  },
});
