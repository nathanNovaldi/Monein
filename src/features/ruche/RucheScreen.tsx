import React from 'react';
import { Button, StyleSheet, Text, View, Linking } from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import { SafeAreaView } from 'react-native-safe-area-context';

export const RucheScreen = () => {
  return (
    <SafeAreaView style={styles.page}>
      <Text style={styles.titre}></Text>
      <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, height: 10 }} />
      <View style={styles.paragraphe}>
        <Text
          style={{ fontSize: 15 }}
          onPress={() =>
            Linking.openURL('https://monein.beesforlife.fr/signaler-un-nid-de-frelons/formulaire-de-signalement')
          }
        >
          Cliquez ici pour signaler une ruche
        </Text>
      </View>
    </SafeAreaView>
  );
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
