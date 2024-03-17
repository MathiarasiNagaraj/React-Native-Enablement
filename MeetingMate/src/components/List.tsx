import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../utils/colors';

export default function List({data}) {
  console.log(data);
  const memberList = data.map(member => (
    <View style={styles.row} key={member.name}>
      <Image source={{uri: member.imgUrl}} style={styles.img} />
      <Text style={styles.text}>{member.name}</Text>
    </View>
  ));
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{'Meeting Member'}</Text>
      {memberList}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width:'100%',
    backgroundColor: COLORS.white,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  text: {
    fontSize: 15,
    color: COLORS.primaryDark,
  },
    row: {
      width:280,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 5,
  },
    title: {
      
    color: COLORS.black,
    fontSize: 19,
  },
  img: {
    height: 30,
    width: 30,
    borderRadius: 100,
  },
});
