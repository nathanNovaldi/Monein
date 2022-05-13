import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Markers } from './Markers';
import { parseMarkers, MARKERS_URL } from '../../config/config';

export class MarkersStore {
  markers: Array<Markers> = [];

  lastFetch: number = 0;

  constructor() {
    makeAutoObservable(this);
    this.fetchAll();
  }

  clear() {
    this.markers = [];
    this.lastFetch = 0;
  }

  async fetchAll() {
    let markers: Array<Markers> = [];
    try {
      this.lastFetch = new Date().getTime();
      markers = await axios.get(MARKERS_URL).then(async resp => {
        let parsedMarkers: Array<Markers> = [];
        if (resp.status === 200) {
          parsedMarkers = await parseMarkers(resp.data.data.pois);
          console.log('ttttttttt', parsedMarkers);
        }
        try {
          await AsyncStorage.setItem('@markersStore', JSON.stringify(resp.data.data.pois));
        } catch (e) {
          // NOTHING TO DO
        }
        return parsedMarkers;
      });
    } catch {
      const value = await AsyncStorage.getItem('@markersStore');
      if (value) {
        markers = await parseMarkers(JSON.parse(value));
      }
    }

    runInAction(() => {
      this.markers = markers;
    });
  }

  fetchIfNeeded() {
    const currentTime = new Date().getTime();
    if (this.lastFetch && currentTime - this.lastFetch <= 1000 * 60 * 15) {
      return;
    }
    this.fetchAll();
  }

  getMarkers(id: string): Markers | null {
    const markers = this.markers.filter(m => {
      return m.id === id;
    });
    if (markers && markers.length) {
      return markers[0];
    }
    return null;
  }
}

export const markersStore: MarkersStore = new MarkersStore();
