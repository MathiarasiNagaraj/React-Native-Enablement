import {useRoute} from '@react-navigation/native';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { COLORS } from '../utils/colors';
export const RoomBookingScreen = () => {
  const route = useRoute();
  const {room} = route.params;
console.log(room.availability==true)
  return (
      <ScrollView contentContainerStyle={styles.container}>
          <View style={ [ styles.box,{ backgroundColor: room.availability == true ? COLORS.green : COLORS.red }]}>
          <QRCode value={room.id} size={100} />
          </View>
          <View>
              <Text>Today Meeting of {room.name}</Text>
              
          </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    },
    box: {
        width: '100%',
        height:'40%',
        justifyContent: 'center',
        alignItems: 'center',
        
    }
});
