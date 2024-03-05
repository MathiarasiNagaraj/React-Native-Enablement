import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {COLORS} from '../utils/colors';

/**
 * @description Button reusable component
 * @param buttonDetails button details name,stlye
 * @param onPress on Press event pointer
 * @returns button component
 */

interface ButtonDetailsProps{
  style: 'roundedPrimaryBtn'
  textStyle: 'whiteText'
  name:string
}
interface ButtonProps{
  buttonDetails:ButtonDetailsProps
  onPress:()=>void
}
const Button:React.FC<ButtonProps> = ({ buttonDetails, onPress }) => {
  const styleKey = buttonDetails.style as keyof typeof styles
  return (
    <TouchableOpacity onPress={onPress} style={styles[buttonDetails.style]}>
      <Text style={styles[buttonDetails.textStyle]}>{buttonDetails.name}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  whiteBold: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.white,
    textAlign: 'center',
  },

  primaryBtn: {
    width: '100%',
    height: 50,
    backgroundColor: COLORS.primaryDark,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  roundedPrimaryBtn: {
    width: '100%',
    elevation: 20,
    height: 50,
    backgroundColor: COLORS.primaryDark,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: COLORS.darkCyan,
    shadowRadius: 20,
    shadowOpacity: 3,
    alignSelf:'center',
  },
  secondaryBtn: {
    backgroundColor: COLORS.secondaryDark,
    padding: 10,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,

  },
  tertiaryBtn: {
    backgroundColor: COLORS.tertiaryDark,
    padding: 10,
    paddingHorizontal: 13,
    borderRadius: 10,
    color: COLORS.darkCyan,
    fontWeight: '500',
    fontSize: 14,
  },
  transparentBtn: {
    backgroundColor: COLORS.transparent,
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    color: COLORS.darkCyan,
    fontWeight: '500',
    fontSize: 14,
  },
  whiteText: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '500',
    color: COLORS.white,
  },
  dangerBtn: {
    backgroundColor: COLORS.greyShadePrimary,
    padding: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    color: COLORS.darkCyan,
    fontWeight: '500',
    fontSize: 14,
  },
  cancelBtn: {
    backgroundColor: COLORS.greyShadeSecondary,


padding:10,
    paddingHorizontal: 16,
    borderRadius: 10,
    color: COLORS.darkCyan,
    fontWeight: '500',
    fontSize: 14,
  },
  updateBtn: {
    padding: 10,
    borderRadius: 10,
    color: COLORS.darkCyan,
    backgroundColor: COLORS.transparent,
    fontWeight: '500',
    fontSize: 14,
  },
  deleteBtn: {
    padding: 10,
    borderRadius: 10,
  },
  loginBtn: {
    backgroundColor: COLORS.primaryDark,
    height: 50,
    elevation: 10,
    width: '90%',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },

  viewScheduleBtn: {
    backgroundColor: COLORS.primaryDark,
  },
  scanBtn: {
    backgroundColor: COLORS.primaryDark,
    height: 50,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  BookBtn: {
    width: '90%',
    elevation: 20,
    alignSelf:'center',
    height: 50,
    backgroundColor: COLORS.primaryDark,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: COLORS.darkCyan,
    shadowRadius: 20,
    shadowOpacity: 3,
  },

  editBtn: {
    padding: 10,
    borderRadius: 10,
    color: COLORS.darkCyan,
    backgroundColor: COLORS.transparent,
    fontWeight: '500',
    fontSize: 14,
  }
});
