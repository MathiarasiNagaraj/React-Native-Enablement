import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {LinearGradientContainer} from '../containers/LinearGradientContainer';
import {COLORS} from '../utils/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import CheckBoxInput from '../components/CheckBoxInput';
import {RoomDetails} from '../components/RoomDetailCard';
import {readAllRoomsByBranch} from '../services/firestore';
import {filterByName, filterByOptions} from '../utils/commonUtils';
import {useRecoilValue} from 'recoil';
import {User} from '../store/atom/userAtom';
import {getData} from '../services/asyncStorage';
export const SearchRoomsScreen = () => {
  const navigation = useNavigation();
  const onGoBackHandler = () => {
    navigation.goBack();
  };
  const [checkboxState, setCheckboxState] = React.useState(false);
  const [rooms, setRooms] = useState([]);
  const [roomOptions, setRoomOptions] = useState([]);

  useEffect(() => {
    const getRooms = async () => {
      const user = await getData('user');
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
  const onOptionChangeHandler = ({name, value}) => {
    if (value) {
      const filteredData = filterByOptions(rooms, name);
      setRoomOptions(filteredData);
    }
    else {
      setRoomOptions(rooms)
    }
  };
  return (
    <LinearGradientContainer>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="arrow-left"
          color={COLORS.white}
          size={25}
        
          onPress={onGoBackHandler}
        />
        <TextInput
          placeholderTextColor={COLORS.white}
          style={styles.txtInput}
          onChangeText={onTextChangeHandler}
          placeholder={'Search Rooms'}
        />
      </View>
      <View style={styles.wrapper}>
        <CheckBoxInput
          name={'availability'}
          placeholder={'Available Now'}
          onChange={onOptionChangeHandler}
        />

        <CheckBoxInput
          name={'monitorAvailability'}
          placeholder={'Monitor Availability'}
          onChange={onOptionChangeHandler}
        />
        <CheckBoxInput
          name={'maxLimits'}
          placeholder={'Maxlimit  > 20'}
          onChange={onOptionChangeHandler}
        />
        <CheckBoxInput
          name={'boardAvailability'}
          placeholder={'Board Availablity'}
          onChange={onOptionChangeHandler}
        />
      </View>

      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{padding: 20, justifyContent: 'center'}}
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
    color: COLORS.white,
    backgroundColor: COLORS.transparent,
    borderWidth:1.5,
    borderColor: COLORS.white,
    borderRadius: 50,
    fontSize: 20,
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
