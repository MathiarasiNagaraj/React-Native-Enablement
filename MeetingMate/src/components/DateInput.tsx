import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {COLORS} from '../utils/colors';

interface Type{
  name: string,
  value:Date
}
interface DateInputProps {
  name: string;
  placeholder: string;
  onChange: ({name,value}:Type) => void;
  value: string;
  style:'whiteTimeBox'|'darkTimeBox';
}
/**
 * @description DateInput component for Date
 * @param name   name of the Dateinput
 * @param placeholder  placeholder 
 * @param onChange onchange function pointer
 * @param value value for function 
 * @param style style for input
 * @returns DateInput
 */
const DateInput: React.FC<DateInputProps> = ({
  name,
  placeholder,
  onChange,
  value,
  style,
}) => {
  const inputValue = new Date(value);
  const hourFormat = inputValue.getHours() + ':' + inputValue.getMinutes();
  const [inputTime, setInputTime] = useState(hourFormat);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <View>
      <TextInput
        placeholder={placeholder}
        style={styles[style]}
        placeholderTextColor={COLORS.primaryDark}
        value={  inputTime!=='NaN:NaN'?inputTime:placeholder}
        onFocus={() => setOpen(true)}
      />

      <DatePicker
        mode="time"
        modal
        open={open}
        date={date}
        onConfirm={selectedDate => {
          setOpen(false);

          const hours = selectedDate.getHours();
          const minutes = selectedDate.getMinutes();

          const formattedHours = String(hours).padStart(2, '0');
          const formattedMinutes = String(minutes).padStart(2, '0');

          const formattedTime = `${formattedHours}:${formattedMinutes}`;

          setInputTime(formattedTime);

          onChange({name, value: selectedDate});
        }}
        onCancel={() => {
          setOpen(false);
        }}
  
      />
    </View>
  );
};

export default DateInput;
const styles = StyleSheet.create({
  whiteTimeBox: {
    width: 130,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: COLORS.primaryDark,
    fontSize: 16,
    alignSelf:'center',
    borderBottomWidth: 1,
    borderColor: COLORS.primaryDark,
  },
 
});
