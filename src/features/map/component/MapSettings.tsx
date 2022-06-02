import Geolocation from '@react-native-community/geolocation';
import React from 'react';
import { Region } from 'react-native-maps';
import { checkLocationPermission } from '../../../shared/permissions/LocationPermission';

export class MapSettings {
  // ATTRIBUTS

  private _initialRegion: Region;

  private _mapView: any;

  // ENCAPSULATION

  get initialRegion(): Region {
    return this._initialRegion;
  }

  set initialRegion(value: Region) {
    this._initialRegion = value;
  }

  get mapView(): any {
    return this._mapView;
  }

  set mapView(value: any) {
    this._mapView = value;
  }

  // CONSTRUCTEUR
  constructor(latitude: number, longitude: number, latitudeDelta: number, longitudeDelta: number) {
    const region: Region = {
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    };

    this.initialRegion = region;

    this.mapView = React.createRef();
  }

  // METHODE

  goToMarkerLocation = (item: any) => {
    checkLocationPermission(true).then(res =>
      res
        ? Geolocation.getCurrentPosition(() => {
            if (this.mapView && this.mapView.current) {
              this.mapView.current.animateCamera(
                {
                  center: {
                    latitude: item.lat,
                    longitude: item.lng,
                  },
                  altitude: 500,
                  zoom: 10,
                },
                { duration: 1000 },
              );
            }
          })
        : null,
    );
  };

  goToUserLocation = () => {
    checkLocationPermission(true).then(res =>
      res
        ? Geolocation.getCurrentPosition(info => {
            if (this.mapView && this.mapView.current) {
              this.mapView.current.animateCamera(
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
}
