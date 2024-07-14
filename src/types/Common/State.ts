

export interface State {
  id: number;
  name: string;
  country_id: string;
  created_at: string;
  updated_at: string;
}

export interface StateApiResponse {
  data: State[];
  message: string;
  code: number;
}
