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
      cursorColor={COLORS.white}
      keyboardType={type}
      placeholder={placeholder}
      onChangeText={text => {
        onChange({name, value: text});
        setText(text);
      }}
      placeholderTextColor={COLORS.white}
      secureTextEntry={isPassword}
    />
  );
};
const styles = StyleSheet.create({
  whiteBox: {
    color: COLORS.white,
    borderRadius: 10,
    borderWidth: 1,
    alignSelf: 'center',
    borderColor: COLORS.white,
    paddingLeft: 20,
    fontSize: 16,
    width: '100%',
    height: 50,
  },
  whiteBoxUnderLine: {
    color: COLORS.greyShadeTertiary,
    borderRadius: 10,
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
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.secondaryDark,
    paddingLeft: 20,
    alignSelf: 'center',
    fontSize: 16,
    width: '100%',
    height: 50,
  },
});
