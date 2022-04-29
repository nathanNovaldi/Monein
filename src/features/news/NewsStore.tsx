import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { News } from './News';
import { parseNews, NEWS_URL } from '../../config/config';

export class NewsStore {
  news: Array<News> = [];

  lastFetch: number = 0;

  constructor() {
    makeAutoObservable(this);
    this.fetchAll();
  }

  clear() {
    this.news = [];
    this.lastFetch = 0;
  }

  async fetchAll() {
    let news: Array<News> = [];
    try {
      this.lastFetch = new Date().getTime();
      news = await axios.get(NEWS_URL).then(async resp => {
        let parsedNews: Array<News> = [];
        if (resp.status === 200) {
          parsedNews = await parseNews(resp.data);
        }
        try {
          await AsyncStorage.setItem('@newsStore', JSON.stringify(resp.data));
        } catch (e) {
          // NOTHING TO DO
        }
        return parsedNews;
      });
    } catch {
      const value = await AsyncStorage.getItem('@newsStore');
      if (value) {
        news = await parseNews(JSON.parse(value));
      }
    }

    runInAction(() => {
      this.news = news;
    });
  }

  fetchIfNeeded() {
    const currentTime = new Date().getTime();
    if (this.lastFetch && currentTime - this.lastFetch <= 1000 * 60 * 15) {
      return;
    }
    this.fetchAll();
  }

  getNews(id: string): News | null {
    const news = this.news.filter(n => {
      return n.id === id;
    });
    if (news && news.length) {
      return news[0];
    }
    return null;
  }
}

export const newsStore: NewsStore = new NewsStore();
