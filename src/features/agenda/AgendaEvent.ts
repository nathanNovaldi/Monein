import { Moment } from 'moment';

export interface AgendaEvent {
  id: string;
  title: string;
  dateStart: Moment;
  dateEnd: Moment;
  imageUrl: string;
  category: Array<string>;
  description: string;
  price?: string;
  location?: { lng: number; lat: number };
  city?: string;
  address?: string;
  link?: string;
  contact?: string;
}
