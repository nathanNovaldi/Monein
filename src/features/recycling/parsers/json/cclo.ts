import { RecyclingCenter } from '../../RecyclingCenter';

export default (data: any) => {
  const jsonRecyclingCenter: Array<RecyclingCenter> = [];

  data.records.forEach(
    (item: { recordid: any; fields: { nom: any; commune: any; adresse: any; latitude: any; longitude: any } }) => {
      jsonRecyclingCenter.push({
        id: item.recordid,
        name: item.fields.nom,
        city: item.fields.commune,
        address: item.fields.adresse,
        location: { lat: item.fields.latitude, lng: item.fields.longitude },
      });
    },
  );

  return jsonRecyclingCenter;
};
