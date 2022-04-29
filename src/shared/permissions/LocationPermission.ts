import { PermissionsAndroid, Platform } from 'react-native';
import { PERMISSIONS, request } from 'react-native-permissions';

export const checkLocationPermission = (required: boolean = true) => {
  return new Promise<boolean>(resolve => {
    if (Platform.OS === 'android' && Platform.Version < 23) {
      resolve(true);
    } else if (Platform.OS === 'ios') {
      request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(res => {
        resolve(res === 'granted');
      });
    } else {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(granted => {
        if (granted) {
          resolve(true);
        } else if (required) {
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(result => {
            resolve(result === PermissionsAndroid.RESULTS.GRANTED);
          });
        }
      });
    }
  });
};
