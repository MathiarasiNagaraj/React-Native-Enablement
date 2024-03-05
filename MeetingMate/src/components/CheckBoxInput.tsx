import React, {useState} from 'react';
import CheckBox from '@react-native-community/checkbox';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../utils/colors';
/**
 * @description Checkbox reusable component
 * @param value check box initial value
 * @param name check box unique name
 * @param placeholder
 * @param onChange onchange event for checkbox
 * @returns
 */

interface onChangeProps {
  name: string;
  value: boolean;
}

interface CheckBoxInputProps {
  placeholder: string;
  onChange: ({name, value}: onChangeProps) => {};
  name: string;
  value: boolean;
}

const CheckBoxInput: React.FC<CheckBoxInputProps> = ({
  placeholder,
  onChange,
  name,
  value,
}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(value);

  return (
    <View style={styles.wrapper}>
      <CheckBox
        disabled={false}
        tintColors={{true: COLORS.white, false: COLORS.white}}
        onTintColor={COLORS.white}
        onCheckColor={COLORS.white}
        onFillColor={COLORS.white}
        style={{borderColor: COLORS.white}}
        tintColor={COLORS.white}
        value={toggleCheckBox}
        onValueChange={newValue => {
          setToggleCheckBox(newValue);
          onChange({name, value: newValue});
        }}
      />
      <Text style={styles.placeholder}>{placeholder}</Text>
    </View>
  );
};

export default CheckBoxInput;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  placeholder: {
    fontSize: 17,
    color: COLORS.white,
  },
});
