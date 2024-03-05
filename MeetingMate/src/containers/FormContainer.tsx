import React, {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import Button from '../components/Button';
import {Input} from '../components/Input';
import {COLORS} from '../utils/colors';
import DropDownInput from '../components/DropDownInput';
import CheckBoxInput from '../components/CheckBoxInput';
import DateInput from '../components/DateInput';
import {
  AccountEditForm,
  LoginForm,
  MeetingEditForm,
  RoomBookingForm,
} from '../interfaces/formInterface';

interface FormProps {
  onSubmit: (
    formData: LoginForm | RoomBookingForm | AccountEditForm | MeetingEditForm,
  ) => void;
  formDetails;
}
export const Form: React.FC<FormProps> = ({formDetails, onSubmit}) => {
  const reduceddata = formDetails.fields.reduce((acc, curr) => {
    acc[curr.name] = curr.value;
    return acc;
  }, {});

  const [formData, setFormData] = useState(reduceddata);

  const onChangeHandler = data => {
    setFormData({...formData, [data.name]: data.value});
  };

  const onSubmitHandler = () => {
    if (formDetails.meetingId) {
      onSubmit({...formData, id: formDetails.meetingId});
    } else {
      onSubmit(formData);
    }
  };

  const shortfields =
    formDetails.isHavingShortFields &&
    formDetails.fields.map(field => {
      switch (field.type) {
        case 'time':
          return (
            <DateInput
              style={field.style}
              key={field.name}
              name={field.name}
              placeholder={field.placeholder}
              onChange={onChangeHandler}
              value={field.value}
            />
          );
        default:
          return null; // Or render a default component if type is unknown
      }
    });

  const fields = formDetails.fields.map(field => {
    switch (field.type) {
      case 'email-address':
      case 'default':
        return (
          <Input
            style={field.style}
            placeholder={field.placeholder}
            isPassword={field.isPassword}
            key={field.name}
            name={field.name}
            value={field.value}
            onChange={onChangeHandler}
            type={field.type}
          />
        );

      case 'dropDown':
        return (
          <DropDownInput
            style={field.style}
            onChange={onChangeHandler}
            placeholder={field.placeholder}
            options={field.options}
            name={field.name}
            key={field.name}
            value={field.value}
            isMultiSelect={field.isMultiSelect}
          />
        );
      case 'checkBox':
        return (
          <CheckBoxInput
            key={field.name}
            placeholder={field.placeholder}
            onChange={onChangeHandler}
            name={field.name}
            value={field.value}
          />
        );
      default:
        return null; // Or render a default component if type is unknown
    }
  });

  return (
    <View style={styles[formDetails.style]}>
      {fields}

      <View style={styles.wrapper}>{shortfields}</View>
      <Button buttonDetails={formDetails.buttons} onPress={onSubmitHandler} />
    </View>
  );
};
const styles = StyleSheet.create({
  loginForm: {
    width: '90%',
    height: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.transparent,
    borderRadius: 10,
    paddingHorizontal: 23,
    paddingVertical: 35,
    gap: 20,
  },
  updateForm: {
    width: '90%',
    paddingVertical: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 25,
  },
  wrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  bookingFormStyle: {
    width: '90%',
    backgroundColor: COLORS.transparent,
    borderRadius: 10,
    paddingHorizontal: 23,
    paddingVertical: 35,
    gap: 20,

    // alignItems: 'center',
  },
  bookingFormEditStyle: {
    width: '90%',
    backgroundColor: COLORS.lightTransparent,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 45,

    gap: 20,
    paddingTop: 40,
  },
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
});
