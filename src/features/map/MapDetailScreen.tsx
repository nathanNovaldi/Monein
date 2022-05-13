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

import SY_RENDRE_ICON from './icons/picto-sy-rendre.svg';
import PUCE_ICON from './icons/puce.svg';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { ScrollView } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
import { BackgroundImage } from 'react-native-elements/dist/config';

type Props = {
  route: any;
  item: any;
};

export const MapDetailScreen = ({ route }) => {
  const item = route.params;

  const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
  const latLng = `${item.lat},${item.lng}`;
  const label = item.title;
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  });

  const initialRegion: Region = {
    latitude: item.lat,
    longitude: item.lng,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titre}>{item.category}</Text>
      <MapView initialRegion={initialRegion} style={styles.map} showsUserLocation={true}>
        <Marker key={item.id} coordinate={{ longitude: item.lng, latitude: item.lat }}>
          <FontAwesome5Icon name="map-marker-alt" size={30} color="#1C7069" style={styles.marker} />
        </Marker>
      </MapView>

      <View style={styles.menu}>
        <TouchableOpacity
          style={styles.bouton}
          onPress={() => {
            Linking.openURL(url);
          }}
        >
          <View style={styles.buttonStyle}>
            <SY_RENDRE_ICON style={{ width: 30, height: 30 }} />
          </View>

          <Text style={{ color: colors.mainColor }}>S'Y RENDRE</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.details}>
        <Text style={styles.soustitre}>INFORMATIONS</Text>
        <View style={styles.ligne}>
          <PUCE_ICON fill="#1C7368" />
          <Text style={styles.text}>Adresse: {item.body.replace(/(<([^>]+)>)/gi, '')}</Text>
        </View>
        <View style={styles.ligne}>
          <PUCE_ICON fill="#1C7368" />
          <Text style={styles.text}>Code Postal: {item.city}</Text>
        </View>
        <View style={styles.ligne}>
          <PUCE_ICON fill="#1C7368" />
          <Text style={styles.text}>ID: {item.id}</Text>
        </View>
        <View
          style={{
            borderBottomColor: '#1C7368',
            borderBottomWidth: 0.25,
            marginTop: 6,
            marginLeft: 13,
            marginRight: 13,
            opacity: 0.7,
          }}
        />
        <View style={styles.ligne}>
          <PUCE_ICON fill="#1C7368" />
          <Text style={styles.text}>latitude: {item.lat}</Text>
        </View>
        <View style={styles.ligne}>
          <PUCE_ICON fill="#1C7368" />
          <Text style={styles.text}>longitude: {item.lng}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },

  titre: {
    fontSize: 17,
    color: colors.mainColor,
    marginTop: 0,
    textAlign: 'center',
    padding: 6,
  },

  text: {},

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
    backgroundColor: '#EDEDED',
    padding: 6,
    fontSize: 15,
    paddingLeft: 12,
  },

  bouton: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
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

  buttonStyle: {
    backgroundColor: colors.btn_background,
    borderWidth: 1,
    borderColor: colors.mainColor,
    borderRadius: 4,
    padding: 7,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 7,
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: colors.darkGrey,
  },

  ligne: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginLeft: 10,
  },
});
