import React from 'react'
import LoaderKit from 'react-native-loader-kit'
import { View } from 'react-native'
import { commonStyle } from '../styles/commonStyle'
import { COLORS } from '../utils/colors'
export const Loader = () => {
    return (
      <View style={commonStyle.container}>
    <LoaderKit
    style={{ width: 50, height: 50,justifyContent:'center',alignItems:'center' }}
    name={'BallPulse'} 
    color={COLORS.primaryDark}
            />
            </View>
  )
}
