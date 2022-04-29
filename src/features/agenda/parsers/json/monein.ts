import moment from 'moment';
import { AgendaEvent } from '../../AgendaEvent';
import { decode } from 'html-entities';

export default (data: any) => {
  const jsonAgenda: Array<AgendaEvent> = [];

  data.forEach((item: any) => {
    const categories: Array<string> = [];

    item._embedded['wp:term'].forEach((term: any) => {
      if (term) {
        term.forEach((cat: any) => {
          if (cat && cat.name) {
            categories.push(cat.name);
          }
        });
      }
    });

    jsonAgenda.push({
      id: String(item.id),
      title: decode(item.title.rendered),
      dateStart: moment(item.date, 'YYYY-MM-DDThh:mm:ss'),
      dateEnd: moment(item.date, 'YYYY-MM-DDThh:mm:ss'),
      imageUrl: item._embedded['wp:featuredmedia'].source_url,
      description: item.content.rendered || item.excerpt.rendered,
      category: categories,
    });
  });

  return jsonAgenda;
};

// id: string;
// title: string;
// dateStart: Moment;
// dateEnd: Moment;
// imageUrl: string;
// category: Array<string>;
// description: string;
// price?: string;
// location: { lng: number; lat: number };
// city: string;
// address?: string;
// link: string;
// contact?: string;
