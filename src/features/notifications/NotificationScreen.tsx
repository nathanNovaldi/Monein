import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { oneSignalSubscription, setItemAsyncStorage } from './utils';
import { fonts } from '../../shared/theme/fonts';
import { CustomCheckBox, CheckBoxT, checkboxes } from './components/checkbox';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../shared/Variables';
import Log from '../../shared/Log';
import { colors } from '../../config/config';
import Menu from '../menuBottom/Menu';

// Tips and tricks: ici on peux utilise getTags au lieu de set les notifications dans l'asyncstorage
// https://documentation.onesignal.com/docs/react-native-sdk#section-sending-and-getting-onesignal-tags

const NotificationsScreen: React.FC = () => {
  const [selectedItems, setSelectedCheckbox] = useState<CheckBoxT[]>([]);

  // Get ntofiications selected from async storage
  const getNotifsFromAsyncStorage = async () => {
    try {
      const notifications = await AsyncStorage.getItem('@notifications');
      if (notifications !== null) {
        setSelectedCheckbox(JSON.parse(notifications));
      } else {
        setItemAsyncStorage('@notifications', checkboxes);
        setSelectedCheckbox(checkboxes);
        for (let i = 0; i < checkboxes.length; ++i) {
          await oneSignalSubscription(checkboxes[i], true);
        }
      }
    } catch (e) {
      Log.d('Notifications', '🚀: getNotifsFromAsyncStorage -> e', e);
    }
  };
  useEffect(() => {
    getNotifsFromAsyncStorage();
  }, []);

  const handleCheckboxSelection = async (checkbox: CheckBoxT) => {
    // Check if checkbox is selected
    const isCheckboxSelected = selectedItems.some(x => x.title === checkbox.title);
    // If checkbox is selected delete the checkbox from array and from onesignal
    // else add checkbox to the array and to onesignal
    if (isCheckboxSelected) {
      const deleteFromSelection = selectedItems.filter(x => x.title !== checkbox.title);
      const send = await oneSignalSubscription(checkbox, false, true);
      if (send) {
        setItemAsyncStorage('@notifications', deleteFromSelection);
        setSelectedCheckbox(deleteFromSelection);
      }
    } else {
      const addedCheckbox = selectedItems.concat(checkbox);
      const send = await oneSignalSubscription(checkbox, true, true);
      if (send) {
        setItemAsyncStorage('@notifications', addedCheckbox);
        setSelectedCheckbox(addedCheckbox);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.mainView}>
        <Text style={styles.pageTitle}>Notifications</Text>
        <Text style={styles.text}>Quelles notifications souhaitez-vous recevoir ?</Text>
        <CustomCheckBox handleCheckboxSelection={handleCheckboxSelection} selectedItems={selectedItems} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Math.min(SCREEN_HEIGHT, SCREEN_WIDTH) * 0.04,
    paddingHorizontal: 26,
  },
  pageTitle: {
    fontFamily: fonts.bold,
    fontSize: Math.max(SCREEN_HEIGHT, SCREEN_WIDTH) * 0.045,
    marginBottom: Math.max(SCREEN_HEIGHT, SCREEN_WIDTH) * 0.018,
  },
  text: {
    marginBottom: Math.max(SCREEN_HEIGHT, SCREEN_WIDTH) * 0.06,
    fontFamily: fonts.regular,
    fontSize: Math.max(SCREEN_HEIGHT, SCREEN_WIDTH) * 0.025,
  },
});
