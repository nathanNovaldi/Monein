import moment from 'moment';
import { decode } from 'html-entities';
import { AgendaEvent } from '../../features/agenda/AgendaEvent';

export default (data: any) => {
  const jsonAgenda: Array<AgendaEvent> = [];

  data.events.forEach((item: any) => {
    const categories: Array<string> = [];

    item.categories.forEach((cat: any) => {
      if (cat && cat.name) {
        categories.push(cat.name);
      }
    });

    jsonAgenda.push({
      id: String(item.id),
      title: decode(item.title),
      dateStart: moment(item.start_date, 'YYYY-MM-DD hh:mm:ss'),
      dateEnd: moment(item.end_date, 'YYYY-MM-DD hh:mm:ss'),
      imageUrl: item.image?.url,
      description: item.description,
      category: categories,
      city: item.venue?.city,
      address: item.venue?.address,
      link: item.venue?.url,
    });
  });

  return jsonAgenda;
};
