import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ACCOUNT, HIDE_PASSWORD } from '../messages/appMessage'
import { COLORS } from '../utils/colors'

export default function AccountDetailsContainer({user}) {
  return (

    <View style={styles.wrapper}>
    <Text style={styles.title}>{ACCOUNT.EMAIL}</Text>
    <Text style={styles.text}>{user.email}</Text>

    <Text style={styles.title}>{ACCOUNT.PASSWORD}</Text>
    <Text style={styles.text}>{HIDE_PASSWORD}</Text>

    <Text style={styles.title}>{ACCOUNT.LOCATION}</Text>
    <Text style={styles.text}>{user.location}</Text>
  </View>
  )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',

    },
    title: {
        color: COLORS.greyShadeTertiary,
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'left',
        alignSelf: 'flex-start',
        marginTop: 30,
      },
      text: {
        width: '100%',
        color: COLORS.primaryDark,
        fontSize: 17,
        fontWeight: '400',
        textAlign: 'left',
        marginTop: 10,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderColor: COLORS.black,
        alignSelf: 'flex-start',
      },
})