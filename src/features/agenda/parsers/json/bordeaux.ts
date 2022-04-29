import moment from 'moment';
import { AgendaEvent } from '../../AgendaEvent';

export default (data: any) => {
  const jsonAgenda: Array<AgendaEvent> = [];

  data.records.forEach(
    (item: {
      fields: {
        uid: any;
        title_fr: any;
        firstdate: any;
        lastdate: any;
        location_image: string;
        keywords_fr: any;
        description_fr: any;
        location_coordinates: any[];
        location_city: any;
      };
    }) => {
      jsonAgenda.push({
        id: item.fields.uid,
        title: item.fields.title_fr,
        dateStart: moment(item.fields.firstdate, 'DD/MM/YYYY'),
        dateEnd: moment(item.fields.lastdate, 'DD/MM/YYYY'),
        imageUrl: item.fields.location_image
          ? item.fields.location_image
          : 'https://img.freepik.com/vecteurs-libre/cercle-brillant-eclairage-violet-isole-fond-sombre_1441-2396.jpg?size=626&ext=jpg',
        category: item.fields.keywords_fr,
        description: item.fields.description_fr,
        location: { lng: item.fields.location_coordinates[0], lat: item.fields.location_coordinates[1] },
        city: item.fields.location_city,
      });
    },
  );

  return jsonAgenda;
};
