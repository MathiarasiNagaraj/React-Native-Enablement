import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {LinearGradientContainer} from '../containers/LinearGradientContainer';
import {COLORS} from '../utils/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {RoomDetails} from '../components/RoomDetailCard';
import {readAllRoomsByBranch} from '../services/firestore';
import {filterByName, filterByOptions} from '../utils/commonUtils';
import {getLocalDataByKey} from '../services/asyncStorage';
import { ASYNC_STORE_KEY, FILTERS } from '../constants/appConstant';
export const SearchRoomsScreen = () => {
  const navigation = useNavigation();
  const onGoBackHandler = () => {
    navigation.goBack();
  };
 
  const [rooms, setRooms] = useState([]);
  const [roomOptions, setRoomOptions] = useState([]);

  useEffect(() => {
    const getRooms = async () => {
      const user = await getLocalDataByKey(ASYNC_STORE_KEY.USER);
      const data = await readAllRoomsByBranch(user.location);
      setRooms(data);
      setRoomOptions(data);
    };
    getRooms();
  }, []);
  const onTextChangeHandler = text => {
    const filteredData = filterByName(rooms, text);
    setRoomOptions(filteredData);
  };
  const onOptionChangeHandler = (name, value) => {
    if (value) {
      const filteredData = filterByOptions(rooms, name);
      setRoomOptions(filteredData);
    }
    else {
      setRoomOptions(rooms)
    }
  };
  const filters = FILTERS.map((filter) => 
    <TouchableOpacity onPress={() => onOptionChangeHandler( filter.filterName, true)} style={styles.filter}  key={filter.name}>
      <Text style={styles.filterText}>{filter.name}</Text>
    </TouchableOpacity>
  )
  return (
    <LinearGradientContainer>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="arrow-left"
          color={COLORS.primaryDark}
          size={25}
        
          onPress={onGoBackHandler}
        />
        <TextInput
          placeholderTextColor={COLORS.primaryDark}
          style={styles.txtInput}
          onChangeText={onTextChangeHandler}
          placeholder={'Search Rooms'}
        />
      </View>
      <ScrollView horizontal={true} style={styles.container} showsHorizontalScrollIndicator={false}>
{filters}
      </ScrollView>
     

      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{padding: 20}}
        ItemSeparatorComponent={() => <View style={{height: 15}} />}
        data={roomOptions}
        renderItem={({item}) => (
          <RoomDetails
            key={item.id}
            details={item}
            style={'cardFullContainer'}
          />
        )}
        keyExtractor={item => item.name}
      />
    </LinearGradientContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 15,
    paddingVertical: 30,
    paddingHorizontal: 10,
  },
  txtInput: {
    width: '85%',
    height: 50,
    paddingLeft: 20,
    color: COLORS.primaryDark,
    backgroundColor: COLORS.white,
    borderWidth:1.5,
    borderColor: COLORS.white,
    borderRadius: 50,
    fontSize: 20,
    elevation:10
  },
  container: {

  },
  filter: {
    backgroundColor: COLORS.primaryDark,
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    maxHeight: 45,

  },
  filterText: {
    fontSize: 15,
    alignItems:'center',
    color: COLORS.white,
    fontWeight: '500',
    justifyContent: 'center',
height:30
  },
  wrapper: {
    flexDirection: 'row',
    columnGap: 50,
    padding: 5,
    paddingVertical: 10,
    backgroundColor: COLORS.transparent,

    borderColor: COLORS.whiteSmoke,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    rowGap: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
});
