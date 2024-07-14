
export interface City {
  id: number;
  name: string;
  state_id: number;
  created_at: string;
  updated_at: string;
}

export interface CityApiResponse {
  data: City[];
  message: string;
  code: number;
}