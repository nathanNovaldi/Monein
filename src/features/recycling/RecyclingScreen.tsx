import Geolocation from '@react-native-community/geolocation';
import { useNavigation } from '@react-navigation/native';
import { inject, observer } from 'mobx-react';
import React, { useRef, useState } from 'react';
import { StyleSheet, SafeAreaView, Appearance, TouchableOpacity } from 'react-native';
import MapView from 'react-native-map-clustering';
import { Callout, Marker, Region } from 'react-native-maps';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { checkLocationPermission } from '../../shared/permissions/LocationPermission';
import { colors } from '../../config/config';
import { WINDOW_WIDTH } from '../../shared/Variables';
import { DescriptionMarker } from './component/DescriptionMarker';
import { ModalFilter } from './component/ModalFilter';
import { RecyclingCenter } from './RecyclingCenter';
import { RecyclingStore } from './RecyclingStore';
import Menu from '../menuBottom/Menu';

type Props = {
  recyclingStore: RecyclingStore;
};

export const RecyclingScreen = inject('recyclingStore')(
  observer((props: Props) => {
    const { recyclingStore } = props;
    const { recyclingCenters, filteredRecyclingCenters } = recyclingStore;
    const [currentMarker, setCurrentMarker] = useState('');
    const [overlayFilter, setOverlayFilter] = useState<boolean>(false);
    const [filterAction, setFilterAction] = useState(false);
    const isDarkMode = Appearance.getColorScheme() === 'dark';
    const navigation = useNavigation();
    const mapView = useRef();

    const recyclingCentersApplied = filterAction ? filteredRecyclingCenters : recyclingCenters;

    filterAction
      ? React.useLayoutEffect(() => {
          navigation.setOptions({
            headerRight: () => (
              <MaterialCommunityIcons
                name="filter-remove"
                size={30}
                color={colors.background}
                style={styles.filterIcon}
                onPress={() => {
                  setFilterAction(false);
                }}
              />
            ),
          });
        })
      : React.useLayoutEffect(() => {
          navigation.setOptions({
            headerRight: () => (
              <MaterialCommunityIcons
                name="filter"
                size={30}
                color={colors.background}
                style={styles.filterIcon}
                onPress={() => {
                  setOverlayFilter(true);
                  setFilterAction(true);
                }}
              />
            ),
          });
        });

    const initialRegion: Region = {
      latitude: recyclingCenters[2].location.lat,
      longitude: recyclingCenters[2].location.lng,
      latitudeDelta: 0.35,
      longitudeDelta: 0.35,
    };

    const pressOutsideMarkers = (event: any) => {
      if (event.nativeEvent.action !== 'marker-press') {
        setCurrentMarker('');
      }
    };

    const markerOnPress = (recyclingCenter: RecyclingCenter) => {
      if (mapView && mapView.current) {
        mapView.current.animateCamera({
          center: {
            latitude: recyclingCenter.location.lat,
            longitude: recyclingCenter.location.lng,
          },
          altitude: 4000,
          zoom: 17,
        });
      }
      setCurrentMarker(recyclingCenter.id);
    };

    const goToUserLocation = () => {
      checkLocationPermission(true).then(res =>
        res
          ? Geolocation.getCurrentPosition(info => {
              if (mapView && mapView.current) {
                mapView.current.animateCamera({
                  center: {
                    latitude: info.coords.latitude,
                    longitude: info.coords.longitude,
                  },
                  altitude: 10000,
                  zoom: 15,
                });
              }
            })
          : null,
      );
    };

    return (
      <SafeAreaView style={styles.container}>
        <ModalFilter showOverlay={overlayFilter} onOverlayChange={setOverlayFilter} recyclingStore={recyclingStore} />
        <MapView
          ref={mapView}
          style={styles.map}
          initialRegion={initialRegion}
          clusterColor={isDarkMode ? colors.lightGrey : colors.secondaryMarker}
          showsUserLocation
          compassOffset={{ x: -WINDOW_WIDTH + 60, y: 20 }}
          onPress={event => pressOutsideMarkers(event)}
        >
          {recyclingCentersApplied.map(recyclingCenter => {
            return (
              <Marker
                key={recyclingCenter.id}
                coordinate={{ latitude: recyclingCenter.location.lat, longitude: recyclingCenter.location.lng }}
                onPress={() => markerOnPress(recyclingCenter)}
                title={recyclingCenter.name}
                description={recyclingCenter.address}
              >
                {recyclingCenter.id === currentMarker ? (
                  <MaterialCommunityIcons name="map-marker" size={50} color={colors.mainColor} />
                ) : (
                  <MaterialCommunityIcons
                    name="map-marker"
                    size={40}
                    color={isDarkMode ? colors.lightGrey : colors.secondaryMarker}
                  />
                )}
                <Callout key={recyclingCenter.id} tooltip>
                  <DescriptionMarker recyclingCenter={recyclingCenter} />
                </Callout>
              </Marker>
            );
          })}
        </MapView>
        <TouchableOpacity style={styles.myLocationContainer} onPress={() => goToUserLocation()}>
          <MaterialIcons name="my-location" size={32} color={colors.mainColor} style={styles.myLocation} />
        </TouchableOpacity>
        <Menu />
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
    top: 15,
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
