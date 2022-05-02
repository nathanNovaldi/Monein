import React from 'react';
import { Button, StyleSheet, Text, View, Linking } from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import { SafeAreaView } from 'react-native-safe-area-context';

export const MapSimpleScreen = () => {
  return <Text>La map avec un seul marqueur</Text>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
  titre: {
    fontSize: 30,
  },
  page: {
    padding: 10,
  },
  paragraphe: {
    padding: 10,
  },
});
