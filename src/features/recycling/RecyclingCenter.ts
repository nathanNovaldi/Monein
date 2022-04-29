export interface RecyclingCenter {
  id: string;
  name: string;
  city: string;
  address: string;
  location: { lat: number; lng: number };
  selecting: {
    battery: boolean;
    glass: boolean;
    embTetra: boolean;
    embMetal: boolean;
    plastic: boolean;
    paper: boolean;
    textile: boolean;
  };
}
