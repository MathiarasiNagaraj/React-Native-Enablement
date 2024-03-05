import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../utils/colors';



interface FloatingButtonProps{
  onPress: () => void,

}
/**
 * @description Floating button component 
 * @param onPress onpress event handler pointer 
 * @param Component child component for button Icon
 * @return floating button component
 */
const FloatingButton :React.FC<FloatingButtonProps>= ({onPress,component}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <MaterialCommunityIcons name="plus" size={30} color={COLORS.white} />
    </TouchableOpacity>
  );
};

export default FloatingButton;
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    position: 'absolute',
    bottom: 20,
    right: 20,
    height: 60,
    borderRadius:100,
    backgroundColor: COLORS.primaryDark,
  },
});
