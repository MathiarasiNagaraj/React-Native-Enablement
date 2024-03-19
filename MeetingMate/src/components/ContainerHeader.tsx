import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TITLE, VIEW_ALL } from '../messages/appMessage'
import { COLORS } from '../utils/colors'




export default function ContainerHeader({title,onViewAllHandler}) {
  return (
    <View style={styles.wrapper}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.underLineText} onPress={onViewAllHandler}>
      {VIEW_ALL}
    </Text>
  </View>
  )
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 35,
        paddingVertical: '5%',
        alignItems: 'center',
      },
      title: {
        fontSize: 20,
        color: COLORS.primaryDark,
        fontWeight: '600',
    },
    underLineText: {
        textDecorationLine: 'underline',
        color: COLORS.primaryDark,
        fontWeight: '500',
      },
})