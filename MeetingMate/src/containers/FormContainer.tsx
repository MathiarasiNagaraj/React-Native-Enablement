import React, {useState} from 'react';
import {Alert, KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
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

interface Field{
  name: string,
  placeholder: string,
  type: string,
  style: string,
  width: string,
  isPassword: boolean,
  value: string|boolean ,
  isMultiSelect: boolean,
  options:string
}
interface FormType{
  style: string
  isHavingShortFields: boolean
  fields: Field[],
  button:{}
}

interface FormProps {
  onSubmit: (
    formData: LoginForm | RoomBookingForm | AccountEditForm | MeetingEditForm,
  ) => void;
  formDetails:FormType
}

/**
 * @description Custumizable form component
 * @param formdetails form details component
 * @returns form component
 */
export const Form: React.FC<FormProps> = ({formDetails, onSubmit}) => {
  const reduceddata = formDetails.fields.reduce((acc, curr) => {
    acc[curr.name] = curr.value;
    return acc;
  }, {});

  const [formData, setFormData] = useState(reduceddata);

  //on input change handler
  const onChangeHandler = data => {
    setFormData({...formData, [data.name]: data.value});
  };

  //on submit handler for form
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
    <KeyboardAvoidingView
      style={styles.viewContainer}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
 >
    <View style={styles[formDetails.style]}>
      {fields}

      <View style={styles.wrapper}>{shortfields}</View>
      <Button buttonDetails={formDetails.buttons} onPress={onSubmitHandler} />
      </View>
     </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  viewContainer: {
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems:'center'
  },
  loginForm: {
    width: '90%',
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
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
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingHorizontal: 23,
    paddingVertical: 35,
    gap: 20,
    marginVertical:20,
    elevation:20
  },
  bookingFormEditStyle: {
    width: '90%',
    backgroundColor: COLORS.white,
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
