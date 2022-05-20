import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Markers } from './Markers';
import { parseMarkers, MARKERS_URL } from '../../config/config';
import { Category } from '../agenda/Category';
import { sortBy } from 'lodash';

export class MarkersStore {
  markers: Array<Markers> = [];

  filteredMarkers: Array<Markers> = [];

  categories: Array<Category> = [];

  lastFetch: number = 0;

  constructor() {
    makeAutoObservable(this);
    this.fetchAll();
    this.filteredMarkers = this.markers;
  }

  clear() {
    this.markers = [];
    this.lastFetch = 0;
    this.filteredMarkers = [];
    this.categories = [];
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
      this.categories = this.getCategories();
      this.filteredMarkers = this.markers;
    });
  }

  filterMarkers(): void {
    console.log('Methode filterMarkers', this.markers);
    const markersFilter = this.markers.filter(markersEvent => {
      console.log(
        'les categories dans filterMarkers:',
        this.categories.some(category => markersEvent.category.includes(category.name) && category.check),
      );
      return this.categories.some(category => markersEvent.category.includes(category.name) && category.check);
    });

    runInAction(() => {
      this.filteredMarkers = markersFilter;
      console.log('Marqueur filtre', this.filteredMarkers);
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

  getCategories(): Array<Category> {
    let categories: Array<Category> = [];
    this.markers.forEach(markers => {
      categories.push({ name: markers.category, check: true });
    });

    categories = categories.filter((category, index) => {
      return categories.findIndex(i => i.name === category.name) === index;
    });

    return categories;
  }

  changeCategories(newCategories: Array<Category>): void {
    console.log('Les categories dans Methode changeCategories: ', newCategories);
    this.categories = newCategories;
    this.filterMarkers();
  }
}

export const markersStore: MarkersStore = new MarkersStore();
