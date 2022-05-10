import React, { useRef, useState } from 'react';
import { Button, StyleSheet, Text, View, Linking, Platform, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Hyperlink from 'react-native-hyperlink';
import { SafeAreaView } from 'react-native-safe-area-context';

import MapView from 'react-native-map-clustering';
import { Callout, Marker, Region } from 'react-native-maps';
import { colors } from '../../config/config';
import { Image } from 'react-native-svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useRoute } from '@react-navigation/core';
import Menu from '../menuBottom/Menu';

type Props = {
  route: any;
  item: any;
};

export const MapDetailScreen = ({ route }) => {
  const item = route.params;

  const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
  const latLng = `${item.location.lat},${item.location.lng}`;
  const label = item.name;
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  });

  const initialRegion: Region = {
    latitude: item.location.lat,
    longitude: item.location.lng,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titre}>{item.name}</Text>
      <MapView initialRegion={initialRegion} style={styles.map} showsUserLocation={true}>
        <Marker key={item.id} coordinate={{ longitude: item.location.lng, latitude: item.location.lat }} />
      </MapView>

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
      <View style={styles.details}>
        <Text style={styles.soustitre}>INFORMATIONS</Text>
        <Text style={styles.text}>Adresse: {item.address}</Text>
        <Text style={styles.text}>Code Postal: {item.city}</Text>
        <Text style={styles.text}>ID: {item.id}</Text>
        <Text style={styles.text}>latitude: {item.location.lat}</Text>
        <Text style={styles.text}>longitude: {item.location.lng}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffff00',
  },

  titre: {
    fontSize: 17,
    color: colors.mainColor,
    marginTop:0,
    textAlign: 'center',
    padding: 6,
    backgroundColor: '#ff00ff',
  },

  text: {
    paddingLeft: 12,
    backgroundColor: '#00FFFF',
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

  details: {
    flex: 1,
  },
});
