import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS} from '../utils/colors';

export default function Tag({text, textStyle, indicatorStyle}) {
  return (
    <View style={[styles.cardBox]}>
      <View style={styles[indicatorStyle]} />
      <Text style={styles[textStyle]}>{text}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  greenRound: {
    height: 10,
    width: 10,
    borderRadius: 20,
    marginHorizontal: 7,
    backgroundColor: COLORS.green,
  },
  redRound: {
    height: 10,
    width: 10,
    borderRadius: 20,
    marginHorizontal: 7,
    backgroundColor: COLORS.red,
  },
  cardBox: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    padding: 5,
    borderRadius: 5,
    width: 110,
    fontWeight: '700',
    alignItems: 'center',
  },
  redText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.red,
  },
  greenText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.green,
  },
});
