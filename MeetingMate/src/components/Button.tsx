import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {COLORS} from '../utils/colors';

/**
 * @description Button reusable component
 * @param buttonDetails button details name,stlye
 * @param onPress on Press event pointer
 * @returns button component
 */

interface ButtonDetailsProps {
  style: keyof typeof styles;
  textStyle: keyof typeof textStyles;
  name: string;
}
interface ButtonProps {
  buttonDetails: ButtonDetailsProps;
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({buttonDetails, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles[buttonDetails.style]}>
      <Text style={textStyles[buttonDetails.textStyle]}>
        {buttonDetails.name}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const textStyles = StyleSheet.create({
  whiteText: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '500',
    color: COLORS.white,
  },
  whiteBoldText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.white,
    textAlign: 'center',
  },
});
const styles = StyleSheet.create({
  primaryButton: {
    width: '100%',
    padding: 20,
    backgroundColor: COLORS.primaryDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundedPrimaryButton: {
    width: '100%',
    elevation: 5,
    height: 50,
    backgroundColor: COLORS.primaryDark,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowRadius: 20,
    shadowOpacity: 3,
    alignSelf: 'center',
  },
  secondaryButton: {
    backgroundColor: COLORS.primaryDark,
    padding: 8,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
    marginVertical: 8,
  },
  tertiaryButton: {
    backgroundColor: COLORS.primaryLight,
    padding: 8,
    paddingHorizontal: 13,
    borderRadius: 10,
    fontWeight: '500',
    fontSize: 14,
  },

  dangerButton: {
    backgroundColor: COLORS.red,
    padding: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    fontWeight: '500',
    fontSize: 14,
  },
  cancelButton: {
    backgroundColor: COLORS.greyShadePrimary,
    padding: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    fontWeight: '500',
    fontSize: 14,
  },
  updateButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: COLORS.transparent,
    fontWeight: '500',
    fontSize: 14,
  },
  deleteButton: {
    padding: 10,
    borderRadius: 10,
  },
});
