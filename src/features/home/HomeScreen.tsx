import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerActions, DrawerNavigationState, NavigationContainer, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { View } from 'react-native-interactable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { openDrawer } from 'react-navigation-drawer/lib/typescript/src/routers/DrawerActions';
import { RootStackParams } from '../../App';
import { colors, HOME_LAYOUT } from '../../config/config';
import { NewsSlideShow } from '../news/component/NewsSlideShow';
import { newsStore } from '../news/NewsStore';
import { HomeButtonsList } from './component/HomeButtonsList';
import { NewsListScreen } from '../news/ActuScreen';
import { AgendaScreen } from '../agenda/AgendaScreen';
import { MapScreen } from '../map/MapScreen';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Menu from '../menuBottom/Menu';

export const HomeScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    newsStore.fetchIfNeeded();
  });

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerBackButtonMenuEnabled: false,
      headerBackVisible: false,
      headerRight: () => (
        <SimpleLineIcons
          name="bell"
          size={20}
          color="#000000"
          style={styles.notification}
          onPress={() => {
            navigation.navigate('notification');
          }}
        />
      ),
    });
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {newsStore && <NewsSlideShow newsStore={newsStore} />}
        <HomeButtonsList buttonsList={HOME_LAYOUT} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  notification: {},
});
