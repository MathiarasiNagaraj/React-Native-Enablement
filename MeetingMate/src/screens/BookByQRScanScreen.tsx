import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
  useCodeScanner,
} from 'react-native-vision-camera';
import {useNavigation} from '@react-navigation/native';
import ScreenHeader from '../components/ScreenHeader';
import {ASYNC_STORE_KEY, SCREEN_NAMES} from '../constants/appConstant';
import {readAllRoomsByBranch} from '../services/MeetingServices';
import {getRoomById} from '../utils/commonUtils';
import {COLORS} from '../utils/colors';
import {StackNavigationProp} from '@react-navigation/stack';
import {getLocalDataByKey} from '../services/LocalStorageServices';
import {NO_CAMERA} from '../messages/appMessage';

/**
 * @description Booky by QR Scan app
 * @returns QR Scan app component
 */
export const BookByQRScanScreen = () => {
  const camera = useRef(null);
  const navigation = useNavigation<StackNavigationProp<any>>();
  const devices = useCameraDevice('back');
  const device = devices;
  const format = useCameraFormat(device, [{photoHdr: true}, {videoHdr: true}]);

  if (device == null) {
    return <Text>{NO_CAMERA}</Text>;
  }
  useEffect(() => {
    async function getPermission() {
      await Camera.requestCameraPermission();
    }
    getPermission();
  }, []);

  //Hook for QR code scanner
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: async codes => {
      const roomId = codes[0].value;
      const user = await getLocalDataByKey(ASYNC_STORE_KEY.USER);
      const rooms = await readAllRoomsByBranch(user.location);
      const details = getRoomById(rooms, roomId);
      navigation.navigate(SCREEN_NAMES.MEETING_ROOM, {details});
    },
  });

  return (
    <View>
      <ScreenHeader title={SCREEN_NAMES.QR_SCAN}
        style={'wrapper'}
        iconStyle={'icon'}      
      
      />
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <Camera
            ref={camera}
            codeScanner={codeScanner}
            style={{
              height: '95%',
              width: '95%',
            }}
            device={device}
            format={format}
            isActive={true}
            photo={true}
            enableZoomGesture={true}
            audio={true}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: '30%',
    alignItems: 'center',
  },

  container: {
    height: 350,
    alignSelf: 'center',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    borderRadius: 10,
    borderColor: COLORS.green,
  },
});
