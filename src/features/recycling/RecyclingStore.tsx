import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RecyclingCenter } from './RecyclingCenter';
import Log from '../../shared/Log';

export class RecyclingStore {
  recyclingCenters: Array<RecyclingCenter> = [];

  filteredRecyclingCenters: Array<RecyclingCenter> = [];

  lastFetch: number = 0;

  constructor() {
    makeAutoObservable(this);
    // this.fetchAll();     API REQUEST
    this.fetchAllLocal();
  }

  clear() {
    this.recyclingCenters = [];
    this.filteredRecyclingCenters = [];
    this.lastFetch = 0;
  }

  async fetchAll() {
    let recyclingCenters: Array<RecyclingCenter>;
    try {
      this.lastFetch = new Date().getTime();
      // recyclingCenters = await axios.get(RECYCLING_URL).then(async resp => {
      //   let parsedRecyclingCenters = [];
      //   if (resp.status === 200) {
      //     parsedRecyclingCenters = await parseRecyclingCenters(resp.data);
      //   }
      //   try {
      //     await AsyncStorage.setItem('@recyclingStore', resp.data);
      //   } catch (e) {
      //     // NOTHING TO DO
      //   }
      //   return parsedRecyclingCenters;
      // });
    } catch {
      const value = await AsyncStorage.getItem('@recyclingStore');
      recyclingCenters = await parseRecyclingCenters(value);
    }

    runInAction(() => {
      this.recyclingCenters = recyclingCenters;
      this.filteredRecyclingCenters = recyclingCenters;
    });
  }

  fetchAllLocal() {
    const recyclingCentersJson = require('./assets/sitcom40_dechet.json');
    const recyclingCenters = require('./parsers/json/sitcom40').default(recyclingCentersJson);

    runInAction(() => {
      this.recyclingCenters = recyclingCenters;
    });
  }

  fetchIfNeeded() {
    const currentTime = new Date().getTime();
    if (this.lastFetch && currentTime - this.lastFetch <= 1000 * 60 * 15) {
      return;
    }
    this.fetchAll();
  }

  getRecyclingCenter(id: string): RecyclingCenter | null {
    const recyclingCenters = this.recyclingCenters.filter(recyclingCenter => {
      return recyclingCenter.id === id;
    });
    if (recyclingCenters && recyclingCenters.length) {
      return recyclingCenters[0];
    }
    return null;
  }

  // Change and filter categories
  filterCategories(categories: Array<{ name: string; check: boolean }>): void {
    let filteredRecyclingCenters: RecyclingCenter[] = [];

    if (categories.some(category => category.check)) {
      filteredRecyclingCenters = this.recyclingCenters.filter(recyclingCenter => {
        const selectingArray = Object.values(recyclingCenter.selecting);
        return !categories.some((category, index) => category.check && !selectingArray[index]);
      });
    }

    runInAction(() => {
      this.filteredRecyclingCenters = filteredRecyclingCenters;
    });
  }
}

const parseRecyclingCenters = (data: any) => {
  let parsedData = [];
  // if (RECYCLING_PARSER_TYPE === RECYCLING_JSON_CCLO_PARSER_TYPE) {
  //   parsedData = require('./parsers/json/cclo').default(data);
  // } else {
  //   Log.e('RecyclingStore', 'Unsupported Parser Type');
  // }

  return parsedData;
};

export const recyclingStore: RecyclingStore = new RecyclingStore();
