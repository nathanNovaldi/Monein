import moment from 'moment';
import { AgendaEvent } from '../../AgendaEvent';

const deconstructionDate = (dateComplet: string) => {
  const dateParse = dateComplet.split('|');
  const dateStart = moment(dateParse[0] + dateParse[2], 'DD MM YYYY hh:mm:ss');
  const dateEnd = moment(dateParse[1] + dateParse[3], 'DD MM YYYY hh:mm:ss');

  if (dateParse[2] === '') {
    dateStart.add(7, 'h');
  }
  if (dateParse[3] === '') {
    dateEnd.add(dateStart.hour(), 'h').add(30, 'm');
  }
  return [dateStart, dateEnd];
};

export default (data: any) => {
  const jsonAgenda: Array<AgendaEvent> = [];

  data.d.forEach(
    (item: {
      SyndicObjectID: any;
      SyndicObjectName: any;
      DATESCOMPLET: any;
      PHOTO: string;
      TYPEFMA: any;
      DESCRIPTIF: any;
      TARIFSTEXTE: any;
      GmapLongitude: any;
      GmapLatitude: any;
      COMMUNE: any;
      AD2: any;
      URL: any;
      TELMOB: any;
    }) => {
      const dates = deconstructionDate(item.DATESCOMPLET);
      jsonAgenda.push({
        id: item.SyndicObjectID,
        title: item.SyndicObjectName,
        dateStart: dates[0],
        dateEnd: dates[1],
        imageUrl: item.PHOTO
          ? 'https://cdt64.media.tourinsoft.eu/upload/' + item.PHOTO
          : 'https://img.freepik.com/vecteurs-libre/cercle-brillant-eclairage-violet-isole-fond-sombre_1441-2396.jpg?size=626&ext=jpg',
        category: item.TYPEFMA.split('#'),
        description: item.DESCRIPTIF,
        price: item.TARIFSTEXTE,
        location: { lng: +item.GmapLongitude, lat: +item.GmapLatitude },
        city: item.COMMUNE,
        address: item.AD2,
        link: item.URL,
        contact: item.TELMOB,
      });
    },
  );

  return jsonAgenda;
};
