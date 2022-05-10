import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Button, StyleSheet, Text, View, Linking } from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AgendaScreen } from '../agenda/AgendaScreen';
import { HomeScreen } from '../home/HomeScreen';
import { MapScreen } from '../map/MapScreen';
import { NewsListScreen } from '../news/NewsListScreen';

const DrawerNavigator = createDrawerNavigator();
export const DrawerScreen = () => {
  return (
    <NavigationContainer independent={true}>
      <DrawerNavigator.Navigator>
        <DrawerNavigator.Screen name="Home" component={HomeScreen} />
        <DrawerNavigator.Screen name="NewsList" component={NewsListScreen} />
        <DrawerNavigator.Screen name="Agenda" component={AgendaScreen} />
        <DrawerNavigator.Screen name="Map" component={MapScreen} />
      </DrawerNavigator.Navigator>
    </NavigationContainer>
  );
};
