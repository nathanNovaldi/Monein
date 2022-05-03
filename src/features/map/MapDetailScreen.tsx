import React, { useRef, useState } from 'react';
import { Button, StyleSheet, Text, View, Linking, Platform, TouchableOpacity } from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import MapView from 'react-native-map-clustering';
import { Callout, Marker, Region } from 'react-native-maps';
import { colors } from '../../config/config';
import { Image } from 'react-native-svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
const latLng = `${43.48449522948275},${-1.5591772348331687}`;
const label = 'Custom Label';
const url = Platform.select({
  ios: `${scheme}${label}@${latLng}`,
  android: `${scheme}${latLng}(${label})`,
});

const initialRegion: Region = {
  latitude: 46.5,
  longitude: 2,
  latitudeDelta: 12,
  longitudeDelta: 12,
};

export const MapDetailScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Emplacement pour Personne à Mobilité Réduite</Text>
      <MapView initialRegion={initialRegion} style={styles.map} showsUserLocation={true} />

      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.bouton}
          onPress={() => {
            Linking.openURL(url);
          }}
        >
          <MaterialIcons name="map" size={32} color={colors.mainColor} style={styles.googleMaps} />
          <Text>S'Y RENDRE</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.soustitre}>INFORMATIONS</Text>
      <Text style={styles.text}>Détails sur le marqueur</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },

  titre: {
    fontSize: 17,
    color: colors.mainColor,
    textAlign: 'center',
    padding: 6,
  },

  text: {
    padding: 12,
  },

  map: {
    backgroundColor: '#55771D',
    height: 175,
    justifyContent: 'center',
    alignItems: 'center',
  },

  menu: {
    height: 75,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  soustitre: {
    backgroundColor: '#E3E3E4',
    padding: 6,
    fontSize: 15,
    paddingLeft: 12,
  },

  bouton: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  googleMaps: {
    opacity: 0.7,
    shadowColor: 'black',
    alignItems: 'center',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
});
