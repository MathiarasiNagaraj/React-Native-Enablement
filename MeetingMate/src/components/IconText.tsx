import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../utils/colors';

export default function IconText({
  containerStyle,
  textStyle,
  text,
  iconName,
  iconColor,
  iconSize,
  iconStyle,
}) {

  return (
    <View style={styles[containerStyle]}>
      <MaterialCommunityIcons
        name={iconName}
        size={iconSize}
        color={iconColor}
        style={styles[iconStyle]}
      />
      <Text style={styles[textStyle]}>{text}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    rowGap: 10,
    columnGap: 10,
  },
  columnContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: COLORS.primaryDark,
    fontSize: 17,
  },
  roundIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 100,
  },
});
