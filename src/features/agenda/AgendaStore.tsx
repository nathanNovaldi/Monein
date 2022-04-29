import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
import moment, { Moment } from 'moment';

import { parseAgenda, AGENDA_URL } from '../../config/config';
import I18n from '../../config/locales';
import { Category } from './Category';
import { AgendaEvent } from './AgendaEvent';
import AsyncStorage from '@react-native-async-storage/async-storage';

const today = moment();
const weekAfter = moment().add(1, 'w');
const twoweekAfter = moment().add(2, 'w');
const monthAfter = moment().add(1, 'month');
const yearBefore = moment().subtract(1, 'year');

export class AgendaStore {
  agenda: Array<AgendaEvent> = [];

  filteredAgenda: Array<AgendaEvent> = [];

  dates: Array<Array<Moment>> = [
    [yearBefore, weekAfter],
    [weekAfter, twoweekAfter],
    [today, monthAfter],
  ];

  filterDate: Array<Moment> = this.dates[0];

  categories: Array<Category> = [];

  constructor() {
    makeAutoObservable(this);
    this.fetchAll();
  }

  clear() {
    this.agenda = [];
    this.filteredAgenda = [];
    this.filterDate = [];
    this.dates = [];
    this.categories = [];
  }

  async fetchAll() {
    let agenda: Array<AgendaEvent> = [];
    try {
      const resp = await axios.get(AGENDA_URL);
      if (resp.status === 200) {
        agenda = await parseAgenda(resp.data);
      }
      try {
        await AsyncStorage.setItem('@agendaStore', JSON.stringify(resp.data));
      } catch (e) {
        // NOTHING TO DO
      }
    } catch {
      const value = await AsyncStorage.getItem('@agendaStore');
      if (value) {
        agenda = await parseAgenda(JSON.parse(value));
      }
    }

    runInAction(() => {
      this.agenda = sortByDate(agenda);
      this.categories = this.getCategories();
      this.changeDate(this.filterDate);
    });
  }

  filterAgenda(): void {
    // First filter with the date
    let agendaFilter = this.agenda.filter(agendaEvent => {
      if (this.filterDate) {
        return (
          agendaEvent.dateEnd.isSameOrAfter(this.filterDate[0]) &&
          agendaEvent.dateStart.isSameOrBefore(this.filterDate[1])
        );
      } else {
        return true;
      }
    });
    // Then filter with the categories
    agendaFilter = agendaFilter.filter(agendaEvent => {
      return this.categories.some(category => agendaEvent.category.includes(category.name) && category.check);
    });

    runInAction(() => {
      this.filteredAgenda = sortByDate(agendaFilter);
    });
  }

  getAgendaEvent(id: string): AgendaEvent | null {
    const agenda = this.agenda.filter(agendaEvent => {
      return agendaEvent.id === id;
    });
    if (agenda && agenda.length) {
      return agenda[0];
    }
    return null;
  }

  // Change the filter dates
  changeDate(newfilterDate: Array<Moment>): void {
    this.filterDate = newfilterDate;
    this.filterAgenda();
  }

  // Display the date if dateStart===dateEnd or not
  displayDate(agendaEvent: AgendaEvent): string {
    const display = agendaEvent.dateStart.isSame(agendaEvent.dateEnd)
      ? I18n.t('date.at') + agendaEvent.dateStart.format('LL')
      : I18n.t('date.from') + agendaEvent.dateStart.format('LL') + I18n.t('date.to') + agendaEvent.dateEnd.format('LL');
    return display;
  }

  // Get all categories from agenda and delete all the duplicates
  getCategories(): Array<Category> {
    let categories: Array<Category> = [];
    this.agenda.forEach(agendaEvent => {
      agendaEvent.category.forEach(item => {
        categories.push({ name: item, check: true });
      });
    });

    categories = categories.filter((category, index) => {
      return categories.findIndex(i => i.name === category.name) === index;
    });

    return categories;
  }

  // Change the filter categories
  changeCategories(newCategories: Array<Category>): void {
    this.categories = newCategories;
    this.filterAgenda();
  }

  initialMap(): Array<number> {
    const averageLocation: Array<number> = [0, 0];
    this.filteredAgenda.forEach(item => {
      if (item.location) {
        averageLocation[0] += item.location.lat;
        averageLocation[1] += item.location.lng;
      }
    });

    if (this.filteredAgenda.length) {
      averageLocation[0] /= this.filteredAgenda.length;
      averageLocation[1] /= this.filteredAgenda.length;
    }

    return averageLocation;
  }
}

// Sort the agenda by the date Start
const sortByDate = (agenda: Array<AgendaEvent>): Array<AgendaEvent> => {
  const agendaSort = agenda.sort((a, b) => {
    return a.dateStart.isAfter(b.dateStart) ? 1 : -1;
  });
  return agendaSort;
};

export const agendaStore: AgendaStore = new AgendaStore();
