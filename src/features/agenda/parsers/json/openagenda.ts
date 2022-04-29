import moment from 'moment';
import { AgendaEvent } from '../../AgendaEvent';

export default (data: any) => {
  const jsonAgenda: Array<AgendaEvent> = [];

  data.events.forEach(
    (item: {
      uid: any;
      title: { fr: any };
      firstDate: any;
      lastDate: any;
      image: any;
      keywords: { fr: Array<any> };
      longDescription: { fr: any };
      location: { longitude: number; latitude: number; city: string };
    }) => {
      jsonAgenda.push({
        id: item.uid,
        title: item.title.fr,
        dateStart: moment(item.firstDate, 'DD/MM/YYYY'),
        dateEnd: moment(item.lastDate, 'DD/MM/YYYY'),
        imageUrl: item.image
          ? item.image
          : 'https://img.freepik.com/vecteurs-libre/cercle-brillant-eclairage-violet-isole-fond-sombre_1441-2396.jpg?size=626&ext=jpg',
        category: item.keywords.fr[0],
        description: item.longDescription.fr,
        location: { lng: item.location.longitude, lat: item.location.latitude },
        city: item.location.city,
      });
    },
  );

  return jsonAgenda;
};
