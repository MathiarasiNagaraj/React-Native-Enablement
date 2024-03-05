import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../utils/colors';

interface LinearGradientContainerProps {
  children: React.ReactNode;
}
/**
 * @description Linear gradient wrapper component apply linear gradient background color
 * @param children children component that will have linear gradient wrapper
 * @returns  linear gradient wrapped component
 */
export const LinearGradientContainer: React.FC<LinearGradientContainerProps> = ({
  children,
}) => {
  return (
    <LinearGradient colors={[COLORS.primaryLinear,COLORS.secondaryLinear]} style={{flex: 1}}>
      {children}
    </LinearGradient>
  );
};
