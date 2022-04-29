import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Linking, Platform } from 'react-native';
import OneSignal from 'react-native-onesignal';
import Log from '../../shared/Log';
import { CheckBoxT } from './components/checkbox';

// Fonction pour ouvrir les settings de l'app actuelle
export const openAppSettings = () => {
  Linking.canOpenURL('app-settings:')
    .then(supported => {
      if (!supported) {
        Log.d('Notifications', "Erreur dans l'url... 🤔");
      } else {
        return Linking.openURL('app-settings:');
      }
    })
    .catch(err => Log.e('Notifications', `Erreur dans l'ouverture des paramètres`, err));
};

// Function pour afficher une pop up one signal
export const customOneSignalAlertPopUp = (appName: string) => {
  Alert.alert(
    'Notifications non autorisées',
    `Pour recevoir les notifications, veuillez autorisées les notifications dans les réglages de l'application.`,
    [
      {
        text: 'Retour',
        style: 'cancel',
      },
      { text: `Réglages de ${appName}`, onPress: () => openAppSettings() },
    ],
    { cancelable: false },
  );
};

// Set item to async storage
export const setItemAsyncStorage = async (key: string, item: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    Log.d('Notifications', '🚀: setItemAsyncStorage -> error', error);
  }
};

// Function to handle one signal notifications send
export const oneSignalSubscription = (checkbox: CheckBoxT, bool: boolean, force?: boolean) => {
  return new Promise(resolve => {
    OneSignal.getDeviceState().then((deviceState: any) => {
      Log.d('Notifications', 'playerID : ', deviceState.userId);

      if (deviceState.hasNotificationPermission) {
        Log.d('Notifications', 'Send tag : ' + checkbox.tagname + ' - ' + bool);

        OneSignal.sendTag(checkbox.tagname, String(bool ? true : false));
        resolve(true);
      } else {
        if (Platform.OS === 'ios') {
          OneSignal.promptForPushNotificationsWithUserResponse(response => {
            if (!response) {
              Log.d('Notifications', 'Wait tag : ' + checkbox.tagname + ' - ' + bool);

              if (force) {
                customOneSignalAlertPopUp('Golf Planète');
              }
              resolve(false);
            } else {
              Log.d('Notifications', 'Send tag ios : ' + checkbox.tagname + ' - ' + bool);

              OneSignal.sendTag(checkbox.tagname, String(bool ? true : false));
              resolve(true);
            }
          });
        } else {
          Log.d('Notifications', 'Nothing to do');

          resolve(false);
        }
      }
    });
  });
};
