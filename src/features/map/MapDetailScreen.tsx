import React from 'react';
import { Button, StyleSheet, Text, View, Linking, Platform } from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
const latLng = `${43.48449522948275},${-1.5591772348331687}`;
const label = 'Custom Label';
const url = Platform.select({
  ios: `${scheme}${label}@${latLng}`,
  android: `${scheme}${latLng}(${label})`,
});

export const MapDetailScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Emplacement pour Personne à Mobilité Réduite</Text>
      <View style={styles.map}>
        <Text style={{ fontSize: 23 }}>La carte</Text>
      </View>

      <View style={styles.menu}>
        <Button style={styles.bouton} title="Press me" onPress={() => navigation.navigate('MapSimple')} />
        <Button title="Press moi" onPress={() => Linking.openURL(url)} />
      </View>
      <Text style={styles.soustitre}>INFORMATIONS</Text>
      <Text>Détails sur le marqueur</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9BCD47',
    justifyContent: 'flex-start',
  },

  titre: {
    fontSize: 17,
    backgroundColor: '#1E6738',
    textAlign: 'center',
    padding: 6,
  },

  map: {
    backgroundColor: '#55771D',
    height: 175,
    justifyContent: 'center',
    alignItems: 'center',
  },

  menu: {
    backgroundColor: '#26CB80',
    height: 75,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  soustitre: {
    backgroundColor: '#1D81B0',
    padding: 5,
    fontSize: 15,
    paddingLeft: 11,
  },

  bouton: {
    width: 100,
    height: 100,
    backgroundColor: '#1D81B0',
    padding: 5,
    fontSize: 15,
    paddingLeft: 11,
  },
});
