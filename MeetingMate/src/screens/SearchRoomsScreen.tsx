import React, {useState} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {LinearGradientContainer} from '../containers/LinearGradientContainer';
import {COLORS} from '../utils/colors';
import {useNavigation} from '@react-navigation/native';
import {RoomDetails} from '../components/RoomDetailCard';
import {filterByName, filterByOptions} from '../utils/commonUtils';
import {FILTERS, SCREEN_NAMES} from '../constants/appConstant';
import {useRecoilState} from 'recoil';
import {Room} from '../store/atom/roomAtom';
import {Rooms} from '../interfaces/commonInterface';
import ScreenHeader from '../components/ScreenHeader';
export const SearchRoomsScreen = () => {
  const navigation = useNavigation();

  const [rooms, setRooms] = useRecoilState<Rooms[]>(Room);
  const [roomOptions, setRoomOptions] = useState(rooms);

  const onTextChangeHandler = (text: string) => {
    const filteredData = filterByName(rooms, text);
    setRoomOptions(filteredData);
  };
  const onOptionChangeHandler = (name: string, value: boolean) => {
    if (value) {
      const filteredData = filterByOptions(rooms, name);
      setRoomOptions(filteredData);
    } else {
      setRoomOptions(rooms);
    }
  };
  const filters = FILTERS.map(filter => (
    <TouchableOpacity
      onPress={() => onOptionChangeHandler(filter.filterName, true)}
      style={styles.filter}
      key={filter.name}>
      <Text style={styles.filterText}>{filter.name}</Text>
    </TouchableOpacity>
  ));

  return (
    <View style={styles.fullWrapper}>
      <ScreenHeader
        title={SCREEN_NAMES.SEARCH}
        style={'wrapper'}
        iconStyle={'icon'}
      />
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.optionContainer}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {filters}
      </ScrollView>

      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
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
    </View>
  );
};

const styles = StyleSheet.create({
  fullWrapper: {
    flex: 1,
  },
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
    borderWidth: 1.5,
    borderColor: COLORS.white,
    borderRadius: 50,
    fontSize: 20,
    elevation: 10,
  },
  container: {
    padding: 20,
  },
  filter: {
    backgroundColor: COLORS.primaryDark,
    padding: 10,

    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 10,
  },
  optionContainer: {
    height: 50,
    marginVertical: 7,
  },
  filterText: {
    fontSize: 15,
    alignItems: 'center',
    color: COLORS.white,
    fontWeight: '500',
    justifyContent: 'center',
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
