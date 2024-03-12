import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BUTTONS} from '../constants/appConstant';
import {COLORS} from '../utils/colors';
import Button from './Button';

interface Button {
  name: string;
  style: string;
  textStyle: string;
}
interface ConfirmBoxProps {
  onCancelHandler: () => void;
  onAcceptHandler: () => void;
  message: string;
  title: string;
  acceptBtnName: Button;
}

/**
 * @description ConfirmBox props component
 * @param onCancelHandler oncancel function pointer
 * @param onAcceptHandler on accept function pointer
 * @param message Confirm box message
 * @param title Confirm box title
 * @returns ConfirmBox component
 */

const ConfirmBox: React.FC<ConfirmBoxProps> = ({
  onCancelHandler,
  onAcceptHandler,
  message,
  title,
}) => {

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{message}</Text>
      <View style={styles.btnWrapper}>
        <Button buttonDetails={BUTTONS.deleteBtn} onPress={onAcceptHandler} />
        <Button buttonDetails={BUTTONS.cancelBtn} onPress={onCancelHandler} />
      </View>
    </View>
  );
};

export default ConfirmBox;
const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    backgroundColor: COLORS.white,
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  title: {
    color: COLORS.black,
    fontSize: 20,
    fontWeight: '700',
  },
  content: {
    color: COLORS.primaryDark,
    fontSize: 18,
    fontWeight: '500',
    paddingVertical: 10,
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
});
