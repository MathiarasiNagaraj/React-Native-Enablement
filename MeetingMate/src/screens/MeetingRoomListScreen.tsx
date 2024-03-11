import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useRecoilState } from 'recoil'
import RoomListItem from '../components/RoomListItem'
import { SCREEN_NAMES } from '../constants/appConstant'
import { LinearGradientContainer } from '../containers/LinearGradientContainer'
import { Rooms } from '../interfaces/commonInterface'
import { Room } from '../store/atom/roomAtom'
import { COLORS } from '../utils/colors'

export const MeetingRoomListScreen = () => {
    const [rooms, setRooms] = useRecoilState(Room);
    const navigate = useNavigation<StackNavigationProp<any>>();
    const onPressHandler = (room:Rooms) => {
        navigate.navigate(SCREEN_NAMES.ROOM_QR_BOOKING,{room:room})
    }
    const roomList = <FlatList
        data={rooms}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.name}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={() => <View style={{height: 15}} />}
        renderItem={({ item }) => <RoomListItem room={item} onPressHandler={ onPressHandler} />}
    />

  return (
      <LinearGradientContainer>
          {roomList}
</LinearGradientContainer>
  )
}
const styles = StyleSheet.create({
    container: {
        width:'80%',
        justifyContent: 'center',
        alignSelf:'center',
        flex:1,

   
  
    }
});