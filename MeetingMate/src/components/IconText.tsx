import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../utils/colors';

const windowWidth = Dimensions.get('window').width;
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
    columnGap: 5,

    alignItems: 'center',
  },
  columnContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: COLORS.primaryDark,
    fontSize: windowWidth > 768 ? 19 : 16,
  },
  roundIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 100,
  },
});
