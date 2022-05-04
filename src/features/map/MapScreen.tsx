import Geolocation from '@react-native-community/geolocation';
import { useNavigation } from '@react-navigation/native';
import { inject, observer } from 'mobx-react';
import React, { useRef, useState } from 'react';
import { Appearance, SafeAreaView, StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import MapView from 'react-native-map-clustering';
import { Callout, Geojson, Marker, Region } from 'react-native-maps';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../config/config';
import { checkLocationPermission } from '../../shared/permissions/LocationPermission';
import { WINDOW_WIDTH } from '../../shared/Variables';
import { AgendaStore } from '../agenda/AgendaStore';
import { RecyclingStore } from '../recycling/RecyclingStore';
import { ModalFilter } from './component/ModalFilter';
import { Card, ListItem, Button, Icon, CheckBox } from 'react-native-elements';
import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type Props = {
  agendaStore: AgendaStore;
  recyclingStore: RecyclingStore;
};

// export const data: any = {};

export const MapScreen = inject(
  'agendaStore',
  'recyclingStore',
)(
  observer((props: Props) => {
    const stores = Object.entries(props)
      .filter(prop => {
        return prop[0].includes('Store');
      })
      .map(store => store[1]);

    const [overlayFilter, setOverlayFilter] = useState<boolean>(false);
    const isDarkMode = Appearance.getColorScheme() === 'dark';
    const mapView = useRef(null);

    const navigation = useNavigation();

    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <FontAwesome5
            name="filter"
            size={20}
            color={colors.navBarIconColor}
            style={styles.filterIcon}
            onPress={() => {
              setOverlayFilter(true);
            }}
          />
        ),
      });
    });

    const initialRegion: Region = {
      latitude: 43.29152762842413,
      longitude: -0.5658887808057648,
      latitudeDelta: 0.2,
      longitudeDelta: 0.2,
    };

    const laPlace = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: [64.165329, 48.844287],
          },
        },
      ],
    };

    const goToUserLocation = () => {
      checkLocationPermission(true).then(res =>
        res
          ? Geolocation.getCurrentPosition(info => {
              if (mapView && mapView.current) {
                mapView.current.animateCamera(
                  {
                    center: {
                      latitude: info.coords.latitude,
                      longitude: info.coords.longitude,
                    },
                    altitude: 10000,
                    zoom: 10,
                  },
                  { duration: 2000 },
                );
              }
            })
          : null,
      );
    };

    // permet de centrer la carte sur sa localisation
    // goToUserLocation();

    return (
      <SafeAreaView style={styles.container}>
        <ModalFilter showOverlay={overlayFilter} onOverlayChange={setOverlayFilter} stores={stores} />
        <MapView
          ref={mapView}
          initialRegion={initialRegion}
          style={styles.map}
          showsUserLocation={true}
          compassOffset={{ x: -WINDOW_WIDTH + 60, y: 20 }}
          clusterColor={isDarkMode ? colors.lightGrey : colors.secondaryMarker}
        >
          <Geojson geojson={laPlace} strokeColor="red" fillColor="green" strokeWidth={2} />
          {stores.map(store => {
            const list = Object.values(store)[0];
            console.log(list);
            return list.map((item: any) => {
              if (!item.location) {
                return null;
              }

              return (
                <Marker
                  key={item.id}
                  coordinate={{ longitude: item.location.lng, latitude: item.location.lat }}
                  onPress={() => {
                    mapView.current.animateCamera(
                      {
                        center: {
                          latitude: item.location.lat,
                          longitude: item.location.lng,
                        },
                        altitude: 10000,
                        zoom: 10,
                      },
                      { duration: 1000 },
                    );
                  }}
                >
                  <MaterialCommunityIcons
                    name="map-marker"
                    size={40}
                    color={isDarkMode ? colors.lightGrey : colors.secondaryMarker}
                  />
                  <Callout
                    tooltip
                    onPress={() => {
                      console.log('--------item--------');
                      console.log(item);
                      navigation.navigate('MapDetail', item);
                    }}
                  >
                    <View>
                      <View style={styles.bubble}>
                        <Text style={styles.name}>{item.name}</Text>
                      </View>
                      <View style={styles.arrowBorder} />
                      <View style={styles.arrow} />
                    </View>
                  </Callout>
                </Marker>
              );
            });
          })}
        </MapView>
        <TouchableOpacity style={styles.myLocationContainer} onPress={() => goToUserLocation()}>
          <MaterialIcons name="my-location" size={32} color={colors.mainColor} style={styles.myLocation} />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }),
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'flex-start',
  },

  bubble: {
    flexDirection: 'column',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 150,
    justifyContent: 'center',
  },

  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },

  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
  },

  name: {
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },

  filterIcon: {
    marginRight: 25,
  },
  map: {
    flex: 1,
  },
  myLocationContainer: {
    position: 'absolute',
    top: 410,
    right: 15,
    zIndex: 2,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 30,
    shadowColor: 'black',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  myLocationContainer2: {
    position: 'absolute',
    top: 300,
    right: 15,
    zIndex: 2,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 30,
    shadowColor: 'black',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  myLocation: {
    opacity: 0.7,
    shadowColor: 'black',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
});
