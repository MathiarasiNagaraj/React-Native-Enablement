import React from 'react';
import Modal from 'react-native-modal';
import {StyleSheet, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../utils/colors';

interface ModalComponentProps {
  isVisible: boolean;
  component: React.ReactNode;
  closeModal: () => void;
}
/**
 * @description Modal Component 
 * @param closeModal event handler  for close 
 * @param component  component to display in Modal
 * @param  isVisible  flag for displayig modal
 * @returns Modal component 
 */
const ModalComponent: React.FC<ModalComponentProps> = ({
  isVisible,
  component,
  closeModal,
}) => {
  return (
    <Modal animationIn="bounceInUp" isVisible={isVisible}>
      <View
        style={styles.container}>
        <MaterialCommunityIcons
          name="close-circle"
          size={22}
          style={styles.closeIcon}
          onPress={closeModal}
        />
        {component}
      </View>
    </Modal>
  );
};

export default ModalComponent;

export const styles = StyleSheet.create({
  container:{
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  closeIcon: {
    position: 'absolute',
    top: 5,
    right: 30,
    zIndex: 2,
    color:COLORS.primaryDark
  }
})