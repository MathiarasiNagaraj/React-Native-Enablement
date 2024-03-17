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
          // itemContainerStyle={{backgroundColor: COLORS.transparent}}
          itemTextStyle={{color: COLORS.black}}
          itemContainerStyle={{
            backgroundColor: COLORS.white,
            borderTopColor: COLORS.greyShadeSecondary,
            borderTopWidth: 0.4,
          }}
          activeColor={COLORS.tertiaryLight}
          containerStyle={styles.listStyle}
          placeholderStyle={styles.placeholderStyle}
          selectedStyle={styles.selectedView}
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
        <MultiSelect
          style={styles[style]}
          placeholderStyle={styles.placeholderStyle}
          containerStyle={styles.listStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={optionList}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          value={selected}
          search
          itemTextStyle={{color: COLORS.black}}
          itemContainerStyle={{
            backgroundColor: COLORS.white,
            borderTopColor: COLORS.greyShadeSecondary,
            borderTopWidth: 0.4,
          }}
          searchPlaceholder={placeholder}
          onChange={item => {
            setSelected(item);
            onChange({name: name, value: item});
          }}
          activeColor={COLORS.tertiaryLight}
          renderSelectedItem={(item, unSelect) =>
            value || selected ? (
              <TouchableOpacity
                onPress={() => unSelect && unSelect(item)}
                style={styles.selectedContainer}>
                <View style={styles.selectedStyle}>
                  <Text style={styles.textSelectedStyle}>{item.label}</Text>
                  <MaterialCommunityIcons
                    name="close"
                    size={15}
                    color={COLORS.primaryDark}
                  />
                </View>
              </TouchableOpacity>
            ) : (
              <></>
            )
          }
        />
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
    paddingHorizontal: 20,
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
  listStyle: {
    backgroundColor: COLORS.white,
  },
  placeholderStyle: {
    fontSize: 17,
    color: COLORS.primaryDark,
  },
  selectedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  selectedView: {
    backgroundColor: COLORS.primaryDark,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: COLORS.primaryDark,
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
    alignItems: 'center',
    borderRadius: 20,
    borderColor: COLORS.primaryDark,
    borderWidth: 1,
    shadowColor: '#000',
    gap: 10,
    marginVertical:3,
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 5,
  },
  textSelectedStyle: {
    fontSize: 15,
    color: COLORS.primaryDark,
    textAlign: 'center',
  },
});
