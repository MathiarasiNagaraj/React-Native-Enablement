import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../utils/colors';
import {useNavigation} from '@react-navigation/native';

interface ScreenHeaderProps {
  title?: string;
  style: string,
  iconStyle:string
}

/**
 * @description ScreenHeader component
 * @param title Screen header title
 * @returns Screen header 
 */
const ScreenHeader: React.FC<ScreenHeaderProps> = ({title,iconStyle,style}) => {
  const navigation = useNavigation();
  const onGoBackHandler = () => {
    navigation.goBack();
  };
  return (
    <View style={styles[style]}>
      <StatusBar
        backgroundColor={COLORS.primaryDark}
        barStyle="light-content"
      />

      <MaterialCommunityIcons
        name="arrow-left"
        size={26}
        style={styles[iconStyle]}
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
   
    width:'100%'
  },
  transparentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    height: 70,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
   
    zIndex: 1000,
  
  },
  icon: {
    margin: 10,
  },
  darkIcon: {
    margin: 10,
    color:COLORS.primaryDark
  },
  title: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: '600',
  },
});
