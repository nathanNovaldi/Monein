import React, { useEffect, useRef, useState } from 'react';
import { Animated, Appearance, StyleSheet, TouchableOpacity, View } from 'react-native';
import MapView from 'react-native-map-clustering';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { debounce } from 'lodash';
import { inject, observer } from 'mobx-react';
import Geolocation from '@react-native-community/geolocation';
import { Marker } from 'react-native-maps';
import { colors } from '../../../config/config';
import { AgendaStore } from '../AgendaStore';
import { AgendaMapList, CLOSE_POSITION_Y, OPEN_POSITION_Y } from './AgendaMapList';
import { CARD_WIDTH } from './AgendaMapCard';
import { WINDOW_WIDTH } from '../../../shared/Variables';
import { checkLocationPermission } from '../../../shared/permissions/LocationPermission';

type Props = {
  agendaStore: AgendaStore;
  buttonOpacity: Animated.Value;
};

export const AgendaMap = inject('agendaStore')(
  observer((props: Props) => {
    const { agendaStore, buttonOpacity } = props;
    const { filteredAgenda } = agendaStore;
    const isDarkMode = Appearance.getColorScheme() === 'dark';
    const averageInitialLocation = agendaStore.initialMap();
    const initialMapState = {
      filteredAgenda,
      region: {
        latitude: averageInitialLocation[0],
        longitude: averageInitialLocation[1],
        latitudeDelta: 0.03,
        longitudeDelta: 0.04,
      },
      mapIndex: 0,
    };
    const AnimatedMarker = Animated.createAnimatedComponent(MaterialCommunityIcons);
    const [state] = useState(initialMapState);
    const [currentMarker, setCurrentMarker] = useState('');
    const mapAnimation = new Animated.Value(0);
    const mapView = useRef();
    let agendaMapList: AgendaMapList | null;

    const _debounce = debounce(
      ({ value }: any) => {
        let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
        if (index >= state.filteredAgenda.length) {
          index = state.filteredAgenda.length - 1;
        }
        if (index <= 0) {
          index = 0;
        }

        if (state.mapIndex !== index) {
          state.mapIndex = index;
          const agendaEvent = filteredAgenda[index];
          if (mapView && mapView.current) {
            mapView.current.animateCamera({
              center: {
                latitude: agendaEvent.location.lat,
                longitude: agendaEvent.location.lng,
              },
              altitude: 800,
              zoom: 18,
            });
          }
          setCurrentMarker(agendaEvent.location.lat + ',' + agendaEvent.location.lng);
        }
      },
      100,
      { trailing: true },
    );

    const setButtonOpacity = (value: number) => {
      const newValue = (value - OPEN_POSITION_Y) / (CLOSE_POSITION_Y - OPEN_POSITION_Y);
      buttonOpacity.setValue(newValue);
    };

    useEffect(() => {
      mapAnimation.addListener(_debounce);
      agendaMapList?._deltaY.addListener(e => setButtonOpacity(e.value));
    });

    const goToUserLocation = () => {
      checkLocationPermission(true).then(res =>
        res
          ? Geolocation.getCurrentPosition(
              info => {
                if (mapView && mapView.current) {
                  mapView.current.animateCamera({
                    center: {
                      latitude: info.coords.latitude,
                      longitude: info.coords.longitude,
                    },
                    altitude: 3000,
                    zoom: 16,
                  });
                }
              },
              undefined,
              { enableHighAccuracy: true, timeout: 3000 },
            )
          : null,
      );
    };

    const pressOutsideMarkers = (event: any) => {
      if (event.nativeEvent.action !== 'marker-press') {
        agendaMapList?.displayList(false);
        setCurrentMarker('');
      }
    };

    const latlngSet = new Set();
    return (
      <View style={styles.container}>
        <MapView
          ref={mapView}
          style={styles.map}
          initialRegion={state.region}
          showsUserLocation={true}
          clusterColor={isDarkMode ? colors.lightGrey : colors.secondaryMarker}
          onPress={event => pressOutsideMarkers(event)}
          minZoom={15}
          compassOffset={{ x: -WINDOW_WIDTH + 60, y: 20 }}
        >
          {filteredAgenda.map((event, index) => {
            const location = event.location.lat + ',' + event.location.lng;
            if (latlngSet.has(location)) {
              return null;
            } else {
              latlngSet.add(location);
              const marker = { zIndex: location === currentMarker ? 999 : undefined };
              return (
                <Marker
                  key={event.id}
                  coordinate={{ longitude: event.location.lng, latitude: event.location.lat }}
                  style={marker}
                  onPress={() => {
                    mapAnimation.setValue(index * CARD_WIDTH);
                    agendaMapList?.displayList(true);
                    agendaMapList?.scrollToIndex(index);
                  }}
                >
                  {currentMarker && location === currentMarker ? (
                    <AnimatedMarker name="map-marker" size={60} color={colors.mainMarker} style={styles.mainMarker} />
                  ) : (
                    <AnimatedMarker
                      name="map-marker"
                      size={30}
                      color={isDarkMode ? colors.lightGrey : colors.secondaryMarker}
                    />
                  )}
                </Marker>
              );
            }
          })}
        </MapView>
        <TouchableOpacity style={styles.myLocationContainer} onPress={() => goToUserLocation()}>
          <MaterialIcons name="my-location" size={32} color={colors.mainColor} style={styles.myLocation} />
        </TouchableOpacity>
        <AgendaMapList
          ref={ref => {
            agendaMapList = ref;
          }}
          agendaStore={agendaStore}
          mapAnimation={mapAnimation}
        />
      </View>
    );
  }),
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  map: {
    flex: 1,
  },
  mainMarker: {
    zIndex: 1,
  },
  myLocationContainer: {
    position: 'absolute',
    top: 40,
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
