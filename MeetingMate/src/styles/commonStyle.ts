import {StyleSheet} from 'react-native';
import {COLORS} from '../utils/colors';

export const commonStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toastText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '500',
  },
  successToast: {
    width: '70%',
    backgroundColor: COLORS.transparent,
    borderLeftColor: COLORS.green,
    borderLeftWidth: 10,
  },
  infoToast: {
    width: '70%',
    backgroundColor: COLORS.transparent,
    borderLeftColor: COLORS.brightCyan,
    borderLeftWidth: 10,
    color: COLORS.black,
  },
  dangerToast: {
    width: '70%',
    backgroundColor: COLORS.transparent,
    borderLeftColor: COLORS.red,
    borderLeftWidth: 10,
    color: COLORS.black,
  },
});
