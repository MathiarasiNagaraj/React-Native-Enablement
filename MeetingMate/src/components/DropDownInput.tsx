import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {COLORS} from '../utils/colors';
import {MultiSelect} from 'react-native-element-dropdown';
import {getOptions} from '../utils/commonUtils';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
interface Type {
  name: string;
  value: string | string[];
}

interface DropDownInputProps {
  style: string;
  onChange: ({name, value}: Type) => {};
  placeholder: string;
  options: string;
  name: string;
  value: string | string[];
  isMultiSelect: boolean;
}

/**
 * @description Dropdown input box orsingle and multi select dropdown
 * @param style style type for dropdown input
 * @param onChange onchange event handler pointer
 * @param placeholder placeholder for dropdown box
 * @param name name of dropdown input
 * @param value default value for drop down input
 * @returns  dropdown component
 */

const DropDownInput: React.FC<DropDownInputProps> = ({
  style,
  onChange,
  placeholder,
  options,
  name,
  value,
  isMultiSelect,
}) => {
  
  const [values, setValues] = useState(value);
  const [optionList, setOptionList] = useState([]);

  const [selected, setSelected] = useState<string[]>(value);
  useEffect(() => {
    const getOptionList = async () => {
      const data = await getOptions(options);
      setOptionList(data);
    };
    getOptionList();
  }, [options]);

  return (
    <>
      {!isMultiSelect ? (
        <Dropdown
          style={styles[style]}
          itemContainerStyle={{backgroundColor: COLORS.transparent}}
          itemTextStyle={{color: COLORS.black}}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={optionList}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          searchPlaceholder={placeholder}
          value={value}
          onChange={item => {
            setValues(item.value);
            onChange({name, value: item.value});
          }}
        />
      ) : (
        <View>
          <MultiSelect
            style={styles[style]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={optionList}
            labelField="label"
            valueField="value"
            placeholder={placeholder}
            value={selected}
            search
            itemTextStyle={{color: COLORS.black}}
            searchPlaceholder={placeholder}
            onChange={item => {
              setSelected(item);
              onChange({name: name, value: item});
            }}
            renderSelectedItem={(item, unSelect) =>
              value || selected ? (
                <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                  <View style={styles.selectedStyle}>
                    <Text style={styles.textSelectedStyle}>{item.label}</Text>
                    <MaterialCommunityIcons
                      name="close"
                      size={22}
                      color={COLORS.primaryDark}
                    />
                  </View>
                </TouchableOpacity>
              ) : (
                <></>
              )
            }
          />
        </View>
      )}
    </>
  );
};

export default DropDownInput;
const styles = StyleSheet.create({
  dropdown: {
    paddingHorizontal: 20,
    height: 50,
    width: '100%',
    alignSelf: 'center',
    borderBottomWidth: 1.2,
    color: COLORS.primaryDark,
    borderColor: COLORS.primaryDark,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    backgroundColor: COLORS.white,
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  dropDownUnderLine: {
    paddingHorizontal: 10,
    height: 50,
    width: '100%',
    alignSelf: 'center',
    borderBottomWidth: 1.2,
    color: COLORS.primaryDark,
    borderColor: COLORS.primaryDark,
    padding: 12,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 17,
    color: COLORS.primaryDark,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: COLORS.black,
  },
  iconStyle: {
    width: 20,
    height: 20,
    tintColor: COLORS.primaryDark,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: COLORS.primaryDark,
    borderWidth: 1,
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
    color: COLORS.primaryDark,
  },
});
