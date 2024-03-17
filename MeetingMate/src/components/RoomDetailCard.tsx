import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {Rooms} from '../interfaces/commonInterface';
import {COLORS} from '../utils/colors';
import Button from './Button';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {BUTTONS, SCREEN_NAMES} from '../constants/appConstant';
import {AVAILABLITY} from '../messages/appMessage';
import {StackNavigationProp} from '@react-navigation/stack';
import IconText from './IconText';
import Tag from './Tag';
interface RoomDetailsProps {
  details: Rooms;
  style: 'wrapper' | 'cardFullContainer';
}

export const RoomDetails: React.FC<RoomDetailsProps> = ({ details, style }) => {
  
  const navigation = useNavigation<StackNavigationProp<any>>();

  //on View Schedule Click Handler
  const onViewScheduleHandler = () => {
    navigation.navigate(SCREEN_NAMES.MEETING_ROOM, {details});
  };

  return (
   
    <View style={styles[style]}>
       <Pressable onPress={()=>onViewScheduleHandler()}>
      <Image source={{uri: details.roomImg}} style={styles.cardImg} />
      <View style={styles.cardContentWrapper}>
        <Text style={styles.cardTitle}>{details.name}</Text>
        <IconText
        containerStyle={'rowContainer'}
        textStyle={'text'}
        text={`${details.location } , ${details.branch}`}
        iconName={'map-marker'}
        iconColor={COLORS.primaryDark}
        iconSize={24}
      />
        <Tag
            text={
              details.availability ? AVAILABLITY.AVAILABLE : AVAILABLITY.BUSY
            }
            textStyle={details.availability ? 'greenText' : 'redText'}
            indicatorStyle={details.availability ? 'greenRound' : 'redRound'}
          />


        <Button
          buttonDetails={BUTTONS.moreInfo}
          onPress={onViewScheduleHandler}
        />
        </View>
        </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.white,
    width: 300,
    height: '98%',
    borderRadius: 10,
    elevation: 10,
    marginBottom: 40,
  },
  cardFullContainer: {
    elevation: 10,
    backgroundColor: COLORS.white,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    height: 280,
  },
  cardTitle: {
    width: '95%',
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primaryDark,
    paddingRight: 20,
  },
  cardBoldText: {
    fontSize: 14,
    fontWeight: '900',
    paddingHorizontal:6
},
  cardImg: {
    width: '100%',
    height: '53%',
    alignSelf: 'center',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  cardContentWrapper: {
    flexWrap: 'wrap',
    gap: 3,
    width: '100%',
    paddingRight: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  statusBox: {
    position: 'absolute',
    top: -40,
    left: 20,
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    padding: 5,
    paddingLeft: 10,
    borderRadius: 5,
    width: 100,
    fontWeight: '700',
    alignItems: 'center',
    justifyContent:'center'
  },
  cardText: {
    color: COLORS.primaryDark,
    fontSize:17
  },
  round: {
    height: 10,
    width: 10,
    borderRadius: 20,
  },
  icon: {
    color:COLORS.primaryDark
  },
  iconBox: {
    flexDirection:'row'
  }
});
