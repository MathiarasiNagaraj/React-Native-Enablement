import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Rooms} from '../interfaces/commonInterface';
import {COLORS} from '../utils/colors';

interface RoomListItemProps {
  room: Rooms;
  onPressHandler: (room: Rooms) => void;
}

const RoomListItem: React.FC<RoomListItemProps> = ({ room, onPressHandler }) => {
    
  return (
    <Pressable style={styles.wrapper} onPress={() => onPressHandler(room)}>
      <Text style={styles.text}>{room.name}</Text>
    </Pressable>
  );
};

export default RoomListItem;
const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 20,
  },
  text: {
    color: COLORS.primaryDark,
    fontSize: 20,
    textAlign: 'center',
    padding: 15,
  },
});
