import React, {useState} from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  TextInput,
} from 'react-native';
import {COLORS} from '../utils/colors';

interface Type{
  name: string,
  value:string
}
interface InputProps {
  type: KeyboardTypeOptions;
  placeholder: string;
  style: 'whiteBox' | 'whiteBoxUnderLine' | 'darkBox';
  isPassword: boolean;
  onChange: ({name,value}:Type) => void;
  value: string;
  name: string;
}
export const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  style,
  isPassword,
  onChange,
  value,
  name,
}) => {
  const [text, setText] = useState(value);

  return (
    <TextInput
      style={styles[style]}
      value={text}
      cursorColor={COLORS.primaryDark}
      keyboardType={type}
      placeholder={placeholder}
      onChangeText={text => {
        onChange({name, value: text});
        setText(text);
      }}
      placeholderTextColor={COLORS.primaryDark}
      secureTextEntry={isPassword}
    />
  );
};
const styles = StyleSheet.create({
  whiteBox: {
    color: COLORS.primaryDark,

    borderBottomWidth: 1.1,
    alignSelf: 'center',
    borderColor: COLORS.primaryDark,
    paddingLeft: 20,
    fontSize: 16,
    width: '100%',
    height: 50,
  },
  whiteBoxUnderLine: {
    color: COLORS.greyShadeTertiary,
    borderBottomWidth: 1,
    borderColor: COLORS.white,
    paddingLeft: 20,
    alignSelf: 'center',
    fontSize: 16,
    width: '90%',
    height: 50,
  },
  darkBox: {
    color: COLORS.black,
    borderRadius: 0,
    borderBottomWidth: 1,
    borderColor: COLORS.primaryDark,
    paddingLeft: 20,
    alignSelf: 'center',
    fontSize: 16,
    width: '100%',
    height: 50,
  },
});
