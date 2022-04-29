import { Moment } from 'moment';

export interface News {
  id: string;
  title: string;
  date: Moment;
  imageUrl: string;
  text: string;
}
