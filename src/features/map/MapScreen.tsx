import Geolocation from '@react-native-community/geolocation';
import { useNavigation } from '@react-navigation/native';
import { inject, observer } from 'mobx-react';
import React, { useRef, useState } from 'react';
import { Appearance, SafeAreaView, StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import MapView from 'react-native-map-clustering';
import { Marker, Region } from 'react-native-maps';
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

type Props = {
  agendaStore: AgendaStore;
  recyclingStore: RecyclingStore;
};

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
            color={colors.background}
            style={styles.filterIcon}
            onPress={() => {
              setOverlayFilter(true);
            }}
          />
        ),
      });
    });

    const initialRegion: Region = {
      latitude: 46.5,
      longitude: 2,
      latitudeDelta: 12,
      longitudeDelta: 12,
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

    goToUserLocation();

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
          {stores.map(store => {
            const list = Object.values(store)[0];
            return list.map((item: any) => {
              if (!item.location) {
                return null;
              }

              return (
                <Marker key={item.id} coordinate={{ longitude: item.location.lng, latitude: item.location.lat }}>
                  <MaterialCommunityIcons
                    name="map-marker"
                    size={40}
                    color={isDarkMode ? colors.lightGrey : colors.secondaryMarker}
                  />
                </Marker>
              );
            });
          })}
        </MapView>
        <TouchableOpacity style={styles.myLocationContainer} onPress={() => goToUserLocation()}>
          <MaterialIcons name="my-location" size={32} color={colors.mainColor} style={styles.myLocation} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.myLocationContainer2} onPress={() => goToUserLocation()}>
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
  filterIcon: {
    marginRight: 25,
  },
  map: {
    flex: 1,
  },
  myLocationContainer: {
    position: 'absolute',
    top: 10,
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
