export interface IDivision {
  id: string;
  name: string;
  bn_name: string;
  url: string;
}

export interface IDistrict {
  id: string;
  division_id: string;
  name: string;
  bn_name: string;
  lat: string;
  lon: string;
  url: string;
}

export interface IUpazial {
  id: string;
  district_id: string;
  name: string;
  bn_name: string;
  url: string;
}
