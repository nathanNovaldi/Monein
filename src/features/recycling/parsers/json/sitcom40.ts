import { RecyclingCenter } from '../../RecyclingCenter';

export default (data: any) => {
  const jsonRecyclingCenter: Array<RecyclingCenter> = [];

  data.forEach(
    (
      item: {
        Nom: any;
        InseeCommune: any;
        Rue: any;
        LATITUDE: any;
        LONGITUDE: any;
        PILE: number;
        VERRE: number;
        EMB_TETRA: number;
        EMB_METAL: number;
        PLASTIQUE: number;
        PAPIER: number;
        TEXTILES: number;
      },
      index: any,
    ) => {
      jsonRecyclingCenter.push({
        id: index,
        name: item.Nom,
        city: item.InseeCommune,
        address: item.Rue,
        location: { lat: item.LATITUDE, lng: item.LONGITUDE },
        selecting: {
          battery: item.PILE >= 1,
          glass: item.VERRE >= 1,
          embTetra: item.EMB_TETRA >= 1,
          embMetal: item.EMB_METAL >= 1,
          plastic: item.PLASTIQUE >= 1,
          paper: item.PAPIER >= 1,
          textile: item.TEXTILES >= 1,
        },
      });
    },
  );

  return jsonRecyclingCenter;
};
