import { Markers } from '../../features/map/Markers';

export default (data: any) => {
  const jsonMarkers: Array<Markers> = [];

  data.forEach((item: any) => {
    const tab = item.url.split('/');
    const categorie = tab[tab.length - 2];
    jsonMarkers.push({
      id: item.postid,
      title: item.title,
      body: item.body,
      lat: item.point.lat,
      lng: item.point.lng,
      url: item.url,
      category: categorie,
    });
  });

  return jsonMarkers;
};
